import React, { Component } from 'react';
import './App.css';
import Navigation from './components/nav/Navigation';
import Logo from './components/logo/Logo';
import Rank from './components/rank/Rank';
import ImageLinkForm from './components/imageLinkForn/ImageLinkForm';
import FaceRecognition from './components/faceRecognition/FaceRecognition';
import Particle from './components/particles/Particle';
import SignIn from './components/signIn/SignIn';


const returnClarifaiRequest = (imageUrl) => {
  const PAT = '1f781f6365154edea6efdd6011b65eaa';
  const USER_ID = 'amathiso';
  const APP_ID = 'my-first-application';
  const IMAGE_URL = imageUrl;

  const raw = JSON.stringify({
    "user_app_id": {
      "user_id": USER_ID,
      "app_id": APP_ID
    },
    "inputs": [
      {
        "data": {
          "image": {
            "url": IMAGE_URL
          }
        }
      }
    ]
  });

  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Key ' + PAT
    },
    body: raw
  };
  return requestOptions;
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {}
    }
  }

  calculateFaceLocation = data => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = box => {
    console.log(box)
    this.setState({ box: box });
  }

  onInputChange = event => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = async () => {
    this.setState({ imageUrl: this.state.input });
    try {
      const response = await fetch("https://api.clarifai.com/v2/models/face-detection/outputs", returnClarifaiRequest(this.state.input));
      let results = await response.json();
      this.displayFaceBox(this.calculateFaceLocation(results));
    }
    catch (error) {
      console.log(error)
    }
  }


  render() {
    return (
      <div className="App">
        <Particle />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
