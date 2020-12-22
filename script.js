const button = document.getElementById("button");
const roboContainer = document.querySelector(".robo-container");
const speachSynthesisObj = speechSynthesis;
let speech = new SpeechSynthesisUtterance();

//Convert joke in text form into speech using web speech API
const tellJoke = (joke)=>{
    try{
        speech.text = joke;
        speachSynthesisObj.speak(speech);
        speech.onstart = ()=>{
            roboContainer.setAttribute("class", "robo-container start-joke");
        };
        speech.onend = ()=>{
            roboContainer.setAttribute("class", "robo-container stop-joke");
                         button.disabled = false;
        };
    }
    catch(error){
        console.error(`Error in tellJoke: ${error}`);
    }
}

//Get Jokes from Joke API
const getJokes = async ()=>{
    try{
        button.disabled = true;
        let joke = "";
        const jokeApiUrl = `https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist`;
        const response = await fetch(jokeApiUrl);
        const data = await response.json();
        if(data.setup){
            joke = `${data.setup} ${data.delivery}`;
        }else{
            joke = data.joke;
        }
        tellJoke(joke);
    }catch(error){
        tellJoke("Sorry I have no jokes, try again");
    }
    
}

// 
button.addEventListener("click", getJokes);