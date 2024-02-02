
let body = document.querySelector("body");

let btn = document.createElement("button");
btn.setAttribute("id", "btn");
btn.addEventListener("click",listenToMe);

body.appendChild(btn);


let speechRecognition = new webkitSpeechRecognition();
speechRecognition.continuous = true;
speechRecognition.interimResults = true;
speechRecognition.lang = "en-us";
 
let transcript = "";
speechRecognition.onresult = function(event) {
    transcript = "";
    for(let i=0; i<event.results.length; ++i){
            transcript += event.results[i][0].transcript;

    }


};



function listenToMe(){

    if(!btn.hasAttribute("listening")){
        btn.setAttribute("listening",true);
        console.log("I am listening to you right now!!!!")
        speechRecognition.start();
    }
    else{
        btn.removeAttribute("listening");
        speechRecognition.stop();

        sendDataToServer(transcript).then(responseText => {
            removePopup(); 
            createPopup("Server responded: " + responseText);
        }).catch(error => {
            console.error("Error sending data to server: ", error);
        });

        console.log("I have stopped listening: " + transcript);
    }
}

function sendDataToServer(text) {
    return fetch('http://localhost:8080/query-gpt', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: text }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.text();
    });
}
