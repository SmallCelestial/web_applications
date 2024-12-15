import React from 'react';
import Product from './Product';

const NewBasket: React.FC = () => {
    const products = ['jabłko', 'gruszka', 'pomarańcza', 'banan', 'malina'];

    return (
        <div>
            <h1>Koszyk</h1>
            {products.map((product, index) => (
                <Product key={index} name={product} />
            ))}
        </div>
    );
};

export default NewBasket;
