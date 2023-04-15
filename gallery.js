let images = [];
let currentIndex = 0;
let timer;

const galleryElement = document.getElementById("gallery");
const imgElement = galleryElement.querySelector("img");
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const updateButton = document.getElementById("update");

function loadImageList() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "gallery.txt", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            images = JSON.parse(xhr.responseText);
            currentIndex = 0;
            displayImage();
        }
    };
    xhr.send();
}

function displayImage() {
    clearTimeout(timer);
    imgElement.src = "images/" + images[currentIndex].filename;
    timer = setTimeout(nextImage, images[currentIndex].duration);
}

function previousImage() {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    }
    displayImage();
}

function nextImage() {
    currentIndex++;
    if (currentIndex >= images.length) {
        currentIndex = 0;
    }
    displayImage();
}

previousButton.addEventListener("click", previousImage);
nextButton.addEventListener("click", nextImage);
updateButton.addEventListener("click", loadImageList);

loadImageList();