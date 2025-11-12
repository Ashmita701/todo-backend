FROM node:18

WORKDIR /app

COPY package*.json ./

# Use npm install (not npm ci) to handle peer deps automatically
RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]








