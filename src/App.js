import React, { Component } from 'react';
import Clarifai from 'clarifai';
import ImageSearchForm from './Components/ImageSearchForm/ImageSearchForm';
import FaceDetect from './Components/FaceDetect/FaceDetect';
import { cKey } from './keys/clarifaiKey';
import './App.css';

const app = new Clarifai.App({
  apiKey: cKey,
});

class App extends Component {
  state = {
    input: '',
    imageUrl: '',
    box: {},
  };

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  displayFaceBox = (box) => {
    this.setState({
      box,
    });
  };

  onInputChange = (e) => {
    this.setState({
      input: e.target.value,
    });
  };

  onSubmit = () => {
    const { input } = this.state;
    this.setState({
      imageUrl: input,
    });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, input)
      .then((res) => {
        //console.log(res);
        //console.log(res.outputs[0].data.regions[0].region_info.bounding_box);
        this.displayFaceBox(this.calculateFaceLocation(res));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { box, imageUrl } = this.state;
    return (
      <div className="App">
        <ImageSearchForm onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
        <FaceDetect box={box} imageUrl={imageUrl} />
      </div>
    );
  }
}
export default App;
