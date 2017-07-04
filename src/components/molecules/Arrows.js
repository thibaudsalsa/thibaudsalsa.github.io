import React, { Component } from 'react';
import space from "../../../public/space.svg"
import up from "../../../public/up.svg"
import down from "../../../public/down.svg"
import left from "../../../public/left.svg"
import right from "../../../public/right.svg"


class Arrows extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
    }
  }

  componentDidMount(){
      this.setState({ loading: false })
  }

  render() {
    return (
	    <div className="Arrows">
	     <img src={space} alt="Lancer la lecture audio" />Lecture audio
            <img src={up} alt="Aller au titre précédent" />Titre précédent
            <img src={down} alt="Aller au titre suivant" />Titre suivant
            <img src={left} alt="Aller au titre suivant" />Monter dans le titre
            <img src={right} alt="Aller sous-titre suivant" />Descendre dans le titre
      </div>
    );
  }
}

export default Arrows;
