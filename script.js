const button = document.getElementById("button");
const roboContainer = document.querySelector(".robo-container");
const speachSynthesisObj = speechSynthesis;
let speech = new SpeechSynthesisUtterance();

//Convert joke in text form into speech using web speech API
const tellJoke = (joke, jokeTime)=>{
    try{
        speech.text = joke;
        speachSynthesisObj.speak(speech);
        setTimeout(()=>{roboContainer.setAttribute("class", "robo-container start-joke");},1000);
        setTimeout(()=>{roboContainer.setAttribute("class", "robo-container stop-joke");
                        button.disabled = false;
                        },jokeTime)
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
        tellJoke(joke, Math.floor(joke.length/15)*1000);
    }catch(error){
        tellJoke("Sorry I have no jokes, try again",2000);
    }
    
}

// 
button.addEventListener("click", getJokes);