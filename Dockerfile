FROM node:latest

# install simple http server for serving static content
RUN npm install -g http-server

# make the 'app' folder the current working directory
WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

# install project dependencies
RUN yarn install

# copy project files and folders to the current working directory
COPY . .

RUN yarn build

EXPOSE 8080

# serve the built dist folder
CMD [ "http-server", "dist" ]

