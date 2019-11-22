import React from 'react';
// ({onInputChange, onBtnSubmit})

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          email: "",
          password: "",
          name: ""
        }
      }
    
      onEmailChange = (event) => {
        this.setState({email: event.target.value});
      }
    
      onPasswordChange = (event) => {
        this.setState({password: event.target.value});
      }

      onNameChange = (event) => {
          this.setState({name: event.target.value});
      }
    
      onSubmit = (route) => {
        fetch("http://localhost:3001/register", {
          method: 'post',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            email: this.state.email,
            password: this.state.password,
            name: this.state.name
          })
        })
        .then(res => res.json())
        .then(data => {
          if (data) {
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
                    <legend className="f2 fw6 ph0 mh0">Register</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="username">Username</label>
                        <input onChange={this.onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="username"  id="username" />
                    </div>
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
                    <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" type="submit" value="Register" onClick={() => this.onSubmit("home")} />
                    </div>
                    <div className="lh-copy mt3">
                    <a href="#0" className="f6 link dim black db" onClick={() => this.props.onBtnSubmit("signin") } >Sign In</a>
                    </div>
                </div>
            </div>
          );
    }
  
}

export default Register;