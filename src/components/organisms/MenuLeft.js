import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';

class MenuLeft extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      voice: false
    }
  }

  componentDidMount(){
      this.setState({ loading: false })
  }

  generateTOC(){
    let finalHtml = ""
      let nb_link = 1
      for(let key in this.props.TOC){
	  let element = this.props.TOC[key]
	  finalHtml += "<"+element.type+"><a href=\"#section_"+nb_link+"\">"+element.text+"</a></"+element.type+">"
	  nb_link += 1
    }
    //console.log(finalHtml)
    return finalHtml
  }

  render() {
    return (
	    <div id="MenuLeft">
            { ReactHtmlParser(this.generateTOC()) }
      </div>
    );
  }
}

export default MenuLeft;
