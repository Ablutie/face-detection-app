import React from 'react';
import './App.css';
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import SignIn from "./components/SignIn/SignIn"
import Clarifai from 'clarifai';

const app = new Clarifai.App({ apiKey: 'a7993bbfbe484c1387e972e6c3750bd4' });

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageURL: "https://samples.clarifai.com/face-det.jpg",
      box: {},
      route: "signin",
      isSignedIn: true
    }
  }

  onRouteChange = (route) => {
    this.setState({ route: route });
  }

  calculateFaceBox = (data) => {
    const coordinates = data.outputs[0].data.regions[0].region_info.bounding_box;
    console.log(coordinates);
    const image = document.getElementById("image-detect");
    const width = Number(image.width);
    const height = Number(image.height);
    return ({
      top_row: height * coordinates.top_row,
      left_col: width * coordinates.left_col,
      bottom_row: height - height * coordinates.bottom_row,
      right_col: width - width * coordinates.right_col
    });
  }

  setBoundingBox = (box) => {
    this.setState({ box: box });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onBtnSubmit = () => {
    this.setState({ imageURL: this.state.input });
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => {
        this.setBoundingBox(this.calculateFaceBox(response));
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <div className="App">
        <Navigation signedIn={this.state} />
        {this.state.route === 'home' ?
          <div>
            <Logo />
            <Rank />
            <ImageLinkForm onInputChange={this.onInputChange} onBtnSubmit={this.onBtnSubmit} />
            <FaceRecognition url={this.state.imageURL} box={this.state.box} />
          </div>
         : <SignIn onBtnSubmit={this.onRouteChange} /> 
          }
      </div>
    );
  }
}

export default App;
