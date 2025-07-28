import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import getImages from "./js/pixabay-api"
import {createGallery as markup, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton} from "./js/render-functions"

const form = document.querySelector(".form");
let page = 1;
let search;
document.querySelector(".load-more").addEventListener("click", onLoadMoreclick);

async function onLoadMoreclick(ev) {
    ev.preventDefault()
    showLoader()
    page += 1;
    try {
        const imagesGet = await getImages(search, page)
            markup(imagesGet.hits)
            const liSize = document.querySelector(".img-li").getBoundingClientRect().height * 2;
            window.scrollBy({
                top: liSize,
                behavior: "smooth",
            });

            if (imagesGet.hits.length < 15 || page * 15 === imagesGet.totalHits) {
                hideLoadMoreButton();
                iziToast.show({
                    message: "We're sorry, but you've reached the end of search results.",
                    messageColor: '#fff',
                    backgroundColor: '#EF4040',
                    position: 'topRight',
                });
            }     
            return;
    } catch (error) {
        iziToast.show({
            message: "Error happened",
            messageColor: '#fff',
            backgroundColor: '#EF4040',
            position: 'topRight',
        });
        return;
    } finally {hideLoader()}
}

form.addEventListener("submit", async (ev) => {
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
    page = 1;
    try {
        const imagesGet = await getImages(search)
        if (imagesGet.totalHits > 15) { showLoadMoreButton() };
        return markup(imagesGet.hits);
    } catch (error) {
        iziToast.show({
            message: 'Error happened',
            messageColor: "#fff",
            backgroundColor: "#EF4040",
            position: "topRight",
        });
        return;
        } finally {hideLoader()}
});