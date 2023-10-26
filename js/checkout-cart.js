function show_display(id) {
    if (id == "shipment_content") {
        document.querySelector(`.row.${id}`).style.display = "block";
        document.querySelector(`.row.onstore_content`).style.display = "none";
    }
    if (id == "onstore_content") {
        document.querySelector(`.row.${id}`).style.display = "block";
        document.querySelector(`.row.shipment_content`).style.display = "none";
    }
}

var btn_online = document.querySelector('.btn_shipment_online')
var btn_offline = document.querySelector('.btn_shipment_offline')


btn_online.addEventListener('click', function () {
    btn_online.style.background = "#002d5c";
    btn_online.style.color = "#fff";
    btn_online.style.fontWeight = 600;
    btn_offline.style.background = "#bebebe";
    btn_offline.style.color = "black";
    btn_offline.style.fontWeight = 600;
})

btn_offline.addEventListener('click', function () {
    btn_offline.style.background = "#002d5c";
    btn_offline.style.color = "#fff";
    btn_offline.style.fontWeight = 600;
    btn_online.style.background = "#bebebe";
    btn_online.style.color = "black";
    btn_online.style.fontWeight = 600;
})

/*check active */
var check_genders = document.querySelector('.sex').querySelectorAll("input[name='male_female']")
var check_name = document.querySelector('.infor_name').querySelector('input')
var check_sdt = document.querySelector('.infor_sdt').querySelector('input')
var check_email = document.querySelector('.infor_email').querySelector('input')
var check_birth = document.querySelector('.infor_birth').querySelector('input')
var check_active = document.querySelector('.infor_btn').querySelector('button')
var isGender_Checked = false;
var isActive = false;

check_active.addEventListener('click', function () {

    if (isActive == true) {
        check_active.textContent = 'Tiếp tục'
        check_name.value = '';
        check_sdt.value = '';
        check_email.value = '';
        check_birth.value = '';
        for (var i = 0; i < check_genders.length; i++) {
            check_genders[i].checked = check_genders[i].defaultChecked;
        }
        var progress_check = document.querySelector('.progress-lists').querySelector('li');
        progress_check.classList.remove('active')
        isActive = false;
    } else {
        for (var i = 0; i < check_genders.length; i++) {
            if (check_genders[i].checked == true) {
                isGender_Checked = true;
                break;
            }
        }
        if (check_name.value.length != 0 &
            check_sdt.value.length != 0 &
            check_email.value.length != 0 &
            check_birth.value.length != 0 &
            isGender_Checked == true
        ) {
            var progress_check = document.querySelector('.progress-lists').querySelector('li');
            progress_check.classList.add('active')
            check_active.textContent = 'Hủy bỏ';
            isActive = true
        }
    }


})

