FROM node:20.19.0-alpine3.21 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20.19.0-alpine3.21
WORKDIR /app
RUN apk add jq curl file
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/static ./static
RUN chmod +x ./static/zipline-script-file.sh
ENV NODE_ENV=production
CMD ["node", "build"]
