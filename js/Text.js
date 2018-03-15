
var names = ["alligator", "ant", "bear", "bee", "bird", "camel", "cat", "cheetah", "chicken", "chimpanzee", "cow",
"crocodile", "deer", "dog",, "dolphin", "duck", "eagle", "elephant", "fish", "fly", "fox", "frog",
"giraffe", "goat", "goldfish", "hamster", "hippopotamus", "horse", "kangaroo", "kitten", "lion",
"lobster", "monkey", "octopus", "owl", "panda", "pig", "puppy", "rabbit", "rat", "scorpion", "seal",
"shark", "sheep", "snail", "snake", "spider", "squirrel", "tiger", "turtle", "wolf", "zebra"];
var word ="you typed: ";
var score=0;

function start(){
  //Remove the start button
  removeButton();
  callFunctions();
  setInterval(callFunctions, 1000);
  keyDetection();
}

//Function to call functions to create div and start the dropdown
function callFunctions()
{
  //If previous line is present delete that Line
  if(document.getElementById("Line") != undefined)
  {
    var l = document.getElementById("Line");
    l.parentNode.removeChild(l);
  }
  //Div creation
  var txt = createDiv();
  //Start animation
  anim(txt);
}

//Function to remove button once the user clicks it
function removeButton(){
  var btn = document.getElementById('btnStart');
  btn.parentNode.removeChild(btn);
}

//Function to create a new div
function createDiv()
{
  var  newDiv = document.createElement('div');
  newDiv.style.position = "absolute";
  newDiv.style.right = (Math.random() * (window.innerWidth-50))+'px';
  // var txt = document.createTextNode(Math.random().toString(36).substr(2, 1));
  var txtVal = names[Math.floor(Math.random() * (names.length -1)) + 1];
  var txt = document.createTextNode(txtVal);
  newDiv.appendChild(txt);
  newDiv.className = "text";
  newDiv.id = txtVal;

  currentDiv = document.getElementById('main');
  document.body.insertBefore(newDiv, currentDiv.nextSibling);

  return txtVal;
}

//Function to start animation
function anim(txt){
  var t = document.getElementById(txt);
  var pos = 0;
  var intervalId = setInterval(dropdown, 10);
  t.title = intervalId;
  function dropdown() {
    if (pos ==  document.documentElement.clientHeight-50 ) {
      if(document.getElementById(txt) != undefined)
        t.parentNode.removeChild(t);
      clearInterval(intervalId);
    }
    else {
      pos++;
      t.style.top = pos + 'px';

    }
  }

}

//Function to check if the key pressed is same as that of the letter
function keyDetection(txt)
{
  document.onkeydown = function (e) {

    if(e.key == " ")
    {
      if(document.getElementById(word.substr(11)) != undefined)
      {
        //If the key pressed is same as that of the text being displayed
        //draw a dotted line
        if(document.getElementById(word.substr(11)).firstChild.nodeValue == word.substr(11))
        {
          //clear the interval
          clearInterval(document.getElementById(word.substr(11)).firstChild.title);
          //Call the function to create  vertical line
          createLine(word.substr(11));
        }
      }
      word = "You typed: "
      document.getElementsByClassName("typed")[0].childNodes[0].nodeValue = word;

    }
    else {
      word += e.key;
      document.getElementsByClassName("typed")[0].childNodes[0].nodeValue = word;
    }

  }


}

//Function to create a dotted line, remove the letter and clear the interval
function createLine(val)
{
  var  newDiv = document.createElement('div');
  currentDiv = document.getElementById(val);
  // clearInterval(val.title);
  newDiv.id = "Line";
  newDiv.style.position = "absolute";
  newDiv.style.right = currentDiv.style.right;
  newDiv.style.borderLeft ="3px dotted green";
  newDiv.style.height = document.documentElement.clientHeight- parseInt(currentDiv.style.top, 10) + 'px';
  newDiv.style.top = currentDiv.style.top;
  document.body.insertBefore(newDiv, currentDiv.nextSibling);
  currentDiv.parentNode.removeChild(currentDiv);


  //Increase score by one
  document.getElementsByClassName("score")[0].childNodes[0].nodeValue = "Score:" + (++score);
  word = "You typed: "
  document.getElementsByClassName("typed")[0].childNodes[0].nodeValue = word;
}
