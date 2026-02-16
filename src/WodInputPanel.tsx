import React, { useState, useEffect } from 'react';
import styles from './WodInputPanel.module.css';

interface WodInputPanelProps {
    onAnalyze: (text: string) => void;
    initialText?: string;
}

const WodInputPanel: React.FC<WodInputPanelProps> = ({ onAnalyze, initialText = "" }) => {
    const [text, setText] = useState(initialText);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [saveLocal, setSaveLocal] = useState(true);

    useEffect(() => {
        if (initialText) setText(initialText);
    }, [initialText]);

    const handleAnalyze = () => {
        if (!text.trim()) return;

        setIsAnalyzing(true);

        setTimeout(() => {
            onAnalyze(text);
            if (saveLocal) {
                localStorage.setItem('wodcoach_last_wod', text);
            }
            setIsAnalyzing(false);
        }, 800);
    };

    return (
        <div className={`${styles.panel} glass-panel fade-in`}>
            <div className={styles.header}>
                <h3 className={styles.title}>Inserisci WOD del Giorno</h3>
                <span className={styles.badge}>Coach AI</span>
            </div>

            <textarea
                className={styles.textarea}
                placeholder="Incolla qui il tuo workout del giorno..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={6}
            />

            <div className={styles.controls}>
                <label className={styles.checkboxLabel}>
                    <input
                        type="checkbox"
                        checked={saveLocal}
                        onChange={(e) => setSaveLocal(e.target.checked)}
                    />
                    <span>Ricorda ultimo WOD</span>
                </label>

                <button
                    className="btn-primary"
                    onClick={handleAnalyze}
                    disabled={!text.trim() || isAnalyzing}
                    type="button"
                >
                    {isAnalyzing ? "Analisi in corso..." : "Analizza WOD"}
                </button>
            </div>
        </div>
    );
};

export default WodInputPanel;
