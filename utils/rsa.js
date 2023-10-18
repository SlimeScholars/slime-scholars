var bigInt = require("big-integer");

function hexEncode(str) {
  var hex_array = [];
  for (var n = 0, l = str.length; n < l; n++) {
    var hex = Number(str.charCodeAt(n)).toString(16);
    hex_array.push(hex);
  }
  return hex_array.join("");
}

function hexDecode(hex) {
  var hex_array = hex.match(/.{1,2}/g);
  var str = "";
  for (var n = 0, l = hex_array.length; n < l; n++) {
    str += String.fromCharCode(parseInt(hex_array[n], 16));
  }
  return str;
}

export const encrypt = (msg, E, N) => {
  var m = hexEncode(msg);
  m = bigInt(m, 16);
  const c = m.modPow(E, N);
  return btoa(c);
};

export const decrypt = (c, D, N) => {
  c = bigInt(atob(c));
  const m = c.modPow(D, N);
  var str = m.toString(16);
  if (str.length % 2 == 1) {
    str = "0" + str;
  }
  var message = hexDecode(str);
  return message;
};
