var mySynth = window.speechSynthesis;
var myVoices;
var currentVoice;
myVoices = mySynth.getVoices();
for(var i = 0; i < myVoices.length; i++) {
    if (myVoices[i].name === "french" || myVoices[i].name === "Google français") {
        currentVoice = i;
        speakElement(document.getElementsByClassName('selected'));
        break;
    }
}
if (currentVoice === undefined) {
  alert("Recharge la page ou utilise un VRAI navigateur pour le TTS, bataw.");
}

function speakElement(myText) {
    var tts = arrangeTextElement(myText);
    var myUtterance = new SpeechSynthesisUtterance(tts);

    if (mySynth.speaking === true) {
        mySynth.cancel();
    }
    myUtterance.voice = myVoices[currentVoice];
    myUtterance.lang = myVoices[currentVoice].lang;
    myUtterance.rate = 0.8;
    mySynth.speak(myUtterance);
}

function arrangeTextElement(myText) {
  var tts = "";
  var textLength = myText.length;

  for(var i = 0; i < textLength; i++) {
    if (i !== 0) {
      tts += '.';
    }
    tts += ' ' + myText[i].innerText;
  }
  return (tts);
}