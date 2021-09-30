function getSubmissionTable() {
    return document.querySelector(".ant-table-tbody");
}

function getResultContainer() {
    return document.querySelector('div[class^="result-container"]');
}

function getSkeletonContainer() {
    return document.querySelector('div[class^="skeleton-container"]'); //submit시작하면 생김
}

function isSubmissionOnProgress(){
    return getResultContainer() !== null;
}

function getLastAcceptedDatetime() {
    var table = getSubmissionTable();
    for (let idx = 0; idx < table.childNodes.length; idx++) {
        var tr = table.childNodes[idx];
        if (tr.childNodes.length === 5 && tr.childNodes[1].textContent === "Accepted") {
            return tr.childNodes[0].textContent;
        }        
    }
    return null;
}

function getHourDiffFromNow(target) {
    var targetDate = new Date(target);
    var now = new Date();
    var diffInHours = Math.floor(Math.abs(now-targetDate) / 3.6e6);
    return diffInHours;
}


function updateSubmission(){
    chrome.storage.sync.get({
        autoRedirection:true,
        hourUnit:12,
        lastAcceptedDatetime: null,
    }, function(option) {
        var lastAcceptedDatetimeOfThisSubmission = getLastAcceptedDatetime();
        if (lastAcceptedDatetimeOfThisSubmission) {
            console.log("lastAcceptedDatetimeOfThisSubmission", lastAcceptedDatetimeOfThisSubmission)
            if (new Date(lastAcceptedDatetimeOfThisSubmission) > new Date(option.lastAcceptedDatetime)) {
                if (getHourDiffFromNow(lastAcceptedDatetimeOfThisSubmission) < option.hourUnit) {
                    chrome.runtime.sendMessage({message: "mission-clear"});
                    console.log("Mission Clear!");
                }
                chrome.storage.sync.set({
                    lastAcceptedDatetime: lastAcceptedDatetimeOfThisSubmission
                }, () => {
                    console.log("Update Latest record");
                });
            }
        }
    });
}

function isSubmissionCompleted() {
    var resultContainer = getResultContainer();
    if (resultContainer) {
        var skeletonContainer = getSkeletonContainer();
        if (!skeletonContainer && resultContainer.childNodes.length > 0) {
            return true;
        }
    }
    return false;
}

function waitForSubmissionCompleted(t, callback){
    if (t <= 0 || isSubmissionCompleted()) {
        callback();
        return
    }

    window.setTimeout(function() {
        waitForSubmissionCompleted(t - 1, callback); 
    }, 1000);
}



chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.message === 'check-submission-table') {
            if (isSubmissionOnProgress()) {
                waitForSubmissionCompleted(10, updateSubmission)
            }
            else {
                console.log("No Submission");
            }
        }
    }
);