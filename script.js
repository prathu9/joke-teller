const button = document.getElementById("button");
const roboContainer = document.querySelector(".robo-container");


const changeBG = ()=>{
    let msg = new SpeechSynthesisUtterance();
    msg.text = "bob the builder karake dikhyenge";
    window.speechSynthesis.speak(msg);
    console.log(speechSynthesis);
    roboContainer.setAttribute("class", "robo-container start-joke");
    setTimeout(()=>{roboContainer.setAttribute("class", "robo-container stop-joke");},2000)
}

button.addEventListener("click", changeBG);