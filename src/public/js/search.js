const searchParams = new URLSearchParams(window.location.search);
const checkBoxes = document.querySelectorAll('input[type=checkbox]');
const sortType = document.getElementById('sort_by')
const prices = document.querySelectorAll('.input-price');
sortType.value = searchParams.get('sort_type') ? searchParams.get('sort_type') : 0;
sortType.addEventListener("change",e => {
  searchParams.set('sort_type', e.target.value);
  window.location.search = searchParams;
})
checkBoxes.forEach(box => {
  box.addEventListener('change', e => checkedBox(e));
  if(searchParams.has(box.className, box.value)) {
    box.checked = true;
    box.parentElement.classList.add('active');
  }
})
prices.forEach(price => {
  if(searchParams.has(price.id)) {
    price.value = searchParams.get(price.id);
  }
})
function checkedBox(box) {
  if(box.target.checked) {
    searchParams.append(box.target.className, box.target.value);
    box.target.parentElement.classList.add('active');
  }
  else {
    searchParams.delete(box.target.className, box.target.value)
    box.target.parentElement.classList.remove('active');
  }
}

document.getElementById('apply-filter').addEventListener('submit', async e => {
  e.preventDefault();  
  if(prices[0]?.value.length > 0 && prices[1]?.value.length > 0) {
    searchParams.set('price_from', prices[0].value);
    searchParams.set('price_to', prices[1].value);
  }
  window.location.search = searchParams;
})