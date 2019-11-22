import React from 'react';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailSignin: "",
      passwordSignin: ""
    }
  }

  onEmailChange = (event) => {
    this.setState({emailSignin: event.target.value});
  }

  onPasswordChange = (event) => {
    this.setState({passwordSignin: event.target.value});
  }

  onSubmit = (route) => {
    fetch("http://localhost:3001/signin", {
      method: 'post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.emailSignin,
        password: this.state.passwordSignin
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.id) {
        this.props.switchUser(data);
        this.props.onBtnSubmit(route);
      } else {
        console.log(data);
      }
    });
  }

  render() {
    return (
      <div className="pa4 black-80 shadow-3 center dib">
          <div className="measure">
              <fieldset id="sign_in" className="ba b--transparent ph0 mh0" >
              <legend className="f2 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                  <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
              </div>
              <div className="mv3">
                  <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                  <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
              </div>
              </fieldset>
              <div className="dib">
              <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" type="submit" value="Sign in" onClick={() => this.onSubmit("home")} />
              </div>
              <div className="lh-copy mt3">
              <a href="#0" className="f6 link dim black db" onClick={() => this.props.onBtnSubmit("register")} >Register</a>
              </div>
          </div>
      </div>
    );
  }
} 

export default SignIn;