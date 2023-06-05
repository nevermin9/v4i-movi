FROM node:18-alpine
WORKDIR /app
COPY package.json yarn.lock ./
#RUN yarn install --production
RUN yarn install
COPY . .
RUN yarn build
CMD ["yarn", "preview"]
EXPOSE 3000
#CMD ["pnpm" "run"]
