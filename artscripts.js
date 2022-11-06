const artArr = ['https://i.imgur.com/Aw8Oh1i.jpg', 'https://i.imgur.com/abw5kJU.jpg', 'https://i.imgur.com/ZR3gN3P.jpg'];
const artExplanations = ['Title: Moneyshot<br>This painting ', 'movement', 'self portrait']
let currentImgIndex = 0;
let numOfImages = artArr.length - 1;

// This script contains the basic code to make a carousel work.

function carouselLeft() {
    console.log('carousel left');
    if (currentImgIndex > 0) {
        $('#carouselImage').children().eq(currentImgIndex).css('display', 'none');
        currentImgIndex--;
        $('#carouselImage').children().eq(currentImgIndex).css('display', 'block');
    } else {
        $('#carouselImage').children().eq(currentImgIndex).css('display', 'none');
        currentImgIndex = numOfImages;
        $('#carouselImage').children().eq(currentImgIndex).css('display', 'block');
    }

}

function carouselRight() {
    console.log('carousel right');
    if (currentImgIndex < numOfImages) {
        $('#carouselImage').children().eq(currentImgIndex).css('display', 'none');
        currentImgIndex++;
        $('#carouselImage').children().eq(currentImgIndex).css('display', 'block');
    } else {
        $('#carouselImage').children().eq(currentImgIndex).css('display', 'none');
        currentImgIndex = 0;
        $('#carouselImage').children().eq(currentImgIndex).css('display', 'block');
    }
}

$(() => {
    for (let i = 0; i < artArr.length; i++) {
        const imgToAdd = $('<img>').attr('src', artArr[i]).addClass('artImage');
        $('#carouselImage').append(imgToAdd);
    }

    $('#artCarouselLeft').click(carouselLeft);
    $('#artCarouselRight').click(carouselRight);
});