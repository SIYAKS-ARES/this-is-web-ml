# Awesome Web ML: A Comprehensive Guide and Toolkit

Web Machine Learning (Web ML), tarayıcı içinde makine öğrenmesi modellerinin çalıştırılmasını sağlayan bir paradigmadır. Sunucuya veri göndermeden, doğrudan kullanıcının cihazında (client-side) çalışan yapay zekâ özellikleri ile:

- Gizlilik artar (veri cihazdan çıkmaz)
- Gecikme düşer (ağ turu yoktur, gerçek zamanlı deneyim)
- Sunucu maliyetleri azalır (işlem yükü kullanıcılara dağılır)
- Çevrimdışı çalışma mümkün olur (model yüklenince internet gerekmez)

Bu depo; kavramsal dokümantasyon, pratik kod örnekleri ve kurulum talimatlarıyla Web ML öğrenmek ve uygulama geliştirmek için merkezi bir kaynak sunar.

## İçindekiler

- [Giriş](#giriş)
- [Çekirdek Kavramlar](#çekirdek-kavramlar)
- [Teknoloji Yığını](#teknoloji-yığını)
- [Canlı Demo Örnekleri](#canlı-demo-örnekleri)
- [Hızlı Başlangıç](#hızlı-başlangıç)
- [Katkı Rehberi](#katkı-rehberi)
- [Lisans](#lisans)

### İlgili Dokümanlar (docs/)

- `docs/01-introduction.md`
- `docs/02-architecture.md`
- `docs/03-technology-stack.md`
- `docs/04-client-vs-server.md`
- `docs/05-applications.md`
- `docs/06-limitations.md`
- `docs/07-security.md`
- `docs/08-future-outlook.md`

## Giriş

Web ML; modern tarayıcıların GPU/CPU hızlandırmasını (WebGPU, WebGL, WebAssembly) kullanarak makine öğrenmesi çıkarımını yerelde çalıştırmayı amaçlar. Amaç, güçlü, düşük gecikmeli ve mahremiyet dostu web deneyimlerini standart web teknolojileri ile mümkün kılmaktır.

## Çekirdek Kavramlar

- **İstemci Tarafı (Client-Side) vs Sunucu Tarafı (Server-Side) AI**: İstemci tarafında model tarayıcıda çalışır; veri cihazdan çıkmaz ve gecikme düşüktür. Sunucu tarafında veri sunucuya gönderilir; tutarlı performans ve büyük modeller mümkündür ancak ağ gecikmesi ve veri aktarımı gerekir.
- **Donanım Hızlandırma Rolü**: Tarayıcı, hesaplamaları GPU/CPU’ya offload ederek matris-vekör işlemlerini paralel yürütür; böylece neredeyse yerel performans elde edilir.

## Teknoloji Yığını

- **JavaScript Kütüphaneleri**
  - TensorFlow.js: Tarayıcıda model yükleme, dönüştürme, çıkarım ve eğitim.
  - ONNX.js / ONNX Runtime Web: ONNX formatlı modelleri tarayıcıda yüksek performansla çalıştırma.
- **Tarayıcı API’leri**
  - WebGL: Grafik için tasarlandı, ML hızlandırmada yaygın.
  - WebGPU: Modern GPU’lar için düşük seviyeli, compute shader destekli yüksek performans.
  - WebAssembly (Wasm): CPU üzerinde neredeyse yerel hızda çalıştırma.

Detaylar için `docs/03-technology-stack.md` dosyasına bakın.

## Canlı Demo Örnekleri

- `examples/image-classification/`: Görsel yükle, MobileNet ile sınıflandır, en iyi 3 tahmini göster.
- `examples/real-time-object-detection/`: Web kamerasında COCO-SSD ile nesne tespiti ve kutuların çizimi.
- `examples/pose-estimation-fitness/`: MoveNet ile iskelet çizimi ve basit squat sayacı.
- `examples/sentiment-analysis/`: Metin duygu analizi (pozitif/negatif/nötr).
- `examples/story-generator/`: Parametrelenebilir hikâye üretimi (Transformers.js ile tarayıcı içi küçük LLM).

## Hızlı Başlangıç

1. Depoyu klonlayın:

```bash
git clone https://github.com/<kullanıcı-adınız>/this-is-web-ml.git
cd this-is-web-ml
```

2. Basit bir statik sunucu ile örnekleri çalıştırın (webcam için `https` gerekmez; `localhost` güvenilir sayılır):

```bash
# Python 3
python3 -m http.server 8000

# veya Node.js
npx http-server -p 8000 --silent
```

3. Tarayıcıda açın ve örneklerden birine gidin:

```
http://localhost:8000/examples/image-classification/
http://localhost:8000/examples/real-time-object-detection/
http://localhost:8000/examples/pose-estimation-fitness/
http://localhost:8000/examples/sentiment-analysis/
```

İpucu: Webcam kullanan örnekler için tarayıcıya kamera izni verin. Performans için mümkünse WebGPU destekli bir tarayıcı (Chrome/Edge güncel sürümleri) kullanın.

## Katkı Rehberi

- Tartışma/öneri için Issue açın, geliştirme için fork + branch oluşturun ve Pull Request gönderin.
- Dökümanlarda netlik, örneklerde basitlik ve erişilebilirlik hedeflenir.
- Kod stillerini ve dosya yapısını koruyun; büyük bağımlılıklardan kaçının; CDN ile çalışın.

## Lisans

Bu depo **MIT** lisansı ile lisanslanmıştır. Ayrıntılar için `LICENSE` dosyasına bakın.

