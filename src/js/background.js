// Set popup markup depending on the tab's url.
chrome.tabs.onUpdated.addListener((tabId, info, tab) => {
    tabUrlMatch(tab)
})
chrome.tabs.onActivated.addListener((changeInfo) => {
    chrome.tabs.get(changeInfo.tabId, (tab) => {
        tabUrlMatch(tab)
    })
})

/**
 * Check if tab's url match youtube video's page url and display 
 * appropriate popup page.
 * 
 * @param {Object} tab current tab
 */
const tabUrlMatch = (tab) => {
    let { url } = tab

    if (!(/https:\/\/www.youtube.com\/watch*/.test(url))) {
        chrome.browserAction.setPopup({
            popup: 'src/notSupported.html'
        })
    } else {
        chrome.browserAction.setPopup({
            popup: 'src/popup.html'
        })
        chrome.tabs.executeScript(null, {
            file: 'src/js/main.js'
        })
    }
}