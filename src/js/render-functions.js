import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

let galleryBox = new SimpleLightbox('.gallery a');

export function createGallery(images) {
    const gallery = document.querySelector(".gallery");
    const markup = images.map((image) => {
        const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = image;
        return `<li class="img-li">
        <a href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" class="img">
        <div class="all-stats">
        <div class="stats"><p class="stats-name">Likes</p><p class="stats-value">${likes}</p></div>
        <div class="stats"><p class="stats-name">Views</p><p class="stats-value">${views}</p></div>
        <div class="stats"><p class="stats-name">Comments</p><p class="stats-value">${comments}</p></div>
        <div class="stats"><p class="stats-name">Downloads</p><p class="stats-value">${downloads}</p></div>
        </div>
        </a>
        </li>`
    }).join("");
    gallery.insertAdjacentHTML("beforeend", markup);
    galleryBox.refresh()
}

export function clearGallery() { 
    document.querySelector(".gallery").innerHTML = ''
}

export function showLoader() {
    document.querySelector(".loader").classList.remove("visually-hidden");
 }

export function hideLoader() {
    document.querySelector(".loader").classList.add("visually-hidden");
}

export function showLoadMoreButton() { 
    document.querySelector(".load-more").classList.remove("visually-hidden");
};

export function hideLoadMoreButton() { 
    document.querySelector(".load-more").classList.add("visually-hidden");
};

