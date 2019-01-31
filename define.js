let fs = require('fs'); // File system module

let dimensions = {

    width: window.innerWidth+116,
    //height: window.innerHeight-200,
    height:340,

};

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext("2d");

canvas.width = dimensions.width;
canvas.height = dimensions.height;

// Declaring variables for audio API
let audioCtx;
let audio;
let source;
let analyser;
let frequencyData;
//let audio1 = document.getElementById('audio1');

// More variables
let audioFiles = [];
let duration = audio1.duration;
let slider = document.getElementById('timeSlider');
let nextButton = document.getElementById('nextButton');
let previousButton = document.getElementById('previousButton');
let songTitle = document.getElementById('songTitle');
let songIndex = 0; 

let mouseX = 0;
let mouseY = 0;

// Initializes and defines all of the variables required for mozilla's
// analyserNode API

let define = function(){

    audioCtx = new AudioContext();
    analyser = audioCtx.createAnalyser();
    analyser.minDecibels = -100;
    analyser.maxDecibels = -30;
    analyser.smoothingTimeConstant = .86;
    audio = document.getElementById('audio1');
    source =  audioCtx.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
    //analyser.fftSize = 1024;
    analyser.fftSize = 4096;
    frequencyData = new Uint8Array(analyser.frequencyBinCount);

};

// Reads the list of files in the audio folder.
// List of files placed into audioFiles[]

let getAudioFiles = function(path){

    audioFilesIndex = 0;

    fs.readdir(path, function(err, files){

        if(err){
            alert(err);
            return;
        }
    
        for(let i = 0; i < files.length; i++){

            if(files[i].substr(files[i].length-3,files[i].length) === "mp3"){ // Filters out only mp3 files

                //console.log(files[i].substr(files[i].length-3,files[i].length));
                audioFiles[audioFilesIndex] = files[i];
                audioFilesIndex++;

            }   
            else{
                
                console.log("Non mp3: " + files[i]);

            }

        }
    
    });

};

// Sets the current song to audioFiles[index]

let setSong = function(index){

    if(index > audioFiles.length-1 || index < 0){

        console.log("Invalid song index entered");
        return;

    }
    else{

        audio.src = `./audio/${audioFiles[index]}`;
        audio.play();
        setSongTitle();

    }

};

let nextSong = function(){

    songIndex++;

    if(songIndex > audioFiles.length-1){

        songIndex = 0;

    }

    //console.log(songIndex);
    setSong(songIndex);

};

let previousSong = function(){

    songIndex--;

    if(songIndex < 0){

        songIndex = audioFiles.length-1;

    }

    //console.log(songIndex);
    setSong(songIndex);

};

//Finds the index in frequencyData that has the highest volume level

let getMaxValue = function(){ // Max: 436 of 512

    let maximum = 0;

    for(let i = 0; i < frequencyData.length; i++){

        if(frequencyData[i] > maximum){
            maximum = i;
        }

    }

    return maximum;

};

// returns the average volume level of the song

let getAverageVolume = function(){

    let temp = 0;

    for(let i = 0; i < frequencyData.length; i++){

        temp += frequencyData[i];

    }

    let average = temp/frequencyData.length;
    
    return average;

};


define();
getAudioFiles("./audio");
//getAudioFiles("D:/music/All music"); // Only works with directories local to the program