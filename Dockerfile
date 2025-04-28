FROM node:23-slim

WORKDIR /code

# start with dependencies to enjoy caching
COPY ./package.json /code/package.json
COPY ./package-lock.json /code/package-lock.json
RUN npm ci

# copy rest and build
COPY . /code/.
RUN npm run build
RUN mv dist CS4530-Summer-2025
RUN mkdir dist
RUN mv CS4530-Summer-2025 dist
