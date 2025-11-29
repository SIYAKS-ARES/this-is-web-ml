// Pre-trained TF.js Sentiment model (IMDB) hosted by TensorFlow.js team
const MODEL_URL = 'https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/model.json';
const METADATA_URL = 'https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/metadata.json';

let model;
let metadata;

async function loadModel() {
  if (!model) {
    model = await tf.loadLayersModel(MODEL_URL);
  }
  if (!metadata) {
    const res = await fetch(METADATA_URL);
    metadata = await res.json();
  }
}

function tokenize(text) {
  const cleaned = text.trim().toLowerCase().replace(/[^a-z\s']/g, ' ');
  const words = cleaned.split(/\s+/).filter(Boolean);
  return words;
}

function wordsToIndices(words, wordIndex, indexFrom, oovIndex) {
  return words.map((w) => {
    const idx = wordIndex[w];
    if (idx !== undefined) return idx + indexFrom; // metadata uses index_from offset
    return oovIndex; // out-of-vocabulary token
  });
}

function padOrTruncate(indices, maxLen) {
  if (indices.length > maxLen) {
    return indices.slice(indices.length - maxLen);
  }
  const pad = Array(Math.max(0, maxLen - indices.length)).fill(0);
  return pad.concat(indices);
}

async function analyzeSentiment(text) {
  await loadModel();
  const { word_index: wordIndex, index_from: indexFrom, oov_index: oovIndex = 2, max_len: maxLen = 100 } = metadata;
  const tokens = tokenize(text);
  const indices = wordsToIndices(tokens, wordIndex, indexFrom || 3, oovIndex);
  const input = padOrTruncate(indices, maxLen);
  const inputTensor = tf.tensor2d([input], [1, maxLen]);
  const pred = model.predict(inputTensor);
  const score = (await pred.data())[0];
  tf.dispose([inputTensor, pred]);
  let label = 'Neutral';
  if (score > 0.66) label = 'Positive';
  else if (score < 0.33) label = 'Negative';
  return { label, score: Number(score.toFixed(3)) };
}

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('input');
  const analyzeBtn = document.getElementById('analyze');
  const result = document.getElementById('result');

  result.textContent = 'Model yükleniyor…';
  loadModel().then(() => {
    result.textContent = 'Hazır';
  }).catch(() => {
    result.textContent = 'Model yüklenemedi.';
  });

  analyzeBtn.addEventListener('click', async () => {
    const text = input.value.trim();
    if (!text) {
      result.textContent = 'Lütfen metin girin.';
      return;
    }
    result.textContent = 'Analiz ediliyor…';
    try {
      const out = await analyzeSentiment(text);
      result.textContent = `Sonuç: ${out.label} (score=${out.score})`;
    } catch (e) {
      result.textContent = 'Analiz sırasında hata oluştu.';
    }
  });
});


