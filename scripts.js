//Expressions

//FUNCTION DECLARATIONS follow:

//send contents to email.php
function emailServer(){
  var fd3 = new FormData(document.forms['emailForm']);
  var xhr3 = new XMLHttpRequest();
  xhr3.open('POST', 'email.php', true);
  xhr3.send(fd3);
}
//clear screen contents
function clrscreen(){
  context.clearRect(0, 0, canvas.width, canvas.height);
  canvas.style.backgroundColor = '#000000';
  radius = 1;
  context.fillStyle = '#ffffff';
  context.strokeStyle = '#ffffff';
}
//grab contents to be emailed
function emailContent(){
  pallette.classList.add("portrait");
  var bgd = canvas.style.backgroundColor;
  var image = canvasToImage(bgd);
  pallette.innerHTML = " ";
  pallette.innerHTML += "<iframe name='formSending' style='display:none;'></iframe>"
  pallette.innerHTML += "<form id='emailForm' accept-charset='utf-8' name='formEmail' method='post' action='email.php' target='formSending'></form>";
  var emailForm = document.getElementById("emailForm");
  emailForm.innerHTML += "<input name='emailAddress' type='text' placeholder = 'To:'>";
  emailForm.innerHTML += "<input name='emailSubject' type='text' placeholder = 'Subject:'>";
  emailForm.innerHTML += "<br>";
  emailForm.innerHTML += "<img id='emailImage' name='imageEmail' src='" + image + "'/>";
  emailForm.innerHTML += "<input name='imageData' id='imageFile' type='hidden'/>";
  emailForm.innerHTML += "<br>";
  emailForm.innerHTML += "<textarea name='emailMessage' placeholder='Add a message:'></textarea>";
  emailForm.innerHTML += "<button id='emailSend' name='emailSend'>Send</button>";
  document.getElementById('imageFile').value = image;
  context.fillStyle = context.strokeStyle;
}
//Post to facebook
function facebookPost(){
  var bgd = canvas.style.backgroundColor;
  var image = canvasToImage(bgd);
  pallette.innerHTML += "<form method='post' accept-charset='utf-8' name='form1'><input name='hidden_data' id='hidden_data' type='hidden'/><input name='test' id='filename' type='hidden'/></form>";
  var sia = new Date().getTime();
  document.getElementById('filename').value = sia;
  document.getElementById('hidden_data').value = image;
  var fd = new FormData(document.forms['form1']);
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'upload_data.php', true);
  xhr.send(fd);
  FB.ui(
    {
      method: 'feed',
      name: 'Expressions',
      href: 'http://thewebassassin.com',
      picture: "http://thewebassassin.com/upload/" + sia + ".jpg"
    }
  );
  context.fillStyle = context.strokeStyle;
}
//detect mouse position and draw lines
function putPoint(e){
  if(dragging){
    context.lineWidth = radius*2;
    context.lineTo(e.offsetX, e.offsetY);
    context.stroke();
    context.beginPath();
    context.arc(e.offsetX, e.offsetY, radius, 0, Math.PI*2);
    context.fill();
    context.beginPath();
    context.moveTo(e.offsetX, e.offsetY);
  }
}
//ensures drawing occurs only after mouse click
function engage (e){
  dragging = true;
  putPoint(e);
}
//ensures drawing stops after mouse click released
function disengage (){
  dragging = false;
  context.beginPath();
}
//saves canvas drawing as png and also uses the current canvas background colour
function canvasToImage(backgroundColor)
{
	//cache height and width
	var w = canvas.width;
	var h = canvas.height;
	var data;
	if(backgroundColor)
	{
		//get the current ImageData for the canvas.
		data = context.getImageData(0, 0, w, h);
		//store the current globalCompositeOperation
		var compositeOperation = context.globalCompositeOperation;
		//set to draw behind current content
		context.globalCompositeOperation = "destination-over";
		//set background color
		context.fillStyle = backgroundColor;
		//draw background / rect on entire canvas
		context.fillRect(0,0,w,h);
	}
	//get the image data from the canvas
	var imageData = this.canvas.toDataURL("image/jpeg", 0.1);
	if(backgroundColor)
	{
		//clear the canvas
		context.clearRect (0,0,w,h);
		//restore it with original / cached ImageData
		context.putImageData(data, 0,0);
		//reset the globalCompositeOperation to what it was
		context.globalCompositeOperation = compositeOperation;
	}
	//return the Base64 encoded data url string
	return imageData;
}
//load colour colour pallette
function loadColourPallette(e){
  pallette.innerHTML = " ";
  var colourArray = ["#ffffff", "#fff8c6", "#ffff00", "#ffd700", "#b1bb17", "#008000", "#006400", "#82caff", "#0000cd", "#191970", "#ffa500", "#f88017", "#ff7f50", "#ff0000", "#8b0000", "#faafba", "#f660ab", "#ff1493", "#c45aec", "#8b008b", "#800080", "#e2a76f", "#806517", "#8b4513", "#999999", "#666666", "#333333", "#000000"];
  for(var i=0; i < colourArray.length; i++){
    pallette.innerHTML += "<button id = '" + colourArray[i] + "' class='colour' style='background-color:" + colourArray[i] + "'></button>"
  }
}
//Display pallette
function displayPallette(menuWidth){
  var width = 0;
  var id = setInterval(frame, 25);
  function frame() {
    if (width === menuWidth) {
			pallette.style.display = "block";
      clearPallette.style.display = "block";
      clearInterval(id);
		}
    else {
      width+=2;
			pallette.style.width = width + '%';
    }
  }
}
//Hide pallette
function hidePallette(){
  pallette.style.display = "none";
  clearPallette.style.display = "none";
}
//Begin event delegation, for touch and click
document.addEventListener("click", function(e){
  //delegators for stroke width
  if(e.target && e.target.id == "stroke1"){
    radius = 1;
  }
  if(e.target && e.target.id == "stroke2"){
    radius = 3;
  }
  if(e.target && e.target.id == "stroke3"){
    radius = 5;
  }
  if(e.target && e.target.id == "stroke4"){
    radius = 7;
  }
  if(e.target && e.target.id == "stroke5"){
    radius = 9;
  }
  if(e.target && e.target.id == "stroke6"){
    radius = 11;
  }
  //close pallette
  if(e.target && e.target.id == "clearPallette"){
    hidePallette();
  }
  // select stroke width from menu
  if(e.target && e.target.id == "stroke"){
    displayPallette(10);
    pallette.classList.remove("portrait");
    pallette.innerHTML = "<ul><li><img id='stroke1' src='images/stroke1.png'></li><li><img id='stroke2' src='images/stroke2.png'></li><li><img id='stroke3' src='images/stroke3.png'></li><li><img id='stroke4' src='images/stroke4.png'></li><li><img id='stroke5' src='images/stroke5.png'></li><li><img id='stroke6' src='images/stroke6.png'></li></ul>";
  }
  //select stroke colour from menu
  if(e.target && e.target.id == "strokeColour"){
    displayPallette(10);
    loadColourPallette();
    pallette.classList.remove("portrait");
    var colourPick = document.querySelectorAll("#pallette button");
    for(i=0; i < colourPick.length; i++){
      colourPick[i].classList.remove("background");
      colourPick[i].classList.add("colour");
    }
  }
  // select colour for stroke or background
  if(e.target && e.target.className == "colour"){
    context.fillStyle = e.target.id;
    context.strokeStyle = e.target.id;
  }
  //select background colour from menu
  if(e.target && e.target.id == "backColour"){
    displayPallette(10);
    loadColourPallette();
    pallette.classList.remove("portrait");
    var colourPick = document.querySelectorAll("#pallette button");
    for(i=0; i < colourPick.length; i++){
      colourPick[i].classList.remove("colour");
      colourPick[i].classList.add("background");
    }
  }
  // change background colours
  if(e.target && e.target.className == "background"){
    canvas.style.backgroundColor = e.target.id;
  }
  // clear screen of drawing
  if (e.target && e.target.id == "clearScreen"){
    clrscreen();
    hidePallette();
  }
  //send email details to server
  if(e.target && e.target.id == 'emailSend'){
      emailServer();
  }
  // select email from menu
  if (e.target && e.target.id =="email"){
    displayPallette(40);
    emailContent();
  }
  //select post to Facebook from menu
  if(e.target && e.target.id == "facebook"){
    hidePallette(e);
    facebookPost();
   }
});
// mouse click to begin drawing
document.addEventListener("mousedown", function(e){
  if(e.target && e.target.id == "canvas"){
    engage(e);
  }
});
// moving mouse to draw
document.addEventListener("mousemove", function(e){
  if(e.target && e.target.id == "canvas"){
    putPoint(e);
  }
});
// release mouse click to stop drawing
document.addEventListener("mouseup", function(e){
  if (e.target && e.target.id == "canvas"){
    disengage(e);
  }
});
// Set up touch events for mobile, etc
document.addEventListener("touchstart", function(e){
  if (e.target && e.target.id == "canvas"){
    putPoint(e);
    e.preventDefault();
    engage(e);
  }
}, false);
// Move finger to draw
document.addEventListener("touchmove", function(e){
  if (e.target && e.target.id == "canvas"){
    if (!e)
        var e = event;
    if (e.touches) {
        if (e.touches.length == 1) { // Only deal with one finger
            var touch = e.touches[0]; // Get the information for finger #1
            touchX=touch.pageX-touch.target.offsetLeft;
            touchY=touch.pageY-touch.target.offsetTop;
        }
    }
    context.lineWidth = radius*2;
    context.lineTo(touchX, touchY);
    context.stroke();
    context.beginPath();
    context.arc(touchX, touchY, radius, 0, Math.PI*2);
    context.fill();
    context.beginPath();
    context.moveTo(touchX, touchY);
    e.preventDefault();
  }
}, false);
//removing finger from screen - disable touch
document.addEventListener("touchend", function(){
  if (e.target && e.target.id == "canvas"){
    disengage(e);
  }
}, false);
// end of event listeners
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
canvas.width = window.innerWidth - (0.2 * window.innerWidth);
canvas.height = window.innerHeight - (0.1 * window.innerWidth);
canvas.style.backgroundColor = "#000000";
context.fillStyle = '#ffffff';
context.strokeStyle = '#ffffff';
var radius = 1;
var dragging = false;
