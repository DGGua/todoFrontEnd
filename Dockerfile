FROM node:16
WORKDIR /app
COPY pnpm-lock.yaml /app
COPY package.json /app
RUN npm i -g pnpm && pnpm install
COPY ./ /app
RUN pnpm build

FROM nginx
RUN mkdir /app
COPY --from=0 /app/build /app
COPY nginx.conf /etc/nginx/nginx.conf