import React, { Component } from 'react'
import jsonPage from '../../res/formatted.json'
import Mousetrap from 'mousetrap'
import {htmlTemplate} from '../../res/html.js'
import htmlparser from 'htmlparser2'
import ReactHtmlParser from 'react-html-parser';

class Document extends Component {
  constructor(props){
    super(props);
    this.typeSelected = ""
    this.initElements()
    this.maxElements = 0
    this.selectedText = ""
    this.synth = ""
    this.state = {
      loading: true,
      json: jsonPage,
      selected: 0,
      typeSelected: "",
      htmlRender: ""
    }
  }

  getSelectedText(){
    return this.selectedText
  }

  getSelectedVoice(){
    console.log("InGEtSelectedVoice", this.props.selectedVoice)
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

  componentDidMount(){
    //Set all the key listenners
    let context = this
    this.synth = window.speechSynthesis

    Mousetrap.bind('left', () => {
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
        }
    })

    Mousetrap.bind('right', () => {
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
        }
    })

    Mousetrap.bind('space', () => {
	context.speak()
	 this.setState({ voice: !this.state.voice})
    })

    Mousetrap.bind('down', () => {
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
        }
    })

      Mousetrap.bind('up', () => {
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
          if(context.state.selected === i && name !== "ul" && name !== "ol" ){
            finalHtml += " id='selected'"
            context.typeSelected = name
          }
            finalHtml += ">"
	    let found = false
	    nb_link += 1
//	    console.log(nb_link)
	    for(let j=0;(j<5)&&(found===false);j++){
		for(let k=0;(k<context.elements[title[j]].length)&&(found===false);k++){
		    if(context.elements[title[j]][k] === context.state.selected){
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
	    // (function() // Code in a function to create an isolate scope
	    //  {
	    // 	 var speed = 300;
	    // 	 var moving_frequency = 15; // Affects performance !
	    // 	 var links = document.querySelectorAll("nav a"); // Active links
	    // 	 var href;
	    // 	 for(var i=0; i<links.length; i++)
	    // 	 {
	    // 	     href = (links[i].attributes.href === undefined) ? null : links[i].attributes.href.nodeValue.toString();
	    // 	     if(href !== null && href.length > 1 && href.substr(0, 1) == '#')
	    // 	     {
	    // 		 links[i].onclick = function()
	    // 		 {
	    // 		     var element;
	    // 		     var href = this.attributes.href.nodeValue.toString();
	    // 		     if(element = document.getElementById(href.substr(1)))
	    // 		     {
	    // 			 var hop_count = speed/moving_frequency
	    // 			 var getScrollTopDocumentAtBegin = getScrollTopDocument();
	    // 			 var gap = (getScrollTopElement(element) - getScrollTopDocumentAtBegin) / hop_count;
	    // 			 for(var j = 1; j <= hop_count; j++)
	    // 			 {
	    // 			     (function()
	    // 			      {
	    // 				  var hop_top_position = gap*j;
	    // 				  setTimeout(function(){  window.scrollTo(0, hop_top_position + getScrollTopDocumentAtBegin); }, moving_frequency*j);
	    // 			      })();
	    // 			 }
	    // 		     }
	    // 		     return false;
	    // 		 };
	    // 	     }
	    // 	 }
	    // 	 var getScrollTopElement =  function (e)
	    // 	 {
	    // 	     var top = 0;
	    // 	     while (e.offsetParent != undefined && e.offsetParent != null)
	    // 	     {
	    // 		 top += e.offsetTop + (e.clientTop != null ? e.clientTop : 0);
	    // 		 e = e.offsetParent;
	    // 	     }
	    // 	     return top;
	    // 	 };
	    // 	 var getScrollTopDocument = function()
	    // 	 {
	    // 	     return document.documentElement.scrollTop + document.body.scrollTop;
	    // 	 };
	    //  })();

    return <div className="Document">{ ReactHtmlParser(finalHtml) }</div>;
  }
}

export default Document;
