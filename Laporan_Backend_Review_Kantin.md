# LAPORAN PRAKTIKUM BACKEND
## Implementasi Backend Review Kantin

---

## 1. Identitas

| Data | Keterangan |
|---|---|
| Nama | [ISI NAMA LENGKAP] |
| NIM | [ISI NIM] |
| Kelas | [ISI KELAS] |
| URL Repository GitHub | [ISI URL REPOSITORY] |

---

## 2. Bukti Screenshot

### 2.1 Struktur Database

Database aplikasi Review Kantin menggunakan SQL Server dan terdiri atas tujuh tabel berikut:

1. `USERS`
2. `STALLS`
3. `MENU_ITEMS`
4. `REVIEWS`
5. `LIKES`
6. `FLAGS`
7. `AUDIT_LOGS`

**Bukti struktur database (tampilkan ketujuh tabel dan relasinya):**

> [TEMPEL SCREENSHOT STRUKTUR DATABASE 7 TABEL DI SINI]
>
> Keterangan: [TULIS APLIKASI/TOOLS YANG DIGUNAKAN DAN HAL YANG DITUNJUKKAN SCREENSHOT]

### 2.2 Bukti Testing Endpoint

Lampirkan satu screenshot hasil pengujian untuk setiap tabel. Screenshot dapat berasal dari Swagger UI pada `http://localhost:3000/docs` atau API client lain. Pastikan URL, method, request (jika ada), status response, dan hasil response terlihat.

#### a. USERS

Endpoint yang diuji: `GET /api/v1/users`  
Hasil yang diharapkan: daftar user ditampilkan tanpa mengekspos `passwordHash`.

> [TEMPEL SCREENSHOT TESTING USERS DI SINI]
>
> Status/hasil aktual: [ISI STATUS HTTP DAN KETERANGAN]

#### b. STALLS

Endpoint yang diuji: `GET /api/v1/stalls/:id`  
Hasil yang diharapkan: detail warung yang sesuai dengan ID ditampilkan.

> [TEMPEL SCREENSHOT TESTING STALLS DI SINI]
>
> Status/hasil aktual: [ISI STATUS HTTP DAN KETERANGAN]

#### c. MENU_ITEMS

Endpoint yang diuji: `GET /api/v1/menu-items`  
Hasil yang diharapkan: daftar menu ditampilkan bersama informasi stall terkait.

> [TEMPEL SCREENSHOT TESTING MENU_ITEMS DI SINI]
>
> Status/hasil aktual: [ISI STATUS HTTP DAN KETERANGAN]

#### d. REVIEWS

Endpoint yang diuji: `GET /api/v1/reviews`  
Hasil yang diharapkan: daftar review ditampilkan bersama identitas user yang menulis review.

> [TEMPEL SCREENSHOT TESTING REVIEWS DI SINI]
>
> Status/hasil aktual: [ISI STATUS HTTP DAN KETERANGAN]

#### e. LIKES

Endpoint yang diuji: `POST /api/v1/likes`  
Contoh request body:

```json
{
  "reviewId": 1,
  "userId": 2
}
```

Hasil yang diharapkan: like berhasil dibuat dan jumlah like pada review bertambah.

> [TEMPEL SCREENSHOT TESTING LIKES DI SINI]
>
> Status/hasil aktual: [ISI STATUS HTTP DAN KETERANGAN]

#### f. FLAGS

Endpoint yang diuji: `GET /api/v1/flags`  
Hasil yang diharapkan: daftar laporan/flag ditampilkan beserta statusnya.

> [TEMPEL SCREENSHOT TESTING FLAGS DI SINI]
>
> Status/hasil aktual: [ISI STATUS HTTP DAN KETERANGAN]

#### g. AUDIT_LOGS

Endpoint yang diuji: `GET /api/v1/audit-logs`  
Hasil yang diharapkan: daftar aktivitas audit ditampilkan.

> [TEMPEL SCREENSHOT TESTING AUDIT_LOGS DI SINI]
>
> Status/hasil aktual: [ISI STATUS HTTP DAN KETERANGAN]

### 2.3 Bukti Filtering dan Pagination

Endpoint yang diuji: `GET /api/v1/stalls?search=kantin&category=Minuman&page=1&limit=5`

Hasil yang diharapkan: data warung sesuai filter ditampilkan, jumlah item per halaman mengikuti `limit`, dan response menyertakan informasi `page`, `limit`, serta `total`.

> [TEMPEL SCREENSHOT TESTING FILTERING DAN PAGINATION DI SINI]
>
> Parameter yang digunakan: [ISI NILAI search, category, page, limit]
>
> Status/hasil aktual: [ISI STATUS HTTP DAN KETERANGAN]

### 2.4 Bukti JOIN Data

Endpoint yang diuji: `GET /api/v1/menu-items`  
Hasil yang diharapkan: setiap item menu memuat informasi stall terkait, misalnya nama atau lokasi stall. Endpoint `GET /api/v1/reviews` juga menggabungkan data user dengan review.

> [TEMPEL SCREENSHOT TESTING JOIN DATA DI SINI]
>
> Tabel yang di-JOIN: [CONTOH: MENU_ITEMS dengan STALLS]
>
> Status/hasil aktual: [ISI STATUS HTTP DAN KETERANGAN]

---

## 3. Refleksi

### 3.1 Kendala

Kendala yang dialami selama pengerjaan antara lain memahami alur kerja backend yang dipisahkan ke beberapa lapisan, mencocokkan model Drizzle dengan struktur tabel SQL Server, serta memastikan operasi JOIN dan hasil response mengikuti relasi antartabel. Dokumentasi Swagger juga perlu diperbarui setelah definisi endpoint berubah; file spesifikasi yang sudah dimuat oleh server tidak otomatis berubah selama proses server masih berjalan.

> [SESUAIKAN BAGIAN INI DENGAN KENDALA YANG BENAR-BENAR DIALAMI]

### 3.2 Solusi

Kendala tersebut diatasi dengan memeriksa DDL database dan schema Drizzle sebagai acuan nama kolom, tipe data, foreign key, serta constraint. Implementasi mengikuti pola repository, service, controller, dan router agar tanggung jawab setiap bagian terpisah. Query relasi dibuat menggunakan JOIN Drizzle. Setelah endpoint berubah, dokumentasi Swagger digenerate ulang dan server dijalankan kembali agar spec terbaru dimuat.

> [TAMBAHKAN LANGKAH LAIN YANG DILAKUKAN, JIKA ADA]

### 3.3 Pemahaman

**CRUD.** CRUD adalah singkatan dari Create, Read, Update, dan Delete. Dalam API, operasi tersebut umumnya diwujudkan melalui HTTP `POST` untuk membuat data, `GET` untuk membaca, `PUT` untuk memperbarui, dan `DELETE` untuk menghapus. Tidak semua tabel memerlukan seluruh operasi tersebut; endpoint mengikuti kebutuhan masing-masing tabel.

**Layered backend architecture.** Backend dibagi menjadi beberapa lapisan dengan tanggung jawab yang berbeda. Router memetakan URL dan method HTTP ke handler. Controller menerima request dan membentuk response. Service menjalankan aturan atau validasi bisnis. Repository menangani akses dan query database. Pemisahan ini membuat perubahan query atau aturan bisnis lebih terlokalisasi dan kode lebih mudah diuji serta dipelihara.

**ORM.** Object-Relational Mapper (ORM) menyediakan cara untuk berinteraksi dengan tabel database melalui objek dan API dalam bahasa pemrograman. Pada aplikasi ini, Drizzle ORM digunakan untuk memetakan tabel SQL Server ke schema TypeScript dan menyusun query tanpa menulis seluruh query sebagai string SQL manual.

**Parameterized query dengan ORM.** Nilai input pengguna diberikan sebagai nilai pada builder query Drizzle, bukan digabungkan langsung ke string SQL. ORM mengirimkannya sebagai parameter query sehingga input diperlakukan sebagai data, bukan bagian dari perintah SQL. Pola ini membantu mengurangi risiko SQL injection. Filter pencarian dan kondisi berdasarkan ID juga dibentuk melalui API query Drizzle.

**Filtering dan pagination.** Filtering membatasi hasil berdasarkan kriteria, seperti nama pencarian atau kategori warung. Pagination membagi hasil menjadi beberapa halaman agar response tidak selalu memuat seluruh data. Parameter `page` menentukan halaman yang diminta, sedangkan `limit` menentukan jumlah data per halaman. Informasi `total` membantu client mengetahui jumlah seluruh data yang sesuai filter.

**Integrasi backend dengan database.** Backend terhubung ke SQL Server menggunakan konfigurasi koneksi dari environment variables. Schema Drizzle menjadi representasi tabel yang digunakan aplikasi, sementara repository menjalankan operasi baca/tulis. Foreign key menjaga hubungan data, dan query JOIN mengambil informasi dari tabel terkait dalam satu hasil response.

### 3.4 Kesimpulan

Pengerjaan ini menghasilkan backend Review Kantin berbasis Express, Drizzle ORM, dan SQL Server dengan endpoint yang disesuaikan terhadap kebutuhan setiap tabel. Implementasi mencakup operasi CRUD sesuai kebutuhan, filtering dan pagination untuk data warung, JOIN untuk menu dan review, serta pemisahan kode ke dalam lapisan repository, service, controller, dan router. Pengujian endpoint dan bukti screenshot melengkapi verifikasi bahwa backend berkomunikasi dengan database sesuai rancangan.

> [SESUAIKAN KESIMPULAN DENGAN HASIL TESTING DAN PENGALAMAN PRIBADI]
