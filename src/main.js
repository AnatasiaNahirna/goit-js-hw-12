import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import getImages from "./js/pixabay-api"
import {createGallery as markup, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton} from "./js/render-functions"

const form = document.querySelector(".form");

let search;
form.addEventListener("submit", (ev) => {
    ev.preventDefault()
    hideLoadMoreButton()
    search = ev.currentTarget.elements['search-text'].value.trim()
    if (!search) {
        iziToast.show({
            message: 'Please fill in the field',
            messageColor: "#fff",
            backgroundColor: "#EF4040",
            position: "topRight",
        });
            return;
    }

    showLoader();
    clearGallery();
    getImages(search)
        .then((images) => {
            let page = 1;
            if (images.length >= 15) { showLoadMoreButton() };
            document.querySelector(".load-more").addEventListener("click", (ev) => {
                ev.preventDefault()
                showLoader()
                page += 1;
                getImages(search, page)
                    .then((images) => {
                        hideLoader()
                        markup(images)
                        const liSize = document.querySelector(".img-li").getBoundingClientRect().height * 2;
                        window.scrollBy({
                            top: liSize,
                            behavior: "smooth",
                        });
                        return;
                    })

            })
            page = 1;

            return markup(images);
        })
        .catch((error) => {
            iziToast.show({
                message: 'Error happened',
                messageColor: "#fff",
                backgroundColor: "#EF4040",
                position: "topRight",
            });
            return;
        })
        .finally(() => { hideLoader() })
});