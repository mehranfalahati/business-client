import { Component } from 'react'
import { Link } from 'react-router-dom'
import './signin.css'

export default class SignUp extends Component {

    state = {
        username: '',
        password: '',
        firstName: '',
        lastName: ''
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.signUp(this.state) 
        window.location.hash="/products"
    }

    render() {
        return (
            <div className='signin-container'>
                <form onSubmit={this.handleSubmit}>
                    <h1>Sign Up</h1>
                    <label>Username :</label>
                    <input name='username' value={this.state.username} onChange={this.handleChange}/>
                    <label>Password :</label>
                    <input name='password' type='password' value={this.state.password} onChange={this.handleChange}/>
                    <label>First Name :</label>
                    <input name='firstName' value={this.state.firstName} onChange={this.handleChange}/>
                    <label>Last Name :</label>
                    <input name='lastName'  value={this.state.lastName} onChange={this.handleChange}/>
                    <input type='submit' value='Sign Up'/> 
                    Already a member?<Link to='/' className='link'>Sign In</Link>
                </form>
            </div>
        )
    }
}

