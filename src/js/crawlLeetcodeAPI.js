const LeetcodeAPIURL = 'https://leetcode.com/api/problems/algorithms/';

const totalLeetcodeDOM= document.getElementById('TotalNumberOfSolvedProblems');
const easyLeetcodeDOM= document.getElementById('EasyLeetcode');
const mediumLeetcodeDOM = document.getElementById('MediumLeetcode');
const hardLeetcodeDOM = document.getElementById('HardLeetcode');


function crawlAPI() {
    fetch(LeetcodeAPIURL).then((response) => response.json()).then(function(data){ 
            totalLeetcodeDOM.innerHTML = data.num_solved;
            easyLeetcodeDOM.innerHTML = data.ac_easy;
            mediumLeetcodeDOM.innerHTML = data.ac_medium;
            hardLeetcodeDOM.innerHTML = data.ac_hard;
        }
    );
}

document.addEventListener('DOMContentLoaded', crawlAPI, false);