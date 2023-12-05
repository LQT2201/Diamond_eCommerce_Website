formatCurrency = (price) => {
  return Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};
formatDate = (date) => {
  return date.toLocaleDateString("en-GB");
};
inc = (num) => {
  return num + 1;
}
module.exports = { formatCurrency, formatDate, inc };