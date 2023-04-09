import React, { Component } from 'react';
import './App.css';
import Navigation from './components/nav/Navigation';
import Logo from './components/logo/Logo';
import Rank from './components/rank/Rank';
import ImageLinkForm from './components/imageLinkForn/ImageLinkForm';
import FaceRecognition from './components/faceRecognition/FaceRecognition';
import Particle from './components/particles/Particle';
import SignIn from './components/signIn/SignIn';
import Register from './components/register/Register';


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
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        username: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = data => {
    this.setState({
      user: {
        id: data.id,
        username: data.username,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
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
      if (results) {
        fetch('http://localhost:8080/image', {
          method: 'get',
          headers: { 'Content-Type': 'application//json' },
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, { entries: count }))
          })
      }
      this.displayFaceBox(this.calculateFaceLocation(results));
    }
    catch (error) {
      console.log(error)
    }
  }

  onRouteChange = route => {
    if (route === 'signout') {
      this.setState({ isSignedIn: false })
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route })
  }

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
        <Particle />

        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {
          route === 'home' ?
            <div>
              <Logo />
              <Rank username={this.state.user.username} entries={this.state.user.entries} />
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
              <FaceRecognition box={box} imageUrl={imageUrl} />
            </div>
            : (
              route === 'signin' ?
                <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                :
                <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            )
        }

      </div>
    );
  }
}

export default App;
