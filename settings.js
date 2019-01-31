// Defining Slider functionality

let sliderTick;

let setSliderDuration = function(){

    slider.max = Math.floor(audio.duration);

};

// tieTImeToSlider() has become place for all code
// That needs to be continously run

let tieTimeToSlider = function(){

    if(audio.ended === true){

        nextSong();

    }

    setSliderDuration(); //function does not work unless continuously called
    slider.value = audio.currentTime;

};

sliderTick = setInterval(tieTimeToSlider, 15);

let slide = function(){

    audio.currentTime = slider.value;

};

slider.onmousedown = function(){

    //clearInterval(sliderTick);
    slide();

};

slider.onmouseover = function(){

    clearInterval(sliderTick);
    //console.log("Slider update cleared...")

};

slider.onmouseleave = function(){

    sliderTick = setInterval(tieTimeToSlider, 15);
    //console.log("Slider tick reactivated...");

}

// canvas functionality

canvas.onclick = function(){

    if(audio.paused === true){

        audio.play();

    }
    else{

        audio.pause();

    }

};

// Next and previous buttons functionality



nextButton.onclick = function(){

    nextSong();

};

previousButton.onclick = function(){

    previousSong();

};

let setSongTitle = function(){

    let tempTitle = audioFiles[songIndex];
    let title = tempTitle.substring(0, tempTitle.length-4);
    songTitle.innerHTML = title;

};

window.onload = function(){

    setSong(0);

};

window.onmousemove = function(e){

    mouseX = e.clientX;
    mouseY = e.clientY;

};
