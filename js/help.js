// This script contains the code necessary to load the modal with the README


//Render `data` and load it into the modal
function loadHTML(data) {
  var readmeHTML = marked(data); //Render README from markdown to HTML
  var target = document.getElementById("readme");
  target.innerHTML = readmeHTML;
}

requestPage("README.md",loadHTML); //Read README.md and load it into the appropriate menu

//Menu items
var menuMain = document.getElementById("menu-main");
// The currently selected page
var selectedPage=menuMain;


//== EASY ANIMATION FUNCTIONS ==//
//Remove all animation classes from elem
function removeAnimClasses(elem) {
  var cn = elem.className;
  var ac = [" toLeft"," toRight"," fromLeft"," fromRight"]; //Animation classes
  for (var i=0;i<ac.length;i++) {
    while (cn.indexOf(ac[i])>=0) {
      cn = cn.replace(ac[i],"");
    }
  }
  elem.className=cn;
}

function animatePage(newPage) { //Move to `page`
  selectedPage.className += " toLeft";
  newPage.className += " fromRight";
  newPage.style.display = "block";
  setTimeout(function() {
    //Reset the scene
    removeAnimClasses(selectedPage);
    removeAnimClasses(newPage);
    selectedPage.style.display = "none";
    newPage.style.display = "block"; //In case of rapid button-pressing
    selectedPage = newPage;
  },600);
}

function animateReturn() { //Return to menu
  selectedPage.className += " toRight";
  menuMain.className += " fromLeft";
  menuMain.style.display = "block";
  setTimeout(function() {
    //Reset the scene
    removeAnimClasses(selectedPage);
    removeAnimClasses(menuMain);
    selectedPage.style.display = "none";
    menuMain.style.display = "block"; //In case of rapid button-pressing
    selectedPage = menuMain;
  },600);
}


// Bind opening the help pages
document.getElementById("aboutActivator").onclick=function(){ //Open about page
  animatePage(document.getElementById("menu-about"));
};
document.getElementById("controlsActivator").onclick=function(){ // Open controls page
  animatePage(document.getElementById("menu-controls"));
};
document.getElementById("readmeActivator").onclick=function(){ //Open README page
  animatePage(document.getElementById("menu-readme"));
};
// Bind all the back buttons to return to main menu page
backButtons=document.getElementsByClassName("backbutton")
for (var i=0;i<backButtons.length;i++) {
  backButtons[i].onclick=animateReturn;
}


// Load controls page for different devices
var controlspage = document.getElementById("controls");

var desktopControls = "\
<h1> Controls </h1> \
<p> You're on a desktop device, so the desktop controls are active. This page \
describes the desktop controls, which may be different on mobile touch devices.</p>\
\
<h3> Navigation </h3> \
<p> Click and drag to pan, and scroll to zoom. </p>\
\
<h3> Expanding nodes </h3> \
<p>To expand a node, just click on the node. The node might take a while to \
expand, depending on the speed of my server, Wikipedia's servers, and your \
internet connection. </p> \
\
<h3> Tracebacks </h3> \
<p> You can see the path you took to get to a node by mousing-over the node.</p> \
\
<h3> Opening pages </h3> \
<p> You can open the Wikipedia page for a node at any time, simply by \
double-clicking it. Double-clicking the node <em>Cat</em> will open the wikipedia \
page for <em>Cat</em>. In most browsers, the page will open in a new tab. Pop-up \
blockers might stop this. </p>\
"
var touchControls = "\
<h1> Controls </h1> \
<p> You're on a touch device, so the touch controls are active. This page \
describes the touch controls, controls may be different on desktop devices \
without touchscreens. </p> \
\
<h3> Navigation </h3> \
<p> You can use the classic and natural touch controls of pinch to zoom and \
drag to pan. </p>\
\
<h3> Expanding nodes </h3> \
<p>To expand a node, long-press on the node. You won't have to press for more than \
half a second, but the node might take slightly longer than that to expand.</p> \
\
<h3> Tracebacks </h3> \
<p> You can see the path you took to get to a node by lightly tapping the node. \
Tap anywhere else to stop highlighting the traceback. </p> \
\
<h3> Opening pages </h3> \
<p> You can open the Wikipedia page for a node at any time, simply by \
double-tapping on it. Double-tapping the node <em>Cat</em> will open the wikipedia \
page for <em>Cat</em>. The page will open in a new tab.</p> \
"


if (isTouchDevice) {
  controlspage.innerHTML=touchControls;
} else {
  controlspage.innerHTML=desktopControls;
}
