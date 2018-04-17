window.onload = () => {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, tabs => {
        const $timeInput = document.getElementById('time')
        const $timeBtn = document.getElementById('update')
        const currentTabId = tabs[0].id

        $timeBtn.onclick = () => {
            let temp = $timeInput.value.split(':')
            let timeInSeconds = Number.parseInt(temp[0])*60 + Number.parseInt(temp[1])
            sendMessage(
                currentTabId, 
                { changeTime: true, time: timeInSeconds }
            )
        }
    })
}

function sendMessage(tabId, msg) {
    chrome.tabs.sendMessage(
        tabId,
        msg,
        response => {
            $timeInput.value = ''
            window.close()
        }
    )
}