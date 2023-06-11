const checkMediaType = (url) => {
    const imageExtensions = ['png', 'svg', 'jpg', 'jpeg']
    const videoExtensions = ['mov', 'mp4', 'avi']

    const fileExtension = url.split('.').pop().toLowerCase()

    if(imageExtensions.includes(fileExtension)){
        return "image"
    } else if(videoExtensions.includes(fileExtension)){
        return ["video", fileExtension]
    } else {
        return "unknown"
    }
}

export default checkMediaType