FROM node:22-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /src

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de archivos de la app
COPY . .

# Comando para iniciar la aplicación
CMD ["npm", "start"]