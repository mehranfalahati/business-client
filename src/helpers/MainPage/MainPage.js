import React, { useState } from "react";

const MainPage = (props) => {
    const SERVER_URL = 'http://loaclhost:3000/products.json'
    console.log(SERVER_URL)

    const [product, setProduct] = useState('')

    return (
        <div>
            <h1>ALL PRODUCTS</h1>
            <h2>{ product }</h2>
        </div>
    )
}

export default MainPage;