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

function isLeetcodeSubmissionURL(url) {
    var reg =  new RegExp(/https?:\/\/(www\.)?leetcode.com\/problems\/.*\/submissions\/?/)
    return url.match(reg);
}

function checkSubmissionTable(tabId) {
    setTimeout(() => {
        chrome.tabs.sendMessage(tabId, {message: 'check-submission-table'});
    }, 2000);
}

function isTimeOver(lastAcceptedDatetime, hourUnit){
    if (lastAcceptedDatetime) {
        var lastAcceptedDate = new Date(lastAcceptedDatetime);
        var now = new Date();
        var diff = now - lastAcceptedDate;
        var diffInHours = Math.floor(diff / 3.6e6);
        if (diffInHours < hourUnit) {
            return false; 
        }
    }
    return true;
}

chrome.tabs.onUpdated.addListener( 
    function(tabId, changeInfo, tab) {
        if (isAccessingYoutube(changeInfo, tab)) { 
            chrome.storage.sync.get({
                features: {
                    autoRedirection: {
                        enabled: true,
                        hourUnit: 12
                    }
                },
                lastAcceptedDatetime: null,
            },
            function(option) {
                if (option.features.autoRedirection.enabled && isTimeOver(option.lastAcceptedDatetime, option.features.autoRedirection.hourUnit)) { 
                    chrome.tabs.update(tabId, {url: chrome.extension.getURL('src/redirectToLeetcode.html')});
                }
            });
        } else if(changeInfo.status == 'complete' && isLeetcodeSubmissionURL(tab.url)){
            checkSubmissionTable(tabId);
        }
    }
);



chrome.runtime.onMessage.addListener( //얘가 popup.js에서는 안동작하는 이유는, 팝업이 켜지지 않으면 동작하지 않기 때문에
    function(request, sender, sendResponse) {
        if (request.message === 'mission-clear') {
            chrome.browserAction.setIcon({path:'src/assets/icons/blue_48.png'});
        }
    }
);