const searchParams = new URLSearchParams(window.location.search);
const checkBoxes = document.querySelectorAll('input[type=checkbox]');
const sortType = document.getElementById('sort_by')
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
  window.location.search = searchParams;
})