# 10 — Build & Deploy

## Build

```bash
npm run build        # production build → dist/
npm run watch        # development build + watch
```

- Output: `dist/` (browser build)
- `angular.json` กำหนด budgets, assets, styles
- Sass deprecation warnings ถูกกดด้วย `SASS_SILENCE_DEPRECATIONS=import`

## Docker

`Dockerfile` เป็น **multi-stage** 3 stages:

| Stage | Base | หน้าที่ |
|-------|------|---------|
| `build` | node:22-alpine | `npm ci --legacy-peer-deps` + `ng build --configuration production` |
| `production` | nginx:alpine | copy `dist/` + `nginx.conf`, expose 80 |
| `development` | node:22-alpine | dev server ผ่าน `docker-entrypoint.sh`, expose 4200 |

### docker-compose.yml

```bash
# Development — hot reload (volume mount ./src)
docker compose up dev
# → http://localhost:3010 (map 3010→4200)

# Production — nginx serve static
docker compose up production
# → http://localhost:3010 (map 3010→80)
```

- ทั้งสอง service ใช้ `env_file: .env`
- `extra_hosts: host.docker.internal:host-gateway` — ให้ container ยิง API ไป host machine ได้
- Compose watch: sync `./src`, rebuild เมื่อแก้ `package.json`, `angular.json`, `tailwind.config.js`, `tsconfig.json`

## Netlify Functions (Serverless Backend)

โค้ดอยู่ที่ `netlify/functions/`:

```
netlify/functions/
├── projects/          # CRUD projects
│   ├── index.ts       # router
│   ├── get.ts / post.ts / put.ts / delete.ts
└── posts/
    ├── index.ts
    └── helper.ts      # MongoDB connection
```

- ใช้ `@netlify/functions` + MongoDB driver
- Deploy config: `netlify.toml`
- Dev ในเครื่อง: `netlify dev` (ต้องติดตั้ง Netlify CLI)

## Environment per Mode

| ค่า | environment.ts (Dev) | environment.prod.ts (Prod) |
|-----|---------------------|---------------------------|
| production | false | true |
| useProxy | true | false |
| apiTargetUrl | http://localhost:5000 | http://localhost:5000 |
| apiFallback.enabled | true | false |
| logger.level | debug / pretty | warn / json |

> ⚠️ ก่อน deploy จริง ให้แก้ `apiEndpoints` ใน `environment.prod.ts`
> จาก localhost → URL ของ backend จริง

## Proxy (Development)

`proxy.conf.json` — forward API request ไป backend:

```json
{ "/api": { "target": "http://localhost:5000", "secure": false } }
```

(ดูตัวอย่างเพิ่มใน `note/proxy.conf docker.json`)

## Multi-API Fallback

Environment รองรับ backend หลายตัว (`apiEndpoints` + `apiFallback`):

- Primary: `http://localhost:5000` (priority 1)
- Secondary: `http://localhost:3003` (priority 2)
- Tertiary: `http://localhost:8000` (priority 3)

เมื่อ primary ล่ม (เกิน `failureThreshold`) จะ fallback ไปตัวถัดไป
— เอกสารเพิ่มเติม: `docs/api-fallback/`

## Deployment Checklist

1. ☐ แก้ `src/environments/environment.prod.ts` — apiUrl/apiEndpoints ชี้ backend จริง
2. ☐ ตั้ง `demo: false`
3. ☐ รัน `npm run build` ตรวจ error/budget
4. ☐ เลือกช่องทาง:
   - Docker: `docker compose up production`
   - Netlify: push + functions ทำงานอัตโนมัติผ่าน `netlify.toml`
5. ☐ ตรวจ CORS ฝั่ง backend สำหรับ domain ที่ deploy
