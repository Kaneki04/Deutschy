var data = [];
var round = 0;
var infoLength = 0;

const deutsch = document.getElementById("deutsch");
const english = document.getElementById("englisch");

// Bar
var progressBar = document.getElementById("fill");

// Bar
var title = document.getElementById("tense");

// Counter
var counter = document.getElementById("counter");

// Buttons
var back = document.getElementById("back");
var next = document.getElementById("next");
var mainScreen = document.getElementById("backMain");
const urlParams = new URLSearchParams(window.location.search);
const level = urlParams.get('level');
const tense = urlParams.get('tense');


async function fetchInfo() {
    try {
      // Fetching Data and assigning
      
      
      const response = await fetch(`/api-${tense}${level}`);
      const users = await response.json();
      
      for (let i in users){
          data.push({
            "Deutsch": users[i][0],
            "Englisch": users[i][1]
          });
      infoLength = (data.length);
      assign();

  
        }
    } catch (error) {
      console.error(error);
    }
  }
  function assign(){
    progressBar.style.width = (((round + 1) / (infoLength))*100).toString()+"%";
    counter.innerHTML = (round + 1).toString() + "/" + infoLength.toString();
    deutsch.innerHTML = data[round].Deutsch.charAt(0).toUpperCase() + data[round].Deutsch.slice(1);
    englisch.innerHTML = data[round].Englisch.charAt(0).toUpperCase() + data[round].Englisch.slice(1);
    title.innerHTML = "Memorize " + tense.charAt(0).toUpperCase() + tense.slice(1) +"!";
   
    document.querySelector(".thecard").classList.remove("flipped");

  }
  document.querySelector(".thecard").addEventListener("click", function() {
    this.classList.toggle("flipped");
  });

  back.addEventListener("click", function() {
    if (round > 0) {
        round--;
        assign();
      } else if (round == 0) {
        round = (infoLength - 1);
        assign();
      }
  });

  mainScreen.addEventListener("click", function() {
    window.location.href = "/";
    
  });

  next.addEventListener("click", function() {
    if (round < (infoLength - 1)) {
        round++;
        assign();

      } else if (round == (infoLength - 1)) {
        round = 0;
        assign();

      }
  });
fetchInfo();