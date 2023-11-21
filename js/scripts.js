document.addEventListener('DOMContentLoaded', function() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.querySelector('.main-image');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            const thumbnailSrc = thumbnail.src;
            mainImage.src = thumbnailSrc;
        });
    });
});
