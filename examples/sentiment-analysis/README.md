# Sentiment Analysis — TF.js (Demo)

- Metin girdisini basit bir sözlük-temelli puanlayıcıyla pozitif/negatif/nötr olarak etiketler.
- Not: Üretimde hazır TF.js/ONNX duygu modeli önerilir.

## Çalıştırma

```bash
python3 -m http.server 8000
# veya
npx http-server -p 8000 --silent
```

Tarayıcıda açın:

- http://localhost:8000/examples/sentiment-analysis/
