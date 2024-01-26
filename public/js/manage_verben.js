var info = [];
var round = 0;
var infoLength = 0;

// Setting verben.ejs Textfields 
const translation = document.getElementById("translation");
const fieldIch = document.getElementById("fieldIch");
const fieldDu = document.getElementById("fieldDu");
const fieldEr = document.getElementById("fieldEr");
const fieldWir = document.getElementById("fieldWir");
const fieldIhr = document.getElementById("fieldIhr");
const fieldSie = document.getElementById("fieldSie");

 // Setting Field callBacks
translation.addEventListener("input", (e)=>checkInput(translation,0));
fieldIch.addEventListener("input", (e)=>checkInput(fieldIch,1));
fieldDu.addEventListener("input", (e)=>checkInput(fieldDu,2));
fieldEr.addEventListener("input", (e)=>checkInput(fieldEr,3));
fieldWir.addEventListener("input", (e)=>checkInput(fieldWir,4));
fieldIhr.addEventListener("input", (e)=>checkInput(fieldIhr,5));
fieldSie.addEventListener("input", (e)=>checkInput(fieldSie,6));

// Buttons
var back = document.getElementById("back");
var next = document.getElementById("next");
var mainScreen = document.getElementById("backMain");


// Bar
var progressBar = document.getElementById("fill");

// Counter
var counter = document.getElementById("counter");

// Infinitiv
var infinitiv = document.getElementById("infinitiv");





async function fetchInfo() {
  try {
    // Fetching Data and assigning
    const urlParams = new URLSearchParams(window.location.search);
    const level = urlParams.get('level');
    const response = await fetch("/api-present"+level);
    const users = await response.json();
    
    let meanwhile = [];
    for (let i in users){
        meanwhile.push({
          "Verb": users[i][1],
          "Translation": users[i][2]
        });
        
      }
      let start = 0;
      let final = 7;
    for(var a in meanwhile){
        info.push(meanwhile.slice(start, final));
        start += 7;
        final += 7;
    }
    infoLength = (info.length/7);
    assign();


    
  } catch (error) {
    console.error(error);
  }
}

function assign(){
    progressBar.style.width = (((round + 1) / (infoLength))*100).toString()+"%";
    counter.innerHTML = (round + 1).toString() + "/" + infoLength.toString();
    infinitiv.innerHTML = info[round][0].Verb.charAt(0).toUpperCase() + info[round][0].Verb.slice(1);
    document.getElementById("translation");

    translation.value = "";
    fieldIch.value = "";
    fieldDu.value = ""; 
    fieldEr.value = ""; 
    fieldWir.value = "";
    fieldIhr.value = ""; 
    fieldSie.value = ""; 

    translation.blur();
    fieldIch.blur();
    fieldDu.blur(); 
    fieldEr.blur();
    fieldWir.blur();
    fieldIhr.blur();
    fieldSie.blur();

    translation.style.backgroundColor = "#EEEEEE";
    fieldIch.style.backgroundColor = "#EEEEEE";
    fieldDu.style.backgroundColor = "#EEEEEE";
    fieldEr.style.backgroundColor = "#EEEEEE";
    fieldWir.style.backgroundColor = "#EEEEEE";
    fieldIhr.style.backgroundColor = "#EEEEEE";
    fieldSie.style.backgroundColor = "#EEEEEE";

    translation.disabled = false;
    fieldIch.disabled = false;
    fieldDu.disabled = false;
    fieldEr.disabled = false;
    fieldWir.disabled = false;
    fieldIhr.disabled = false;
    fieldSie.disabled = false;


}

function checkInput(field, value) {
    // Get the current value of the text field
    const inputValue = field.value;
  
    // Perform any checks or actions based on the input value
    if (inputValue == info[round][value].Verb && value!=0) {
        field.style.backgroundColor = '#8FBC8F'; 
    field.disabled = true;

    } else if(value == 0 && inputValue == info[round][value].Translation){
        field.style.backgroundColor = '#8FBC8F';  
    field.disabled = true;


    } 
    else if(inputValue.length > 0){
        field.style.backgroundColor = '#F08080';      
    }

  }
  
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