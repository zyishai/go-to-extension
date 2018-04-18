const $video = getMainVideo()

chrome.runtime.onMessage.addListener((req, sender, res) => {
    if (req.changeTime && validateData(req.time)) {
        $video.currentTime = req.time
        res({
            finished: true
        })
    } else {
        res({
            err: 'Invalid input!'
        })
    }
})

/**
 * Returns the page's main video element.
 */
function getMainVideo() {
    return document.getElementsByTagName('video')[0]
}

/**
 * Validate data to be in the expected format and not corrupted or invalid.
 * 
 * @param {String} data the user input
 */
function validateData(data) {
    let timeInt = Number.parseInt(data)
    return (!isNaN(timeInt) && timeInt >= 0)
}