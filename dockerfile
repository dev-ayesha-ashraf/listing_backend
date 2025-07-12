# === Build Stage ===
FROM node:18-alpine AS build
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# === Production Stage ===
FROM node:18-alpine AS production
WORKDIR /usr/src/app

COPY --from=build /usr/src/app/.next ./.next
COPY --from=build /usr/src/app/public ./public
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/next.config.ts ./next.config.ts
COPY .env .env

EXPOSE 5050
CMD ["npm", "run", "start"]
