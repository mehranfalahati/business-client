import axios from "axios";
import React, { Component } from "react";


const SERVER_URL = 'http://localhost:3000/products.json'

class Products extends Component {
    constructor () {
        super();
        this.state = {
            products: []
        }
    }

    componentDidMount() {
        const fetchProducts = () => {
            axios(SERVER_URL).then((response) => {
                this.setState({products: response.data})
                setTimeout(fetchProducts, 5000);
            })
        }
        fetchProducts();
    }

    handleLogoutClick() {
        axios.delete("http://localhost:3000/logout.json").then(response => {
            this.props.handleLogout();
        }).catch(error => {
            console.log("logout error", error)
        })
    }

    render() {
        return (
            <div>
                <nav>
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
        <div>
            {props.products.map((p) => {
                return(
                    <div key={p.id}>
                        <p>Name: {p.name}</p>
                        <p>Details: {p.details}</p>
                        <p>Price: ${p.price}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Products;