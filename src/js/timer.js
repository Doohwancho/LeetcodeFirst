import {redirectToLeetcode} from './redirect.js';

let timeLeftDOM = document.getElementById('time-left');
let initialTime = 3;

function setTime(t){
    timeLeftDOM.innerHTML = t;
}

function countDown(t, callback){
    if(t < 0){
        callback();
        return;
    } 
    setTime(t);
    setTimeout(function() {
        countDown(t-1, callback);
    }, 1000);
}

window.addEventListener("load", function(){
    countDown(initialTime, redirectToLeetcode);
});
