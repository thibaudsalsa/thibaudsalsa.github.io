import React, { Component } from 'react'
import Mousetrap from 'mousetrap'
import {htmlTemplate} from '../../res/html.js'
import htmlparser from 'htmlparser2'
import ReactHtmlParser from 'react-html-parser';
import keyboard     from '../../keyboard.js';

class Document extends Component {
  constructor(props){
    super(props);
    this.typeSelected = ""
    this.initElements()
    this.voice = true
    this.maxElements = 0
    this.selectedText = ""
      this.synth = ""
    this.state = {
      loading: true,
      selected: 0,
      selectAlled: 1,
      typeSelected: "",
	htmlRender: "",
    }
  }

  getSelectedText(){
    return this.selectedText
  }

  getSelectedVoice(){
    let voices = []
    voices = this.synth.getVoices();
    let result = ""
    var selectedOption = this.props.selectedVoice;
    for(let i = 0; i < voices.length ; i++) {
      if(voices[i].name === selectedOption) {
        result = voices[i]
      }
    }
    return result;
  }

  selectAll(){
    let context = this
    let end = false
    let i = 1
      let priorityOrder = ["p", "li"]
    for(i; (context.state.selected+i < context.maxElements+1)&&(end===false);i++){
      for(let j=0;j<2;j++){
          for(let k=0;(k<context.elements[priorityOrder[j]].length)&&(end===false);k++){
              if((context.elements[priorityOrder[j]][k] === context.state.selected + i)&&(end===false)){
	    end = true
          }
        }
      }
      end = !end;
    }
    this.setState({selectAlled: context.state.selected+i-1})
      // console.log(context.state.selectAlled)
      // console.log(context.elements[priorityOrder[1]])
  }

  speak(){
var utterThis = new SpeechSynthesisUtterance(this.selectedText);
    utterThis.voice = this.getSelectedVoice()
    utterThis.pitch = 1
    utterThis.rate = 0.80
      this.synth.speak(utterThis)

    utterThis.onpause = function(event) {
     var char = event.utterance.text.charAt(event.charIndex);
     console.log('Speech paused at character ' + event.charIndex + ' of "' +
     event.utterance.text + '", which is "' + char + '".');
    }
  }

    updateSpeak(){
	if (this.synth.speaking === true){
	  this.synth.cancel()
	}
	if (this.voice === true)
	  this.voice = false
    }

  componentDidMount(){
    //Set all the key listenners
    let context = this
      this.synth = window.speechSynthesis

    Mousetrap.bind(keyboard[3], () => {
	let priorityOrder = ["h1", "h2", "h3", "h4", "h5", "p", "li"]
	let found = false
            for(let j=0;(j<5)&&(found===false);j++){
                for(let k=0;(k<context.elements[priorityOrder[j]].length)&&(found===false);k++){
                                    if(context.elements[priorityOrder[j]][k] === context.state.selected){
                        found = true
                    }
                }
            }
        if(found===false){
            this.setState({selected: context.state.selected - 1})
            this.setState({selectAlled: context.state.selected + 1})
	    context.updateSpeak()
	    context.speak()
        }
    })

      Mousetrap.bind(keyboard[4], () => {
      let priorityOrder = ["h1", "h2", "h3", "h4", "h5", "p", "li"]
        let found = false
            for(let j=0;(j<5)&&(found===false);j++){
                for(let k=0;(k<context.elements[priorityOrder[j]].length)&&(found===false);k++){
                    if(context.elements[priorityOrder[j]][k] === context.state.selected + 1 || context.state.selected >= context.maxElements - 1){
                        found = true
                    }
                }
            }
        if(found===false){
            this.setState({selected: context.state.selected + 1})
            this.setState({selectAlled: context.state.selected + 1})
	    context.updateSpeak()
	    context.speak()
        }
    })

      Mousetrap.bind(keyboard[5], () => {
	  if (this.voice === true)
	  {
	      context.speak()
	      this.voice = false
	  }
	  else
	  {
	      this.synth.cancel()
	      this.voice = true
	  }
    })

      Mousetrap.bind(keyboard[2], () => {
      let priorityOrder = ["h1", "h2", "h3", "h4", "h5", "p", "li"]
      let currentElement = -1
        let found = false
        for(let i=1; (context.state.selected + i < context.maxElements-1)&&(found===false);i++){
            for(let j=0;(j<5)&&(found===false);j++){
                for(let k=0;(k<context.elements[priorityOrder[j]].length)&&(found===false);k++){
                    if(context.elements[priorityOrder[j]][k] === context.state.selected + i){
                        currentElement = context.state.selected + i;
                        found = true
                    }
                }
            }
        }
        if(found===true){
            this.setState({selected: currentElement})
	    context.selectAll()
	    context.updateSpeak()
	    context.speak()
        }
    })

      Mousetrap.bind(keyboard[1], () => {
      let priorityOrder = ["h1", "h2", "h3", "h4", "h5", "p", "li"]
      let currentElement = -1
        let found = false
        for(let i=1; (context.state.selected - i >= 0)&&(found===false);i++){
            for(let j=0;(j<5)&&(found===false);j++){
                for(let k=0;(k<context.elements[priorityOrder[j]].length)&&(found===false);k++){
                    if(context.elements[priorityOrder[j]][k] === context.state.selected - i){
			currentElement = context.state.selected - i;
                        found = true
                    }
	        }
            }
        }
        if(found===true){
            this.setState({selected: currentElement})
	    context.selectAll()
	    context.updateSpeak()
	    context.speak()
        }
    })
  }

  initElements(){
    this.elements = {
      h1: [],
      h2: [],
      h3: [],
      h4: [],
      h5: [],
      p: [],
      li: [],
      ol: [],
      ul: [],
    }
  }

  render() {
    let finalHtml
    let i = 0
    this.initElements()
    let title = ["h1", "h2", "h3", "h4", "h5"]
    let nb_link = 0
    let cursorTag
    let context = this
    //Generate the page HTML, and store the cursor as well as the current selected text
    var parser = new htmlparser.Parser({
      onopentag: function(name, attribs){
          cursorTag = name
        if(name in context.elements && name !== "ul" && name !== "ol"){
          context.elements[name].push(i)
          finalHtml += "<"+name
            if((i >= context.state.selected && i <= context.state.selectAlled-1) && name !== "ul" && name !== "ol" ){
            finalHtml += " id='selected'"
            context.typeSelected = name
          }
            finalHtml += ">"
	    let found = false
	    for(let j=0;(j<5)&&(found===false);j++){
		for(let k=0;(k<context.elements[title[j]].length)&&(found===false);k++){
		    if(context.elements[title[j]][k] === i){
			nb_link += 1
			finalHtml += "<div id='section_"+nb_link+"'>"
			found = true
		    }
		}
	    }
	    if(found===false){
		finalHtml += "<div id='temp'>"
	    }
          i++
        }
      },
      ontext: function(text){
          if(["h1", "h2", "h3", "h4", "h5"].indexOf(cursorTag) > -1){
              context.props.pushToTOC({type: cursorTag, text: text})
        }
        if(i > 0){
          finalHtml += text
            if(context.state.selected === i-1 && text.match(/^\s+$/) === null){
		if (context.typeSelected[0] === 'h')
		    context.selectedText = keyboard[6]+context.typeSelected[1]+".                "+text
		else if ((context.typeSelected === "li"))
		    context.selectedText = "list.                "+text
		else if ((context.typeSelected === 'p'))
		    context.selectedText = "paragraphe.             "+text
		else
		    context.selectedText = text
          }
        }
      },
      onclosetag: function(name){
          finalHtml += "</div></"+name+">"
      }
  }, {decodeEntities: true});
  parser.write(htmlTemplate);
  parser.end();

  finalHtml = finalHtml.replace("undefined", "");

  this.maxElements = i

    return <div className="Document">{ ReactHtmlParser(finalHtml) }</div>;
  }
}

export default Document;
