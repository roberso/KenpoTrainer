

function sayCreed() {
    mainHandler.sayCreed();
}

function licenseHandlerAccept() {
    mainHandler.licenseHandler.accept()
}

function techDetailsHandlerTogglePause() {
    mainHandler.techDetailsHandler.togglePause()
}

function freestyleDetailsHandlerTogglePause() {
    mainHandler.freestyleDetailsHandler.togglePause()
}

function basicsDetailsHandlerTogglePause() {
    mainHandler.basicsDetailsHandler.togglePause()
}

function formsHandlerBegin() {
    mainHandler.formsHandler.begin()
}

function formsDetailsHandlerTogglePause() {
    mainHandler.formsDetailsHandler.togglePause()
}

function openStormKenpo() {
    window.open('http://www.texasstormkenpo.com/', '_system');
}

function openKenpoNet() {
    window.open('http://www.kenponet.com/', '_system');
}

function openPCWood() {
    window.open('http://pcwood.com/kenpo/', '_system');
}

function openBrianKenpo() {
    window.open('http://www.bakerfamily4.net/kenpo/', '_system');
}

function openRFKenpo() {
    window.open('http://www.rfkenpo.com/', '_system');
}


document.querySelector('#creed').addEventListener('click', sayCreed);
document.querySelector('#licenseButton').addEventListener('click', licenseHandlerAccept);
document.querySelector('#tdPauseID').addEventListener('click', techDetailsHandlerTogglePause);
document.querySelector('#fsPauseID').addEventListener('click', freestyleDetailsHandlerTogglePause);
document.querySelector('#bsPauseID').addEventListener('click', basicsDetailsHandlerTogglePause);
document.querySelector('#formsHandlerBegin').addEventListener('click', formsHandlerBegin);
document.querySelector('#fmPauseID').addEventListener('click', formsDetailsHandlerTogglePause);
document.querySelector('#storm').addEventListener('click', openStormKenpo);
document.querySelector('#kenponet').addEventListener('click', openKenpoNet);
document.querySelector('#pcwood').addEventListener('click', openPCWood);
document.querySelector('#brian').addEventListener('click', openBrianKenpo);
document.querySelector('#rick').addEventListener('click', openRFKenpo);