import React from "react";
import Product from "./Product.tsx";

const Basket: React.FC = () => {
    return (
        <div>
            <h1>Koszyk</h1>
            <Product name='jabłko' />
            <Product name='gruszka' />
            <Product name='pomarańcza' />
            <Product name='banan' />
            <Product name='malina' />
        </div>
    );
};

export default Basket;