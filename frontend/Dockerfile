FROM node:22-alpine AS builder

ARG VITE_API_URL=http://localhost:5000/api
ENV VITE_API_URL=$VITE_API_URL

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci && npm cache clean --force

COPY . .

RUN npm run build

FROM node:22-alpine AS runner

RUN apk add --no-cache wget && addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

RUN npm install -g serve && npm cache clean --force

COPY --from=builder /app/dist ./dist

RUN chown -R appuser:appgroup /app

USER appuser

EXPOSE 5173

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5173 || exit 1

CMD ["serve", "-s", "dist", "-l", "5173", "--no-clipboard"]
