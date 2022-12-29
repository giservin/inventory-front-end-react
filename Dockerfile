FROM node:lts-alpine AS builder
LABEL stage=builder
RUN mkdir /app
WORKDIR /app
COPY . .
RUN apk add xargs && \
    export $(grep -v '^#' .env.example | xargs -d '\n')
RUN npm install
RUN npm run build

FROM nginx:alpine AS server
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]