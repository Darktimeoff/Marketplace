FROM node:22-slim
WORKDIR /code/
ADD package.json package-lock.json /code/
RUN npm ci  
ADD . /code/
RUN --mount=type=cache,target=/tmp npx adminforth bundle
CMD ["sh", "-c", "npm run migrate:prod && npm run prod"]
