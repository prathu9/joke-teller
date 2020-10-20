const button = document.getElementById("button");
const roboContainer = document.querySelector(".robo-container");
let speech = new SpeechSynthesisUtterance();

const tellJoke = (joke, jokeTime)=>{
    try{
        speech.text = joke;
        window.speechSynthesis.speak(speech);
        if(joke){
            roboContainer.setAttribute("class", "robo-container start-joke");
        }
        setTimeout(()=>{roboContainer.setAttribute("class", "robo-container stop-joke");},jokeTime)
    }
    catch(error){
        console.error(`Error in tellJoke: ${error}`);
    }
}

//Get Jokes from Joke API
const getJokes = async ()=>{
    try{
        let joke = "";
        const jokeApiUrl = `https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist`;
        const response = await fetch(jokeApiUrl);
        const data = await response.json();
        if(data.setup){
            joke = `${data.setup} ${data.delivery}`;
        }else{
            joke = data.jokeTime;
        }
        tellJoke(joke, Math.floor(joke.length/15)*1000);
    }
    catch(error){
        tellJoke("Sorry I have no jokes, try again");
    }
    
}

// 
button.addEventListener("click", getJokes);