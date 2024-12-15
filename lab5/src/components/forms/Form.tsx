import React, { useState } from "react"

const Form: React.FC = () => {
    const [text, setText] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    }

    return (
        <div>
            <input
            type="text"
            value={text}
            onChange={handleInputChange}
            />
            <div>{text}</div>
        </div>
    );
};

export default Form;