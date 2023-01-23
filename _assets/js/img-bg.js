import { config } from '../../config.js';
const apiToken = config.apiPhotoToken;
const getPhoto = async (city) => {
    const genaretedPhotos = 10
    const apiPhotoBaseURL = `https://api.pexels.com/v1/search?query=${city}&per_page=${genaretedPhotos}`
    const requestOptions = {method: 'GET', headers:{
        Authorization: apiToken
    }}
    const res = await fetch(apiPhotoBaseURL, requestOptions)
    const result = await res.json()
    const imagesReturned = result.photos.length-1
    const fileRandon = Math.floor(Math.random() * (imagesReturned))
    return result.photos[fileRandon].src.landscape
}

export {getPhoto};