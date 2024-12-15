import React, { useState } from "react";

const Logging: React.FC = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const isDisabled = !login || !password || !confirmPassword;

    const handleLogButtonClick = () => {
        if (password !== confirmPassword){
            alert("Hasła nie są zgodne");
        }
        else {
            alert("Zalogowano poprawnie");
        }
    }

    return (
        <div>
            <div>
                <label>
                    Nazwa użytkownika:
                    <input
                        type="text"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        placeholder="Wprowadź nazwe użytkownika"
                    />
                </label>
            </div>

            <div>
                <label>
                    Hasło:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Wprowadź hasło"
                    />
                </label>
            </div>

            <div>
                <label>
                    Powtórz Hasło:
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Powtórz hasło"
                    />
                </label>
            </div>

            <button id="logButton"
                    type="button"
                    onClick={handleLogButtonClick}
                    disabled={isDisabled}>
                Zaloguj
            </button>

        </div>
    );

};

export default Logging;