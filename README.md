# yıldızjam site

YTÜ SKY LAB'in oyun geliştirme zirvesi ve game jam'i YıldızJam'in sitesi: [yildizjam.yildizskylab.com](https://yildizjam.yildizskylab.com).

## Çalıştırma

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

Ortam değişkenleri `.env.example`'da. `CMS_URL` verilmezse site sandbox CMS'ini token'sız okur.

## İçerik yönetimi

Metinler ve görseller [inscribed](https://www.npmjs.com/package/inscribed) ile yönetilir; içerik Skylab'in CMS'inde, sitenin Keycloak istemcisi (`frontend-yildizjam`) adına tutulur.

- Ziyaretçiler yayınlanmış içeriği token'sız okur. Düzenleme yetkisi olan kişi (`cms:access`) `/api/signin` ile ya da core üzerinden giriş yapınca düzenleme panelleri görünür.
- Düzenlenebilir alanlar JSX içinde `EditableRegion` ile tanımlanır. `npm run cms-sync` bunları bulup CMS'e kaydeder; `defaultValue` yalnızca ilk kaydı tohumlar. Senkron deploy'dan sonra çalışır.
- Görsel yüklemeleri `/api/cms-media` üzerinden core'a gider.

## Yayın

GitHub Actions her push'ta bir Docker imajı derleyip `ghcr.io/skylab-kulubu/skylab-yildizjam`'a gönderir ve ilgili Dokploy uygulamasını yeniden başlatır (`.github/workflows/image.yml`):

| Dal | İmaj etiketi | Ortam |
| --- | --- | --- |
| `main` | `sandbox` | sandbox |
| `production` | `production` | yildizjam.yildizskylab.com |

Dokploy kancaları repo secret'larıdır: `DOKPLOY_SANDBOX_DEPLOY_HOOK`, `DOKPLOY_DEPLOY_HOOK`. İmaj Next.js'in standalone çıktısını Node 22 üzerinde, root olmayan bir kullanıcıyla 3000 portunda çalıştırır; ortam değişkenleri çalışma anında Dokploy'dan gelir.
