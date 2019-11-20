import React from 'react';

const SignIn = ({onInputChange, onBtnSubmit}) => {
  return (
    <div className="pa4 black-80 shadow-3 center dib">
        <div className="measure">
            <fieldset id="sign_in" className="ba b--transparent ph0 mh0" >
            <legend className="f2 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
                <label className="db fw6 lh-copy f6" for="email-address">Email</label>
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
            </div>
            <div className="mv3">
                <label className="db fw6 lh-copy f6" for="password">Password</label>
                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
            </div>
            </fieldset>
            <div className="dib">
            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" type="submit" value="Sign in" onClick={() => onBtnSubmit("home")} />
            </div>
            <div className="lh-copy mt3">
            <a href="#0" className="f6 link dim black db" onClick={() => onBtnSubmit("register")} >Register</a>
            </div>
        </div>
    </div>
  );
}

export default SignIn;