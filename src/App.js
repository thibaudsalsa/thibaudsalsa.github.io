import React, { Component } from 'react';
import MenuLeft             from "./components/organisms/MenuLeft"
import Parameters             from "./components/organisms/Parameters"
import Document             from "./components/organisms/Document"

import './style/index.css';


class App extends Component {
  constructor(props){
    super(props);
    this.selectedVoice = undefined
    this.TOC = []
    this.state = {
      loading: true,
      displayedParameters: false,
    }
    this.showParameters = this.showParameters.bind(this)
  }

  componentDidMount(){
      window.addEventListener("keydown", function(e) {
            // space and arrow keys
        if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
    }, false);
    //Shortcut for menu
  }

    showParameters(){
      this.setState({displayedParameters: this.state.displayedParameters})
  }

    setSelectedVoice(e){
	    this.setState({displayedParameters: this.state.displayedParameters})
	    this.selectedVoice = e.target.value
  }

    initTOC(){
	    this.TOC = []
  }

    pushToTOC(title){
	    this.TOC.push(title)
  }

  render() {
      return (
	      <div className="App">
	      <MenuLeft showParameters={this.showParameters} TOC={this.TOC}/>
            <div className="Container">
            <Document selectedVoice={this.selectedVoice}  pushToTOC={this.pushToTOC.bind(this)}/>
	    <Parameters setSelectedVoice={this.setSelectedVoice.bind(this)}/>
        </div>
       }
      </div>
    );
  }
}

export default App;
