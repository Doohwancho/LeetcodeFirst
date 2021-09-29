let autoRedirectionDOM = document.getElementById('auto-redirection');
let hourUnitDOM = document.getElementById('hour-unit');
let lastAcceptedSubmissionDOM = document.getElementById('lastAcceptedSubmission');


autoRedirectionDOM.addEventListener("change", function(e){
    chrome.storage.sync.set({
        features: {
            autoRedirection: {
                enabled: e.target.checked,
                hourUnit: hourUnitDOM.value,
            }
        },
    });
});

hourUnitDOM.addEventListener("change", function(e){
    chrome.storage.sync.set({
        features: {
            autoRedirection: {
                enabled: autoRedirectionDOM.checked,
                hourUnit: e.target.value,
            }
        },
    });
});


function updatePopup() {
    chrome.storage.sync.get({
        features: {
            autoRedirection: {
                enabled: true,
                hourUnit: 12
            }
        },
        lastAcceptedDatetime: 'DOES NOT EXIST'}, function(option){

        autoRedirectionDOM.checked = option.features.autoRedirection.enabled;
        hourUnitDOM.value = option.features.autoRedirection.hourUnit;
        lastAcceptedSubmissionDOM.innerHTML = option.lastAcceptedDatetime;
    });
}

document.addEventListener('DOMContentLoaded', updatePopup, false);
