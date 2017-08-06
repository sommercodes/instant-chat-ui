FROM node:alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json .
COPY npm-shrinkwrap.json .
# For npm@5 or later, copy package-lock.json as well
# COPY package.json package-lock.json .

RUN npm install

RUN ls

# Bundle app source
COPY . .

RUN npm run build:prod

RUN ls
RUN ls dist

EXPOSE 8080

CMD [ "npm", "start" ]