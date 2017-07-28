var mySynth = window.speechSynthesis;
var myVoices;
var currentVoice;
var voiceSelect = document.querySelector('french');
myVoices = mySynth.getVoices();
for(var i = 0; i < myVoices.length; i++) {
    if (myVoices[i].name === "french" || myVoices[i].name === "Google français") {
      currentVoice = i;
      console.log(myVoices[currentVoice]);
//        speakElement("test");
        break;
    }
}
if (currentVoice === undefined) {
  alert("Recharge la page ou utilise un VRAI navigateur pour le TTS, bataw.");
}

function speakElement(myText) {
    var myUtterance = new SpeechSynthesisUtterance(myText);

    if (mySynth.speaking === true) {
        mySynth.cancel();
    }
    myUtterance.voice = myVoices[currentVoice];
    myUtterance.lang = myVoices[currentVoice].lang;
    myUtterance.rate = 0.8;
    console.log(myUtterance);
    mySynth.speak(myUtterance);
}