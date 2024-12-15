import React, { useState } from "react";

const Password: React.FC = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const getMessage = (): string => {
        if (!password && !confirmPassword ){
            return 'Proszę wprowadzić hasło';
        }
        else if (password !== confirmPassword){
            return "Hasła nie są zgodne"
        }
        else {
            return '';
        }
    }

    return (
        <div>
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

            <div>{getMessage()}</div>

        </div>
    );

};

export default Password;