
export default class Helpers {
  static convertToRupiah(num) {
    var rupiah = '';
    var numrev = num.toString().split('').reverse().join('');
    for (var i = 0; i < numrev.length; i++) 
      if (i % 3 === 0) rupiah += numrev.substr(i, 3) + '.';

    return 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('');
  }
  
  static getPrice(rating) {
    if (+rating <= 3) {
      return 3500
    }

    if (+rating > 3 && +rating <= 6) {
      return 8250;
    }

    if (+rating > 6 && +rating <= 8) {
      return 16350
    }

    if (+rating > 8 && +rating <= 10) {
      return 21250
    }
  }
}