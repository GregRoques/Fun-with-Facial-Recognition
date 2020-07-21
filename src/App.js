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

  calculateFaceLocations = (data) => {
    const clarifaiFaces = data.outputs[0].data.regions;

    //get image dimensions
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);

    let box = {}; // holding our faces

    clarifaiFaces.map((face, i) => {
      //map through faces
      const faceInfo = face.region_info.bounding_box;
      box[i] = {
        leftCol: faceInfo.left_col * width,
        topRow: faceInfo.top_row * height,
        rightCol: width - faceInfo.right_col * width,
        bottomRow: height - faceInfo.bottom_row * height,
      };
    });
    //console.log(box);
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
        this.calculateFaceLocations(res);
      })
      .catch((err) => {
        console.log(`ERROR: ${err}`);
      });
  };

  render() {
    const { box, imageUrl } = this.state;
    //console.log(box); // working!!!
    return (
      <div className="App">
        <ImageSearchForm onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
        <FaceDetect box={box} imageUrl={imageUrl} />
      </div>
    );
  }
}
export default App;
