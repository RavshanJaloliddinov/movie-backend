# Node.js versiyasi sifatida node:18-alpine ni tanlang
FROM node:18-alpine

# Ishchi katalogni yaratish
WORKDIR /usr/local/app

# Loyihangizning barcha fayllarini konteynerga nusxalash
COPY . .

# Kerakli kutubxonalarni o'rnatish
RUN npm install


EXPOSE 4000

# Kontyner ishga tushganda ishlatadigan buyruq
CMD [ "node", "backend/dist/main.js" ]
