import React, { useState, useEffect } from 'react';
import styles from './WodInputPanel.module.css';

interface WodInputPanelProps {
    onAnalyze: (text: string) => void;
    initialText?: string;
}

const EXAMPLE_TEXT = `Example WOD:

WARM UP
3 Rounds:
200m Run
10 Good Mornings (Empty bar)
10 Push Ups

STRENGTH
Deadlift: 5-5-3-3-3 (Increasing weight)
Rest 2:00 between sets.

METCON
AMRAP 12 Minutes:
10 Handstand Push Ups
20 Box Jumps (60/50cm)
30 Double Unders
`;

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

        // Simulate loading for better UX
        setTimeout(() => {
            onAnalyze(text);
            if (saveLocal) {
                localStorage.setItem('wodcoach_last_wod', text);
            }
            setIsAnalyzing(false);
        }, 600);
    };

    const handleLoadExample = () => {
        setText(EXAMPLE_TEXT);
    };

    return (
        <div className={`${styles.panel} glass-panel`}>
            <h3 className={styles.title}>Inserisci WOD del Giorno</h3>

            <textarea
                className={styles.textarea}
                placeholder="Incolla qui il tuo workout... Es: Strength: ..., Metcon: ..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={6}
            />

            <div className={styles.controls}>
                <div className={styles.options}>
                    <label className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            checked={saveLocal}
                            onChange={(e) => setSaveLocal(e.target.checked)}
                        />
                        Salva come WOD di oggi
                    </label>
                </div>

                <div className={styles.actions}>
                    <button
                        className="btn-secondary"
                        onClick={handleLoadExample}
                        type="button"
                    >
                        Carica Esempio
                    </button>

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
        </div>
    );
};

export default WodInputPanel;
