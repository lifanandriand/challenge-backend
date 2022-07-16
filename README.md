NOTE APP API

Teknologi yang digunakan dalam pembuatan project ini :
- nodeJS sebagai runtime dan ExpressJS sebagai server
- postgreSQL untuk database dan Sequelize sebagai ORM
- jwt untuk generate token dan passport-jwt sebagai middleware untuk authentikasi user
- fastest-validator untuk validasi input user
- multer sebagai upload image dengan form data
- imagekit sebagai media penyimpanan cloud untuk inputan gambar
- jest & supertest sebagai media testing dan menampilkan coverage testing
- truncate untuk mengosongkan isi tabel

Alasan menggunakan pattern yang saya gunakan dalam mengerjakan project ini :

Dengan menggunakan pattern ini saya dapat membuat struktur folder pada project saya sesuai dengan apa yang inginkan. Sebelumnya saya juga mengikuti studi independen di binar academy dan sudah terbiasa dengan struktur folder yang diajarkan di binar academy. Dengan pattern ini foldernya dipisahkan berdasarkan fungsinya, seperti pada folder validator berisi schecma data untuk fastest-validator, lalu pada folder library dan helpers berisi beberapa fungsi yang dapat saya gunakan berulang-ulang seperti responseformatter, truncate, pada folder routes hanya berisi routing untuk user dan notes.

