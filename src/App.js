import './App.css';
import { Component } from 'react';

import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Products from './components/product/Products';

import { HashRouter as Router, Route, Routes } from 'react-router-dom';


class App extends Component {

  state = {
    user: {}, 
    error: "",
    signup: true
  }

  // this.handleLogout = this.handleLogout.bind(this)

  componentDidMount(){
    let token = localStorage.getItem('token')
    if(token){
      fetch('https://giftshopserver.herokuapp.com/profile.json', {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(result => {
        if(result && result.id){
          this.setState({
            user: result
          })
        }
      })
    }
  }

  signUp = user => {
    fetch('https://giftshopserver.herokuapp.com/users.json', {
      method: "POST",
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user:{
          username: user.username,
          password: user.password,
          first_name: user.firstName,
          last_name: user.lastName
        }
      })
    })
    .then(response => response.json())
    .then(user => this.setState({ user: user }) )
  }

  signIn = (user) => {
    fetch("https://giftshopserver.herokuapp.com/login.json", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user: {
                username: user.username,
                password: user.password
            }
        })
    })
    .then(response => response.json())
    .then(result => {
        if (result.token){
        localStorage.setItem('token', result.token)
        this.setState({
            user: result.user
            })
        }
        else {
            this.setState({
                error: result.error
            })
        }
    })
  }

  handleLogout = () => {
    localStorage.setItem('token', "")
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    })
  }


  render() {
    return (
      <div className="App">
        {this.state.user.username ? <h2>Welcome {this.state.user.first_name} <Products handleLogout={this.handleLogout}/></h2> : (
          <>
            <Router>
              <Routes>
                <Route path='/signup' element={<SignUp signUp={this.signUp} />}/>
                <Route path='/' element={<SignIn signIn={this.signIn} error={this.state.error} />}/>
                {/* <SignIn signIn={this.signIn} error={this.state.error} /> */}
                {/* <SignUp signUp={this.signUp} /> */}
              </Routes>
            </Router>
          </>)
        }
      </div>
    );
  } 
}

export default App;