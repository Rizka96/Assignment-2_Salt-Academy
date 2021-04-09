# Clash of Villages - Online Multiplayer Games

User memiliki Townhall secara otomatis dan user akan diberikan modal 100 golds dan 100 foods.
Tiap User hanya akan memiliki satu Townhall.
User dapat melihat resource yang dimiliki.

Selanjutnya user harus bisa membuat Market untuk menghasilkan gold.
Biaya untuk membangun Market adalah 30 golds dan 10 foods.
Market menghasilkan 1 gold/menit.
Market memiliki daya tampung sebesar 20 golds.
Setiap Market harus memiliki namanya masing-masing.

User dapat mellihat semua list Market.
User dapat melihat detail Market, termasuk resource yang sudah digenerate.
User dapat mengganti nama Market.
User dapat merobohkan Market.
User dapat collect resource pada market tertentu.

Selanjutnya user harus bisa membuat Farm & Barrack.
Biaya untuk membangun Farm adalah 10 golds dan 30 foods.
Farm menghasilkan 1 food/menit.
Farm memiliki daya tampung sebesar 20 foods.

Biaya untuk membangun Barrack adalah 30 golds dan 30 foods.
Barrack menghasilkan 1 soldier/menit.
Barrack memiliki daya tampung sebesar 10 soldiers.

Seperti Market, untuk Farm dan Barrack harus memiliki namanya masing-masing.

User dapat mellihat semua list Farm/Barrack.
User dapat melihat detail Farm/Barrack, termasuk resource yang sudah digenerate.
User dapat mengganti nama Farm/Barrack.
User dapat merobohkan Farm/Barrack.
User dapat collect resource pada Farm/Barrack tertentu.

User dapat menyerang user lain untuk merampas resource pada Townhall mereka. Keberhasilan akan dirandom antara sukses dan gagal dengan basis keberhasilan ditentukan berdasarkan jumlah soldier yang dikirim. Soldiers yang dikirim, baik serangan berhasil maupun gagal akan hilang.

Jika serangan berhasil:
- penyerang: mendapatkan tambahan 5 medal
- penyerang: mendapatkan setengah dari golds dan foods pada di Townhall lawan
- yang diserang: jumlah soldiers menjadi 0

Jika serangan gagal:
- penyerang: setengah medal hilang (pembulatan ke bawah, jika current 5 akan jadi 2)
- yang diserang: mendapatkan 2 medal

Gunakan fungsi berikut untuk menentukan kesuksesan serangan:
```
const arr = [];
for(let i=0; i<3; i++) {
  arr.push(Math.random() < (<soldiers_dikirim> / (<soldiers_townhall_lawan> + 1)))
}
const isSuccess = arr.filter(el => el).length >= 2 ? true : false;
```

notes:
- Kamu tidak perlu membuat endpoint untuk listing user lain, ketika mencoba cukup hardcode id user saja.
- Perhatikanlah rule-rule yang perlu diimplementasi, seperti email yang harus unik, minimmal length, etc.
- Point plus jika kamu bisa menambahkan validasi email address.


Supaya game lebih menarik, buatlah limitasi berikut:
- Townhall hanya dapat menampung 1000 golds, 1000 foods dan 500 soldiers.
- User hanya dapat membuat maksimal 30 barrack.
- User dengan jumlah soldiers pada Townhall dibawah 50 tidak dapat diserang.
