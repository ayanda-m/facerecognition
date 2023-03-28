import React, { Component } from 'react';
import './App.css';
import Navigation from './components/nav/Navigation';
import Logo from './components/logo/Logo';
import Rank from './components/rank/Rank';
import ImageLinkForm from './components/imageLinkForn/ImageLinkForm';
import Particle from './components/particles/Particle';

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: ''
    }
  }

  onInputChange = event => {
    console.log(event);
  }

  onButtonSubmit = () => {
    console.log('click');

  }

  render() {
    return (
      <div className="App">
        <Particle />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
        {/* <FaceRecognition/> */}
      </div>
    );
  }
}

export default App;
