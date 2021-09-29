let autoRedirection = document.getElementById('auto-redirection');
var hourUnit = document.getElementById('hour-unit');

autoRedirection.addEventListener("change", function(e){
    chrome.storage.sync.set({'autoRedirection': e.target.checked });
});

hourUnit.addEventListener("change", function(e){
    chrome.storage.sync.set({'hourLimit': e.target.value });
});


function init() {   
    chrome.storage.sync.set({'autoRedirection': true,'hourLimit': 12 });
}

document.addEventListener('DOMContentLoaded', init, false);