import React from 'react';
import './App.css';
import Navigation from './components/nav/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imageLinkForn/ImageLinkForm';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Logo />
      <ImageLinkForm />
      {/* <FaceRecognition/> */}
    </div>
  );
}

export default App;
