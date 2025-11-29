## 07 — Security in Web ML

### Threat Surface Shift

İstemci tarafı ortamda kod ve model dosyası kullanıcı cihazına iner; saldırganın incelemesine ve manipülasyonuna daha açıktır.

### Key Risks

- **Model IP Theft**: Model dosyasının kopyalanması/tersine mühendisliği.
- **Adversarial Attacks**: Ufak bozucularla yanlış sınıflama tetikleme.
- **Dependency Exploits**: Model formatı/okuyucu kütüphanelerindeki zafiyetler.
- **Data Exfiltration**: XSS vb. yoluyla hassas verilerin sızdırılması.

### Mitigations

- Model obfuscation/quantization; giriş doğrulama/sanitizasyon.
- Güçlü CSP, SRI; bağımlılık taraması ve düzenli güncellemeler.
- En az ayrıcalık ilkesi; izin istemlerinde şeffaflık.


