import FlickrImageDetails from "../interface/flickrimagedetails";
import config from "../config/config.json";

const baseUrl = "https://live.staticflickr.com";

const flickrModel = {
  getImageUrl500: function (imageDetails: FlickrImageDetails) {
    return `${baseUrl}/${imageDetails.server}/${imageDetails.id}_${imageDetails.secret}.jpg`;
  },
  searchGetFirstResult: async function (tags: string): Promise<FlickrImageDetails> {
    const url = `${config.flickr_url}?api_key=${config.flickr_key}&method=flickr.photos.search&tags=${tags}&per_page=1&format=json&nojsoncallback=1`;
    const response = await fetch(url);
    const result = await response.json();
    const firstImage = result.photos.photo[0];
    return firstImage;
  }
}

export default flickrModel;