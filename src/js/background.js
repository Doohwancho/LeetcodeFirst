function isAccessingYoutube(changeInfo, tab) {
    // from other page to youtube
    if (changeInfo.status == 'loading' && changeInfo.url && isYoutubeURL(changeInfo.url)) {
        return true;
    }
    // refresh in youtube
    else if (changeInfo.status == 'loading' && isYoutubeURL(tab.url)) {
        return true;
    }
    return false;
}

function isYoutubeURL(url) {
    var reg =  new RegExp(/https?:\/\/(www\.)?youtube.com\/.*/)
    return url.match(reg);
}


chrome.tabs.onUpdated.addListener(
    function(tabId, changeInfo, tab) {
        if (isAccessingYoutube(changeInfo, tab)) { 
            chrome.storage.sync.get({
                autoRedirection: true,
                hourUnit: 12
            },
            function(option) {
                if (option.autoRedirection) { 
                    chrome.tabs.update(tabId, {url: chrome.extension.getURL('src/redirectToLeetcode.html')});
                }
            });
        }
    }
);