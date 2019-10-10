FROM node:11-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm i

# Bundle app source
COPY ./ ./

ENV PORT=8080
EXPOSE $PORT
CMD [ "npm", "start" ]
