window.addEventListener("load", function () {
    const slider =document.querySelector('.slider');
    const sliderMain =document.querySelector('.slider-main');
    const sliderItems =document.querySelectorAll('.slider-item');
    const nextBtn =document.querySelector('.slider-next');
    const prevBtn =document.querySelector('.slider-prev');
    const dotItem =document.querySelectorAll('.slider-dot');
    const sliderItemWidth = sliderItems[0].offsetWidth;
    const slidesLength =sliderItems.length;

    let index = 0;
    let positionX = 0;

    const interval = setInterval(() => {
        handlleChangeSlide(1);
    }, 1500); // Tự động thay đổi sau 1 giây

    [...dotItem].forEach((item) =>
        item.addEventListener("click",function(e) {
            clearInterval(interval); // Dừng tự động chuyển slide khi click vào chấm
            [...dotItem].forEach(el => el.classList.remove("active"));
            e.target.classList.add("active");
            slideIndex = parseInt(e.target.dataset.index);
            index = slideIndex;
            positionX = -1 * sliderItemWidth * index;
            console.log(positionX)
            sliderMain.style.transform = `translateX(${positionX}px)`;
        })
    );

    nextBtn.addEventListener("click", function () {
        handlleChangeSlide(1);
    });

    prevBtn.addEventListener("click", function () {
        handlleChangeSlide(-1);
    });

    function handlleChangeSlide(direction) {
        if(direction === 1) {
            if(index >= slidesLength-1) {
                index = 0; // Quay lại ảnh đầu tiên khi đến ảnh cuối cùng
            } else {
                index++;
            }
        } else if(direction === -1) {     
            if(index <= 0 ) {
                index = slidesLength-1; // Quay lại ảnh cuối cùng khi đến ảnh đầu tiên
            } else {
                index--;
            }
        }

        positionX = -1 * sliderItemWidth * index;
        sliderMain.style.transform = `translateX(${positionX}px)`;

        [...dotItem].forEach(el => el.classList.remove("active"));
        dotItem[index].classList.add("active");
    }

});
//<!-- Advertisement-->

// Add a click event listener to the skip button
document.getElementById('skipButton').addEventListener('click', function () {
    // Hide the advertisement when the skip button is clicked
    document.querySelector('.ads').style.display = 'none';
});

document.addEventListener("DOMContentLoaded", function() {
    // Chờ 5 giây trước khi hiển thị quảng cáo
    setTimeout(function() {
        // Hiển thị quảng cáo
        document.getElementById("advertisement").style.display = "block";
    }, 1000); // 1000 milliseconds = 1 seconds
});
