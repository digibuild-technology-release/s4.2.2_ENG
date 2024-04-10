# Usa un'immagine base con Node.js
FROM node:14-alpine as build

# Imposta la directory di lavoro nel contenitore
WORKDIR /app

# Copia i file di dipendenza
COPY package.json ./

# Installa le dipendenze
RUN npm install

# Copia il resto del codice sorgente
COPY . .

FROM nginx:alpine 
COPY /default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]