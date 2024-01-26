var colors = [
    "FFF59DFF","FFF59DFF",
    "FFECB3FF","FFECB3FF",
    "FFE0B2FF","FFE0B2FF",
    "B2DFDBFF","B2DFDBFF",
    "C8E6C9FF","C8E6C9FF",
    "B3E5FCFF","B3E5FCFF",
    "B2EBF2FF","B2EBF2FF",
    "F8BBD0FF","F8BBD0FF",
    "FFCDD2FF","FFCDD2FF",
    "FFF59DFF","FFF59DFF",
    "FFECB3FF","FFECB3FF",
    "FFE0B2FF","FFE0B2FF",
    "B2DFDBFF","B2DFDBFF",
    "C8E6C9FF","C8E6C9FF",
    "B3E5FCFF","B3E5FCFF",
    "B2EBF2FF","B2EBF2FF",
    "F8BBD0FF","F8BBD0FF",
    "FFCDD2FF","FFCDD2FF",
];

function createLevels(idName,route, maxLevels) {
    const levels = document.querySelector(idName + " .scrollable-row");

for (var i = 0; i < maxLevels; i++) {
    // Create a new div element
    var div = document.createElement("div");
    div.style.backgroundColor = "#" + colors[i];
    div.classList.add("item");
    div.textContent = (i + 1).toString();
    
    // Add an IIFE to create a closure for the click event listener
    (function (index) {
        div.addEventListener("click", async () => {
            window.location.href = route + "?level=" + (index+1).toString();
        });
    })(i);
    
    // Append the div to the container
    levels.appendChild(div);
}

    
}

createLevels("#verben-levels", "infinitiv",20);
createLevels("#wort-levels", "wort",28);
createLevels("#description-levels", "description",16);
