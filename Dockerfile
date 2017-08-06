FROM node:6

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json .
# COPY npm-shrinkwrap.json .
# For npm@5 or later, copy package-lock.json as well
# COPY package.json package-lock.json .

RUN npm install -g node-gyp

RUN npm install socket.io

RUN npm install

# Bundle app source
COPY . .

# build app
RUN npm run build:prod

EXPOSE 4200

CMD [ "npm", "start" ]