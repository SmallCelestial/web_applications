import React from 'react';

interface ButtonProps {
    handleIncrement: () => void;
}

const Button: React.FC<ButtonProps> = ({handleIncrement}) => {
    return (
        <button type="button" onClick={handleIncrement}>
            Dodaj
        </button>
    );
};


export default Button;