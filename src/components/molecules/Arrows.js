import React, { Component } from 'react';
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
            <img src={up} alt="Aller au titre précédent" />Monter
            <img src={down} alt="Aller au titre suivant" />sous titre
            <img src={left} alt="Aller au titre suivant" />sur titre
            <img src={right} alt="Aller sous-titre suivant" />Descendre
      </div>
    );
  }
}

export default Arrows;
