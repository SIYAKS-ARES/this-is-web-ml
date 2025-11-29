## 04 — Client-Side vs. Server-Side ML

### Data Flow

- **Client-Side**: Veri yerelde kalır; ön işleme → çıkarım → son işlem tarayıcıda.
- **Server-Side**: Veri sunucuya gider; çıkarım sunucuda; sonuç JSON vb. ile döner.

### Performance & Scalability

- **Client-Side**: Gecikme çok düşük; deneyim cihaz donanımına bağlı, model boyutu sınırlı.
- **Server-Side**: Tutarlı performans; ağ gecikmesi baskın; büyük modeller desteklenir; ölçek için altyapı gerekir.

### Security

- **Client-Side Riskleri**: Model IP sızıntısı, adversarial girişler, bağımlılık zafiyetleri.
- **Server-Side Riskleri**: Sunucu ihlali, API suistimali, veri sızıntısı.

### Development Workflow

- **Client-Side**: JS/TS + TF.js/ONNX Runtime Web; model dönüştürme.
- **Server-Side**: Python + PyTorch/TF; model servisleştirme (REST/gRPC), MLOps.

### Comparison Table

| Dimension | Client-Side | Server-Side |
| :-- | :-- | :-- |
| Latency | Çok düşük | Ağ gecikmesine bağlı |
| Privacy | Yüksek (veri cihazda) | Düşük/orta (veri sunucuya gider) |
| Cost | Düşük (sunucu yükü az) | Yüksek (altyapı gerekir) |
| Model Size | Sınırlı | Neredeyse sınırsız |
| Offline | Yüksek | Yok |


