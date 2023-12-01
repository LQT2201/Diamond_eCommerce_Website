formatCurrency = (price) => {
  return Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};
module.exports = { formatCurrency };