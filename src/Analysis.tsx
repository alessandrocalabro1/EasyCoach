import React, { useState, useEffect, useRef } from 'react';
import type { AppInputData } from './data/mockData';
import { generateInitialAnalysis, generateUpdatedPlan } from './utils/coachLogic';
import styles from './Analysis.module.css';

interface AnalysisProps {
    data: AppInputData;
}

type Stage = 'initial' | 'updated' | 'logging' | 'completed';

const Analysis: React.FC<AnalysisProps> = ({ data }) => {
    const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
    const [input, setInput] = useState('');
    const [stage, setStage] = useState<Stage>('initial');
    const chatEndRef = useRef<HTMLDivElement>(null);

    // On mount, generate the initial analysis
    useEffect(() => {
        const initialPlan = generateInitialAnalysis(data);
        setMessages([{ role: 'assistant', content: initialPlan }]);
        setStage('initial');
        setInput('');
    }, [data.wod]); // React specifically to WOD changes

    // Auto-scroll logic
    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const currentInput = input;
        // Add user message
        setMessages(prev => [...prev, { role: 'user', content: currentInput }]);
        setInput('');

        // Simulate assistant thinking/response
        setTimeout(() => {
            let response = "";

            if (stage === 'initial') {
                response = generateUpdatedPlan(data, currentInput);
                setStage('updated');
            } else if (stage === 'logging') {
                response = "Dati salvati con successo! Recupera bene, ci vediamo domani. 💪";
                console.log("Simulating saveWodResult:", currentInput);
                setStage('completed');
            } else {
                response = "Sei già un passo avanti. Riposa ora.";
            }

            setMessages(prev => [...prev, { role: 'assistant', content: response }]);
        }, 800);
    };

    const handleFinishWorkout = () => {
        setStage('logging');
        setMessages(prev => [...prev, {
            role: 'assistant',
            content: "Allenamento finito? Grande! 🏋️‍♂️\nDimmi: \n- Tempo/Reps\n- Carichi usati\n- RPE (1-10)\n- Note brevi"
        }]);
    };

    return (
        <div className={`${styles.container} glass-panel`}>
            <div className={styles.headerRow}>
                <h2 className={styles.header}>WOD Coach AI Analysis</h2>
                {stage === 'updated' && (
                    <button onClick={handleFinishWorkout} className={styles.finishBtn}>
                        Concludi Allenamento
                    </button>
                )}
            </div>

            <div className={styles.chatWindow}>
                {messages.map((msg, idx) => (
                    <div key={idx} className={`${styles.message} ${msg.role === 'user' ? styles.user : styles.assistant}`}>
                        <div className={styles.avatar}>{msg.role === 'user' ? 'YOU' : 'AI'}</div>
                        <div className={styles.content}>
                            {msg.content.split('\n').map((line, i) => (
                                <p key={i}>{line}</p>
                            ))}
                        </div>
                    </div>
                ))}
                <div ref={chatEndRef} />
            </div>

            <form onSubmit={handleSubmit} className={styles.inputArea}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={
                        stage === 'initial' ? "Rispondi per adattare il piano..." :
                            stage === 'logging' ? "Inserisci i risultati..." :
                                "Scrivi qui..."
                    }
                    className={styles.input}
                    disabled={stage === 'completed'}
                />
                <button type="submit" className="btn-primary" disabled={stage === 'completed'}>
                    {stage === 'logging' ? "Log Result" : "Send"}
                </button>
            </form>
        </div>
    );
};

export default Analysis;
