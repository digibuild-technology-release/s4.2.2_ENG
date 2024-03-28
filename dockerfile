# Usa un'immagine base di Node.js
FROM node:14

# Imposta la directory di lavoro nell'app
WORKDIR /app

# Copia il file package.json e package-lock.json nella directory di lavoro
COPY package*.json ./

# Installa le dipendenze dell'app
RUN npm install

RUN npm i bcrypt

# Copia tutti i file nell'applicazione
COPY . .

# Espone la porta 3000 per l'applicazione
EXPOSE 3000

# Comando per avviare l'app
CMD ["node", "server.js"]
