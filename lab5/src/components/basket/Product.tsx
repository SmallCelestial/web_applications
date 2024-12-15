import React from 'react';

interface ProductProps {
    name: string;
}

const Product: React.FC<ProductProps> = ({ name }) => {
    return (
        <div>
            <p>{name}</p>
        </div>
    );
};

export default Product;
