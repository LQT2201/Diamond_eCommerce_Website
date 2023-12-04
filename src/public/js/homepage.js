
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

        [...dotItem].forEach((item) =>
            item.addEventListener("click",function(e) {
                [...dotItem].forEach(el => el.classList.remove("active"));
                e.target.classList.add("active");
                slideIndex = parseInt(e.target.dataset.index);
                index =slideIndex;
                positionX = -1 * sliderItemWidth *index;
                console.log(positionX)
                sliderMain.style = `transform: translateX(${positionX}px)`;
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
                    index = slidesLength-1;
                    return;
                }
                positionX = positionX - sliderItemWidth;
                sliderMain.style.transform = `translateX(${positionX}px)`;
                index++;
                
            } else if(direction === -1) {     
                if(index <= 0 ) {
                    index = 0;
                    return;
                }
                positionX = positionX + sliderItemWidth;
                sliderMain.style.transform = `translateX(${positionX}px)`;
                index--;
            }
            [...dotItem].forEach(el => el.classList.remove("active"))
            dotItem[index].classList.add("active");
        }

    });
