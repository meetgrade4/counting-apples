x = 0;
y = 0;
screen_width = 0;
screen_height = 0;
apple = null;
speak_data = null;
to_number = null;
draw_apple = "";

var SpeechRecognition = window.webkitSpeechRecognition;
  
var recognition = new SpeechRecognition();

function preload(){
  apple = loadImage('https://i.postimg.cc/wMy71DYT/apple.png');
}

function start()
{
  document.getElementById("status").innerHTML = "System is listening please speak";  
  recognition.start();
} 
 
recognition.onresult = function(event) {

  console.log(event); 

  content = event.results[0][0].transcript;

  document.getElementById("status").innerHTML = "The speech has been recognized: " + content;
    
  to_number = Number(content);

  if(Number.isInteger(to_number)){
    draw_apple = "set";
    document.getElementById("status").innerHTML = "drawing apple";
  }

}

function setup() {
 screen_width = window.innerWidth;
 screen_height = window.innerHeight;
 canvas = createCanvas(screen_width, screen_height-150);
 canvas.position(0,150);
}

function draw() {
  if(draw_apple == "set")
  {
    for(var i = 0; i < to_number;i++){
      x = Math.floor(Math.random() * screen_width - 50);
      y = Math.floor(Math.random() * screen_height - 200);
      image(apple, x, y, 50, 50);
    }
    document.getElementById("status").innerHTML = to_number + " Apples drawn";
    draw_apple = "";
    speak_data = to_number + "apples drawn";
  }
}

function speak(){
    var synth = window.speechSynthesis;

    var utterThis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterThis);

    speak_data = "";
}
