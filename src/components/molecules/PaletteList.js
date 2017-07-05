import React, { Component } from 'react'

class PaletteList extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      active: 1,
      selected: 1,
    }
    this.toggleActive = this.toggleActive.bind(this)
  }

  componentDidMount(){
      this.setState({ loading: false})
  }

  componentDidUpdate(){
    console.log(this.state.active)
    switch(this.state.active) {
    default:
        document.getElementById("MenuTop").style.background = '#1fa8e2'
        document.getElementById("MenuLeft").style.background = '#D3D3D3'
        document.getElementById("MenuRight").style.background = '#D3D3D3'
        break;
      case 2:
        document.getElementById("MenuTop").style.background = '#a30000'
        document.getElementById("MenuRight").style.background = '#C9C9C9'
        document.getElementById("MenuLeft").style.background = '#C9C9C9'

        break;
      case 3:
        document.getElementById("MenuTop").style.background = '#08a045'
        document.getElementById("MenuRight").style.background = '#B5D99C'
        document.getElementById("MenuLeft").style.background = '#B5D99C'

        break;
    }
  }
  toggleActive(newActive){
    this.setState({active: newActive})

  }

  render() {
    return (
      <div className="PaletteTop">
        Choisir sa palette
        <div className="PaletteList">
          {this.state.active === 1
            ? <div className="Palette Active" onClick={() => this.toggleActive(1)}>
              <div style={{width: "4em", height: "4em", background: '#1fa8e2'}}></div>
              <div style={{width: "4em", height: "4em", background: '#d3d3d3'}}></div>
            </div>
            : <div className="Palette" onClick={() => this.toggleActive(1)}>
              <div style={{width: "4em", height: "4em", background: '#1fa8e2'}}></div>
              <div style={{width: "4em", height: "4em", background: '#d3d3d3'}}></div>
            </div>
          }
          {this.state.active === 2
            ? <div className="Palette Active" onClick={() => this.toggleActive(2)}>
              <div style={{width: "4em", height: "4em", background: '#a30000'}}></div>
           <div style={{width: "4em", height: "4em", background: '#c9c9c9'}}></div>
            </div>
            : <div className="Palette" onClick={() => this.toggleActive(2)}>
              <div style={{width: "4em", height: "4em", background: '#a30000'}}></div>
              <div style={{width: "4em", height: "4em", background: '#c9c9c9'}}></div>
            </div>
          }
          {this.state.active === 3
            ? <div className="Palette Active" onClick={() => this.toggleActive(3)}>
            <div style={{width: "4em", height: "4em", background: '#08a045'}}></div>
              <div style={{width: "4em", height: "4em", background: '#b5d99c'}}></div>
            </div>
            : <div className="Palette" onClick={() => this.toggleActive(3)}>
              <div style={{width: "4em", height: "4em", background: '#08a045'}}></div>
              <div style={{width: "4em", height: "4em", background: '#b5d99c'}}></div>
            </div>
          }
        </div>
      </div>

    );
  }
}

export default PaletteList;
