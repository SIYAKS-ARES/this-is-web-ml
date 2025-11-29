# Interactive Story Crafter — In-Browser LLM (Transformers.js)

Hugging Face Spaces üzerindeki webml-community örneklerine benzer, ancak birebir olmayan; tarayıcıda çalışan hafif bir metin üretim (LLM) akışı. Parametrelerle (tema, ton, yaş, dil, karakterler, uzunluk, temperature) kişiselleştirilmiş hikâyeler oluşturur. Model ve ağırlıklar tarayıcıya indirilir ve yerelde çalışır.

## Çalıştırma

```bash
python3 -m http.server 8000
# veya
npx http-server -p 8000 --silent
```

Ardından ziyaret edin:
- http://localhost:8000/examples/story-generator/

## Notlar
- Transformers.js, uygun ONNX modellerini WebGPU/WebGL/WASM ile çalıştırabilir. Destek yoksa CPU fallback.
- İlk yüklemede modelin indirilmesi zaman alabilir; tarayıcı cache’inde saklanır.
- Model kimliği `script.js` içinde `MODEL_ID` sabitiyle değiştirilebilir (HF Hub’dan küçük/uyumlu bir ONNX model seçin).

## Güvenlik ve Gizlilik
- Metin tarayıcıda işlenir; sunucuya gönderilmez.
- CSP ve SRI uygulamanız tavsiye edilir.
