## 03 — Technology Stack for In-Browser ML

### JavaScript Libraries

- **TensorFlow.js**: Tarayıcıda model yükleme/çıkarım/transfer öğrenme ve hatta eğitim.
- **ONNX.js / ONNX Runtime Web**: Çerçeve-bağımsız ONNX modellerinin tarayıcıda çalıştırılması.

### Hardware Acceleration via Browser APIs

- **WebGL**: Grafik için tasarlansa da shader’lar ile ML hızlandırma.
- **WebGPU**: Modern GPU’lar için düşük seviyeli, compute shader destekli yüksek performans.
- **WebAssembly (Wasm)**: CPU üzerinde neredeyse yerel hızda genel amaçlı hesaplama.

### How It Fits Together

Kütüphaneler, mevcut backend’e göre otomatik seçim yapar: mümkünse WebGPU, değilse WebGL ve son çare Wasm/CPU.

### Comparison Table

| Metric | WebGL | WebGPU | WebAssembly (Wasm) |
| :-- | :-- | :-- | :-- |
| Primary Use | Graphics (ML’e uyarlanmış) | Graphics + GPGPU | CPU compute |
| ML Feature | Paralel shader hesaplama | Compute shaders, FP16 | Derlenmiş sayısal çekirdekler |
| Perf Profile | İyi GPU hızlandırma | Mükemmel GPU hızlandırma | Neredeyse yerel CPU |
| Maturity | Yaygın destek | Yeni nesil, hızla yayılıyor | Yaygın destek |


