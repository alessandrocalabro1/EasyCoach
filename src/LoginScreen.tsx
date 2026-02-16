import React, { useState } from 'react';
import styles from './LoginScreen.module.css';

interface LoginScreenProps {
    onLogin: (nickname: string) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
    const [nickname, setNickname] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (nickname.trim()) {
            onLogin(nickname.trim());
        }
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.card}>
                <h1 className={styles.title}>EasyCoach</h1>
                <p className={styles.subtitle}>Il tuo personal coach per il CrossFit</p>

                <form onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Inserisci il tuo soprannome"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            autoFocus
                            maxLength={20}
                        />
                    </div>

                    <button
                        type="submit"
                        className={styles.button}
                        disabled={!nickname.trim()}
                    >
                        Inizia Allenamento
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginScreen;
