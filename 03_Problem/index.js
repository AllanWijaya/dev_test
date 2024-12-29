const array = [222, 221, 224];
let newArray = [];
const len = array.length - 1;
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let finalNumber = 0;
const findNumber = (arr) => {
  const newArr = arr.sort();
  let j = 0;
  for (let i = newArr[0]; i < newArr[len] + 1; i++) {
    if (i !== newArr[j]) {
      finalNumber = i;
      return false;
    }
    j++;
  }
  return true;
};
function askNumbers(total, index = 1) {
  if (index > total) {
    // Jika semua angka sudah diinput, proses hasil
    const truth = findNumber(newArray);
    truth
      ? console.log("Tidak ada nomor yang hilang")
      : console.log(finalNumber);
    readline.close();
    return;
  }

  readline.question(`Masukkan angka ke-${index}? `, (number) => {
    newArray.push(Number(number)); // Simpan angka ke array
    askNumbers(total, index + 1); // Panggil ulang untuk angka berikutnya
  });
}
readline.question("Masukkan jumlah angka dalam array? ", (target) => {
  askNumbers(target);
  // readline.close();
});
