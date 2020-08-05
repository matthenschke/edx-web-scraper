FROM node:12

# Create app dir
WORKDIR /usr/src/app

# copy package.json and package-lock.json
COPY package*.json ./

RUN npm install
RUN npm ci --only=production

# get app source
COPY . .

EXPOSE 8000
CMD [ "node", "app.js" ]