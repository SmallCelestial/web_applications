import React, { useState } from 'react';

const Counter: React.FC = () => {
    const [count, setCount] = useState(0);

    const handleIncrement = () => {
        setCount(count + 1);
    }
    return (
        <div>
            <div>{count}</div>
            <button type="button" onClick={handleIncrement}>Dodaj</button>
        </div>
    );

}

export default Counter;
