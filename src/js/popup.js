window.onload = () => {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, tabs => {
        const $timeInput = document.getElementById('jump-to-input')
        const $timeBtn = document.getElementById('goto-btn')
        const $errorDiv = document.getElementById('error')
        const currentTabId = tabs[0].id

        $timeBtn.onclick = () => {
            let timeInSeconds = $timeInput.value
            sendMessage(
                currentTabId, 
                { changeTime: true, time: timeInSeconds },
                res => { 
                    if (res.finished) { 
                        $timeInput.value = ''
                        $errorDiv.textContent = ''
                        window.close()
                    } else if (res.err) {
                        $timeInput.value = ''
                        $errorDiv.textContent = res.err
                    }
                }
            )
        }
    })
}

/**
 * Helper method to pass messages between the popup and the content script.
 * 
 * @param {String} tabId current tab's id
 * @param {Object} msg message to send to content script
 */
function sendMessage(tabId, msg, cb) {
    chrome.tabs.sendMessage(
        tabId,
        msg,
        cb
    )
}