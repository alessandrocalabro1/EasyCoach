import React from 'react';
import type { Wod } from './data/mockData';
import styles from './WodDisplay.module.css';

interface WodProps {
    wod: Wod;
}

const WodDisplay: React.FC<WodProps> = ({ wod }) => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{wod.title}</h1>
            <div className={styles.wodSections}>
                {wod.parts.map((part, index) => (
                    <div key={index} className={`${styles.part} glass-panel`}>
                        <h3>{part.type.toUpperCase()} {part.timecap_minutes ? `(${part.timecap_minutes} min)` : ''}</h3>
                        <p className={styles.description}>{part.description}</p>
                        {part.notes && <p className={styles.notes}>Note: {part.notes}</p>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WodDisplay;
