import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    const body = this.state;

    fetch('https://i2x-challenge.herokuapp.com/core/login/', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(body)
    })
    .then(data => data.json())
    .then(token => {
      sessionStorage.setItem('token', token.token);
      this.context.router.push('/list')
    })
    .catch(err => console.log(err)) // eventually do something with the errors
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label htmlFor="email">Email</label>
        <input type="text" onChange={this.handleChange.bind(this)} name="email"/>
        <label htmlFor="password">Password</label>
        <input type="password" onChange={this.handleChange.bind(this)} name="password" id="password"/>

        <button type="submit">Submit</button>
      </form>
    );
  }
}

Login.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default Login;
