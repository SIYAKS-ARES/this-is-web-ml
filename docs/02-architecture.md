## 02 — Architecture: The Shift to Client-Side AI

### From Server to Client

Geleneksel modelde veri istemciden sunucuya gider, çıkarım sunucuda yapılır ve sonuç geri döner. Web ML, modeli istemciye getirir ve çıkarımı tarayıcıda yapar. Bu, veri akışını tersine çevirir ve yeni sınıf deneyimleri mümkün kılar.

### Key Advantages

- **Gizlilik**: Veriler cihazı terk etmez.
- **Düşük Gecikme**: Ağ turu yoktur; gerçek zamanlı etkileşim.
- **Maliyet**: Sunucu tarafı iş yükü azalır, ölçek doğal olarak dağıtılır.
- **Çevrimdışı**: Model yüklendikten sonra internet bağlantısı gerekmez.

### Trade-offs and Constraints

- Cihaz bağımlılığı ve performans değişkenliği (donanıma göre deneyim farklılaşır)
- Model boyutu ve bellek kısıtları (ilk yükleme ve sekme belleği sınırlıdır)
- Güvenlik yüzeyi istemciye kayar (IP hırsızlığı, adversarial girdiler vb.)


