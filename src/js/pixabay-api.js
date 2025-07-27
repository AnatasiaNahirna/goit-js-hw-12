import axios from "axios";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

export default async function getImagesByQuery(query, page = 1) {
  try {
    const response = await axios.get("https://pixabay.com/api/", {
      params: {
        key: "51402348-a0c5f352e8dacc54a34bc803e",
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        per_page: 15,
        page: page,
      },
    });

    if (response.data.hits.length === 0) {
      iziToast.show({
        message: 'Sorry, there are no images matching your search query. Please try again!',
        messageColor: "#fff",
        backgroundColor: "#EF4040",
        position: "topRight",
      });
      return response.data.hits;
    }
    
    return response.data.hits;
  } catch (error) {
    throw error;
  }
}
