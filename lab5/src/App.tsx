import React from 'react';
import NewBasket from './components/basket/NewBasket.tsx';
import NewCounter from "./components/counters/NewCounter.tsx";
import Form from "./components/forms/Form.tsx";
import Logging from "./components/forms/Logging.tsx";
import Ternary from "./components/others/Ternary.tsx";
import Update from "./components/others/Update.tsx";

const App: React.FC = () => {
    return (
        <div>
            <h1>Moja Aplikacja</h1>
            <NewBasket />
            <NewCounter />
            <Form />
            <Logging />
            <Ternary />
            <Update />
        </div>
    );
};

export default App;
