//============================
//  Paint
//============================

var drawingCanvas
var colorPicker;
var slider;
var clearButton;
var saveButton;
var brushPicker;
var pagePicker;
var brushType;
var timAndEric;
var too;
var pageType;

var pumpkin;



function preload(){
    pumpkin = loadImage("images/pumpkin.png");
    imageMode(CENTER);
}


function setup() {

    //Make the canvas and then insert it into a div
    drawingCanvas = createCanvas(800, 600);
    drawingCanvas.parent('drawingContainer');
    background("white");

    //set up the color picker
    colorPicker = select("#ColorPicker");

    //set up the images
    timAndEric = select("#timAndEric");
    too = select("#too");

    //set up the paintbrush width slider
    slider = createSlider(1, 50, 10);
    slider.parent('brushSize');

    //set up the save button
    saveButton = select('.saveButton');
    saveButton.mouseClicked(saveFunction);

    clearButton = select('.clearButton');
    clearButton.mouseClicked(clearFunction);

    //set up the brush type
    brushPicker = createSelect();
    brushPicker.parent("brushType")
    brushPicker.option('paint brush');
    brushPicker.option('spray can');
    brushPicker.option('image');
    brushPicker.option('eraser');
    brushPicker.option('fill with color');
    brushPicker.changed(changeBrush);
    brushType = brushPicker.value();

    pagePicker = createSelect();
    pagePicker.parent("changePage")
    pagePicker.option('tim and eric');
    pagePicker.option('spaghett');
    pagePicker.changed(changeImage);
    pageType = pagePicker.value();

}

function draw() {

    if (mouseIsPressed) {
        if (brushType == "spray can"){
            sprayCan();
        } else if(brushType == "paint brush"){
            standardStroke();
        } else if(brushType == "image"){
            drawImage();
        } else if (brushType == "eraser"){
            eraserTool();
        }

    } else{
        //Cursor options: ARROW, CROSS, HAND, MOVE, TEXT, or WAIT, or path for image
        //if you use an image, the recommended size is 16x16 or 32x32 pixels
        cursor(CROSS);
    }

}

//--------------------------
// Brushes
//--------------------------

function standardStroke(){
    //set the size of the brush from the slider
    strokeWeight(slider.value());

    //use the hex code for the stroke color
    stroke("#"+colorPicker.value());
    //If you want to use the RGB values instead you can do so like this:
    //(useful if you want to add opacity with RGBA)
    // stroke(colorPicker.elt.color.rgb[0]*255,
    //         colorPicker.elt.color.rgb[1]*255,
    //         colorPicker.elt.color.rgb[2]*255
    //         );

    //pmouseX and pmouseY give you the previous mouse position
    line(pmouseX, pmouseY, mouseX, mouseY);

}

function sprayCan(){
    var sliderVal = slider.value();
    stroke( "#"+colorPicker.value() );

    //draw points in a grid that is the size of the brush slider
    //and draw those points 4 pixes from each other

    for (var x = 0; x < sliderVal; x+=4){
        for (var y = 0; y < sliderVal; y+=4){
            point(mouseX+x, mouseY+y);
        }
    }
}

function drawImage(){
    //draw the image where the mouse is and set the size to the brush size
    image(pumpkin,mouseX,mouseY, slider.value(), slider.value());
}

function paintBucketTool(){
    var sliderVal = slider.value();
    background( "#"+colorPicker.value() );
}

function eraserTool(){
    //set the size of the brush from the slider
    strokeWeight(slider.value());

    //use the hex code for the stroke color
    stroke("white");

    //pmouseX and pmouseY give you the previous mouse position
    line(pmouseX, pmouseY, mouseX, mouseY);

}

//--------------------------
// Event Listeners
//--------------------------

function changeBrush(){
    brushType = brushPicker.value();
}



function saveFunction() {
    save(drawingCanvas, "myDrawing.jpg");
}

function clearFunction() {
    clear();
    background("white");
}

function changeImage(){
  pageType = pagePicker.value();
  
  if (pageType == "tim and eric") {
    timAndEric.show();
    too.hide();
  } else if(pageType == "spaghett"){
    too.show();
    timAndEric.hide();
  }

}
