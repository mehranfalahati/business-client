import './App.css';
import { Component } from 'react';

import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Products from './components/product/Products';


import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Buy from './components/buy/Buy';


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
      console.log(result)
        if (result.token){
        localStorage.setItem('token', result.token)
        this.setState({
            user: result.user,
            loggedInStatus: "LOGGED_IN"
            })
        }
        else {
            this.setState({
                error: result.error
            })
        }
        window.location.hash="/products"
    })
    
  }

  handleLogout = () => {
    localStorage.setItem('token', "")
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    })
    window.location.hash="/"
  }


  render() {
    return (
      <div className="App">
        <Router>
          <>
              <Routes>
                <Route path='/signup' element={<SignUp signUp={this.signUp} />}/>
                <Route path='/' element={<SignIn signIn={this.signIn} error={this.state.error} />}/>
                <Route path='/products' element={<Products handleLogout={this.handleLogout} loggedInStatus={this.state.loggedInStatus}/>}/>
                <Route path='/buy' element={<Buy/>} />
                {/* <SignIn signIn={this.signIn} error={this.state.error} /> */}
                {/* <SignUp signUp={this.signUp} /> */}
              </Routes>
          </>
        </Router>
      </div>
    );
  } 
}

export default App;