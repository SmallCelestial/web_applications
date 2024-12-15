import React, { useState } from 'react';
import Button from "./Button.tsx";

const NewCounter: React.FC = () => {
    const [count, setCount] = useState(0);

    const handleIncrement = () => {
        setCount(count + 1);
    }

    return (
        <div>
            <div>Licznik: {count}</div>
            <Button handleIncrement={handleIncrement}/>
        </div>
    );

}

export default NewCounter;
