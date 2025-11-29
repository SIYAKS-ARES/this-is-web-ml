// Uses Transformers.js (Hugging Face) in the browser to run a small text-generation model.
// This example prefers WebGPU, then WebGL, then WASM/CPU.

import { pipeline, env } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.16.1/dist/transformers.min.js';

// Prefer fast backends (WebGPU if available)
env.backends.onnx.wasm.numThreads = navigator.hardwareConcurrency || 4;
env.allowLocalModels = false; // only remote models
env.useBrowserCache = true;   // cache models in IndexedDB

// Model choice: small-ish instruct-like or general text generator available for web
// You may replace with another lightweight ONNX text-generation model hosted on HF Hub
// Öneri: Küçük, tarayıcı-dostu, ONNX formatlı bir model seçin.
// Aşağıdaki, Transformers.js demo uyumlu, hafif bir seçenek örneğidir.
// Dilerseniz Hugging Face Hub’dan benzer küçük bir text-generation modeline güncelleyebilirsiniz.
const MODEL_ID = 'Xenova/distil-gpt2';

let generator = null;
let abortController = null;
let timeoutId = null;

function buildPrompt({ theme, tone, age, lang, characters, length, temperature }) {
  const charText = characters ? `Karakterler: ${characters}.` : '';
  const lenText = length === 'short' ? 'Yaklaşık 80 kelime.' : length === 'long' ? 'Yaklaşık 250 kelime.' : 'Yaklaşık 150 kelime.';
  const locale = lang === 'tr' ? 'Türkçe' : lang === 'en' ? 'English' : 'Español';
  const tMap = { calm: 'sakin', adventurous: 'macera dolu', funny: 'komik', inspirational: 'ilham verici' };
  const themeMap = { space: 'uzay', ocean: 'okyanus', forest: 'orman', magic: 'büyü ve fantastik', friendship: 'arkadaşlık' };
  const toneText = tMap[tone] || tone;
  const themeText = themeMap[theme] || theme;

  return (
`Lütfen ${locale} bir çocuk hikâyesi yaz. Tema: ${themeText}. Ton: ${toneText}. Yaş grubu: ${age}. ${charText}
Kısa cümleler, net paragraflar ve görsel betimlemeler kullan. ${lenText}
Hikâyenin başı, gelişmesi ve sonucu olsun; pozitif ve güven verici bir kapanış yap.
`);
}

async function ensurePipeline() {
  if (generator) return generator;
  const status = document.getElementById('status');
  status.textContent = 'Model yükleniyor…';
  try {
    generator = await pipeline('text-generation', MODEL_ID, { quantized: true });
    status.textContent = 'Hazır';
  } catch (e) {
    console.error(e);
    status.textContent = 'Model yüklenemedi. Alternatif/ufak bir model deneyin.';
  }
  return generator;
}

function ui() {
  const $ = (id) => document.getElementById(id);
  return {
    form: $('form'),
    theme: $('theme'),
    tone: $('tone'),
    age: $('age'),
    lang: $('lang'),
    chars: $('characters'),
    length: $('length'),
    temperature: $('temperature'),
    status: $('status'),
    output: $('output'),
    copy: $('copy'),
    cancel: $('cancel'),
    reset: $('reset'),
    backend: $('backend'),
  };
}

document.addEventListener('DOMContentLoaded', () => {
  const u = ui();

  // Backend detection (Transformers.js ONNX -> WebGPU/WebGL/WASM/CPU). Not all exposed; show WebGPU availability as hint.
  const hasWebGPU = !!navigator.gpu;
  u.backend.textContent = hasWebGPU ? 'WebGPU (olası)' : 'WebGL/WASM/CPU';

  // Form submit → generate
  u.form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const params = {
      theme: u.theme.value,
      tone: u.tone.value,
      age: u.age.value,
      lang: u.lang.value,
      characters: u.chars.value.trim(),
      length: u.length.value,
      temperature: parseFloat(u.temperature.value),
    };
    const prompt = buildPrompt(params);
    u.output.textContent = '';
    u.status.textContent = 'Üretiliyor…';
    (u.form.querySelector('#generate')).disabled = true;

    try {
      // cancel previous generation if running
      if (abortController) {
        abortController.abort();
        abortController = null;
      }
      abortController = new AbortController();
      const { signal } = abortController;

      const pipe = await ensurePipeline();
      if (!pipe) return;
      const maxNewTokens = params.length === 'short' ? 120 : params.length === 'long' ? 420 : 240;
      // Apply timeout
      const timeoutMs = 60_000; // 60s hard timeout
      clearTimeout(timeoutId);
      const timeoutPromise = new Promise((_, rej) => {
        timeoutId = setTimeout(() => {
          try { abortController?.abort(); } catch {}
          rej(new Error('İstek zaman aşımına uğradı.'));
        }, timeoutMs);
      });

      // Streaming support if pipeline supports it (some models expose 'callback_function')
      let streamed = '';
      const genPromise = pipe(prompt, {
        temperature: Math.max(0.1, Math.min(params.temperature, 1.5)),
        top_k: 50,
        top_p: 0.95,
        max_new_tokens: maxNewTokens,
        repetition_penalty: 1.15,
        callback_function: (data) => {
          if (data.token) {
            streamed += data.token.text || '';
            u.output.textContent = streamed;
          }
        },
        signal,
      });

      const out = await Promise.race([genPromise, timeoutPromise]);
      if (Array.isArray(out)) {
        const text = out[0]?.generated_text || streamed;
        u.output.textContent = (text || '').trim();
      } else if (typeof out === 'string') {
        u.output.textContent = (out || streamed).trim();
      } else {
        // If streaming filled output, keep it; otherwise show fallback
        if (!u.output.textContent.trim()) u.output.textContent = streamed.trim();
      }
      u.status.textContent = 'Bitti';
    } catch (err) {
      console.error(err);
      u.status.textContent = err?.message || 'Üretim sırasında hata oluştu.';
    } finally {
      clearTimeout(timeoutId);
      timeoutId = null;
      abortController = null;
      (u.form.querySelector('#generate')).disabled = false;
    }
  });

  // Copy
  u.copy.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(u.output.textContent);
      u.status.textContent = 'Panoya kopyalandı';
    } catch {
      u.status.textContent = 'Kopyalama başarısız';
    }
  });

  // Reset
  u.reset.addEventListener('click', () => {
    u.output.textContent = '';
    u.status.textContent = 'Hazır';
  });

  // Cancel
  u.cancel.addEventListener('click', () => {
    try { abortController?.abort(); } catch {}
    clearTimeout(timeoutId);
    u.status.textContent = 'İptal edildi';
  });

  // Preload model lazily
  ensurePipeline();
});


