# Final Project Kelompok 53

- [⚙️ Backend](#⚙️-backend)
    - [🛠 Development Backend](#🛠-development-backend)
    - [📲 Contoh Response](#📲-contoh-response)
- [🖼 Frontend](#🖼-frontend)
    - [📦 Package Penting](#📦-package-penting)
    - [🛠 Development Frontend](#🛠-development-frontend)

---

# ⚙️ Backend

Buka terminal favorit kalian dan jalankan perintah-perintah berikut ini.

## 🛠 Development Backend

Untuk menjalankan Project Backend:

```sh
go run main.go
```

Untuk menambahkan Admin:

```sh
localhost:8080/admin/register
```

Untuk login Admin:

```sh
localhost:8080/login
```

## 📲 Contoh Response

JSON data Admin register:
```sh
{  
 "username":"admin",
  "phone":"12345",
  "email":"admin123",
  "password":"admin12345"
}
```

JSON data Admin login:
```sh
{  
  "email":"admin123",
  "password":"admin12345"
}
```

Contoh response register dan login untuk Client, sama dengan Admin.

---

# 🖼 Frontend

Berikut ini adalah panduan instalasi hingga cara menjalankan local development pada Project Frontend.

## 📦 Package Penting

Ada 3 package/library penting yang digunakan disini, yaitu:
- Chakra UI
- Axios
- JSON Server (hanya untuk development)

Khusus untuk JSON Server, pastikan sudah ter-install di PC masing-masing. Jika belum, lakukan instalasi secara global.

```sh
npm install -g json-server
```

Kemudian, pastikan juga seluruh dependensi yang dibutuhkan telah ter-install.

```sh
npm install
```

## 🛠 Development Frontend

Kita harus menjalankan 2 local sever pada project ini. Satu untuk `react-js` dan satunya lagi untuk local `json-sever` yang berfungsi sebagai endpoint API sementara.

**react-js**
```sh
npm run start
```

**json-server** (dengan custom port: 8000)
```sh
npm run json-server --watch _data/db.json --port 8000
```

Kemudian periksa url [http://localhost:3000](http://localhost:3000) pada browser untuk melihat hasilnya. 

