window.onload = () => {
    const $video = getMainVideo()

    chrome.runtime.onMessage.addListener((req, sender, res) => {
        if (req.changeTime && validateData(req.time)) {
            $video.currentTime = req.time
        }    
    })
}

function getMainVideo() {
    return document.getElementsByTagName('video')[0]
}

function validateData(data) {
    return true
}