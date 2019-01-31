// Extracts frequency information from audio and places 
// information into frequencyData[]

let read = function(){

    analyser.getByteFrequencyData(frequencyData);
    //console.log(frequencyData);

};

// Rendering function

let visualize = function(){

    let spacing = dimensions.width / frequencyData.length;
    let average = Math.floor(getAverageVolume());
    average+= 60;

    read();

    ctx.clearRect(0,0,dimensions.width,dimensions.height);

    for(let i = 0; i < frequencyData.length; i+=2){

        ctx.beginPath();
        ctx.moveTo(spacing * i, dimensions.height);
        ctx.lineTo(spacing*i, dimensions.height-frequencyData[i]*1.3);
        //ctx.lineTo(mouseX*i, dimensions.height-frequencyData[i]*1.3);
        ctx.strokeStyle = 'rgb('+average+','+average/1.5+','+average+')';
        ctx.stroke();
        ctx.closePath();

    }

    document.body.style.background = 'rgb('+average/1.5+','+0+','+average+')';

};

let tick = setInterval(visualize, 16);