const buttons = document.querySelectorAll('.detail_button');

buttons.forEach(button => {
  button.addEventListener('click', (e) => {
    showDetail(e);
  })
})

function showDetail(button) {
  const id = '.id-' + String(button.target.id);
  const ordersDetail = document.querySelectorAll(id);
  ordersDetail.forEach(e => {
    if(e.classList.contains('hide_detail')) {
      e.classList.remove('hide_detail');
    }
    else{
      e.classList.add('hide_detail');
    }
  })
}