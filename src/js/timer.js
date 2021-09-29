let timeLeftDOM = document.getElementById('time-left');
let initialTime = 5;

function setTime(t){
    timeLeftDOM.innerHTML = t;
}

function countDown(t){
    if(t < 0){
        return;
    } 
    setTime(t);
    setTimeout(function() {
        countDown(t-1);
    }, 1000);
}



window.addEventListener("load", function(){
    countDown(initialTime);
});
