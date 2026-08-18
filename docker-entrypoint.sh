#!/bin/sh

echo "[Docker] Checking backend connectivity..."

TARGET="http://host.docker.internal:5000"
FALLBACK="http://localhost:5000"

if nc -z -w2 host.docker.internal 5000 2>/dev/null; then
  echo "[Docker] host.docker.internal:5000 is reachable"
  TARGET="http://host.docker.internal:5000"
elif nc -z -w2 localhost 5000 2>/dev/null; then
  echo "[Docker] localhost:5000 is reachable"
  TARGET="http://localhost:5000"
else
  echo "[Docker] No backend reachable, defaulting to host.docker.internal:5000"
  TARGET="http://host.docker.internal:5000"
fi

cat > /app/proxy.conf.json <<EOF
{
  "/api": {
    "target": "${TARGET}",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  }
}
EOF

echo "[Docker] Proxy config: ${TARGET}"
echo "[Docker] Starting Angular dev server..."

exec npx ng serve --host 0.0.0.0 --port 4200 --poll 2000
