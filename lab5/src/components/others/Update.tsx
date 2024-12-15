import React, { useState } from "react";

const Update: React.FC = () => {
    const [product, setProduct] = useState({
        nazwa: "Pomidor",
        cena: 50
    });

    const updateProduct = () => {
        setProduct(prevState => ({ ...prevState, cena: 100 }));
    };

    return (
        <div>
            <div>Aktualnie {product.nazwa} kosztuje {product.cena}.</div>
            <button type="button" onClick={updateProduct}>Zmień cenę</button>

        </div>
    );
};

export default Update;