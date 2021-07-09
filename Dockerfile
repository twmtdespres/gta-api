FROM node:16-alpine

# Create app directory
# RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app


# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

EXPOSE 3333
CMD [ "npm", "start" ]