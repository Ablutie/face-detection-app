import React from 'react';
import './App.css';
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import SignIn from "./components/SignIn/SignIn"
import Register from "./components/Register/Register"
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
      isSignedIn: false,
      user: {
        name: "",
        id: "",
        email: "",
        photos: 0,
        joined: ""
      }
    }
  }

  switchUser = (user) => {
    this.setState({
      user: {
        name: user.name,
        id: user.id,
        email: user.email,
        photos: user.photos,
        joined: user.joined
      }
    });
  }

  onRouteChange = (route) => {
    this.setState({ route: route }, () => {
      if (route === "home") {
        this.setState({ isSignedIn: true });
      } else {
        this.setState({ isSignedIn: false });
      }
    });
  }

  calculateFaceBox = (data) => {
    const coordinates = data.outputs[0].data.regions[0].region_info.bounding_box;
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
        if (response) {
          fetch("http://localhost:3001/photo", {
            method: 'put',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(res => res.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {photos: count}));
          });
        }
        this.setBoundingBox(this.calculateFaceBox(response));
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <div className="App">
        <Navigation isSignedIn={this.state.isSignedIn} onClick={this.onRouteChange} />
        {this.state.route === 'home' ?
          <div>
            <Logo />
            <Rank name={this.state.user.name} rank={this.state.user.photos} />
            <ImageLinkForm onInputChange={this.onInputChange} onBtnSubmit={this.onBtnSubmit} />
            <FaceRecognition url={this.state.imageURL} box={this.state.box} />
          </div>
          : (this.state.route === "signin" ?
            <SignIn switchUser={this.switchUser} onBtnSubmit={this.onRouteChange} />
            : <Register switchUser={this.switchUser} onBtnSubmit={this.onRouteChange} />)
        }
      </div>
    );
  }
}

export default App;
