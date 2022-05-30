import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import './product.css'


const SERVER_URL = 'https://giftshopserver.herokuapp.com/products.json'

class Products extends Component {
    constructor () {
        super();
        this.state = {
            products: []
        }
    }

    componentDidMount() {
        if (this.props.loggedInStatus === undefined) {
            // window.location.hash="/"
            // return ""
        }
        const fetchProducts = () => {
            axios(SERVER_URL).then((response) => {
                this.setState({products: response.data})
                setTimeout(fetchProducts, 5000);
            })
        }
        fetchProducts();
    }

    handleLogoutClick() {
        axios.delete("https://giftshopserver.herokuapp.com/logout.json").then(response => {
            this.props.handleLogout();
        }).catch(error => {
            console.log("logout error", error)
        })
    }

    render() {
        if (this.props.loggedInStatus === undefined) {
            return ""
        }
        return (
            <div className="div-container">
                <nav className="nav">
                    <button onClick={() => this.handleLogoutClick()}>Log Out</button>
                </nav>
                <h1>ALL PRODUCTS</h1>
                <ProductList products={this.state.products}/>
            </div>
        )
    }
}

const ProductList = (props) => {
    return (
        <div className="div-product">
            {props.products.map((p) => {
                return(
                    <div className="product" key={p.id}>
                        <img className="img" src={p.URL} alt="images"/>
                        <h2>{p.name}</h2>
                        <h3>${p.price}</h3>
                        <p>{p.details}</p>
                        <Link to='/buy'>buy</Link>
                    </div>
                )
            })}
        </div>
    )
}

export default Products;