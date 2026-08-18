# ---- Stage 1: Build ----
FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

COPY . .

ENV SASS_SILENCE_DEPRECATIONS=import
RUN npx ng build --configuration production

# ---- Stage 2: Production (nginx) ----
FROM nginx:alpine AS production

COPY --from=build /app/dist/angular-clean-architecture-serverless/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# ---- Stage 3: Development (node) ----
FROM node:22-alpine AS development

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

COPY . .

ENV SASS_SILENCE_DEPRECATIONS=import

EXPOSE 4200

RUN chmod +x docker-entrypoint.sh
CMD ["sh", "docker-entrypoint.sh"]
