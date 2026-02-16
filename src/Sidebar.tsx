import React from 'react';
import type { Athlete } from './data/mockData';
import styles from './Sidebar.module.css';

interface SidebarProps {
    athlete: Athlete;
}

const Sidebar: React.FC<SidebarProps> = ({ athlete }) => {
    return (
        <aside className={styles.sidebar}>
            <div className={`${styles.card} glass-panel`}>
                <h2>{athlete.name || "Athlete"}</h2>
                <div className={styles.levelTag}>{athlete.level?.toUpperCase()}</div>
                <p className={styles.goals}>{athlete.goals.join(', ')}</p>
            </div>

            <div className={`${styles.card} glass-panel`}>
                <h3>Personal Records</h3>
                <ul className={styles.prList}>
                    <li>
                        <span>Back Squat</span>
                        <strong>{athlete.prs.back_squat_1rm} kg</strong>
                    </li>
                    <li>
                        <span>Deadlift</span>
                        <strong>{athlete.prs.deadlift_1rm} kg</strong>
                    </li>
                    <li>
                        <span>Clean & Jerk</span>
                        <strong>{athlete.prs.clean_and_jerk_1rm} kg</strong>
                    </li>
                    <li>
                        <span>Snatch</span>
                        <strong>{athlete.prs.snatch_1rm} kg</strong>
                    </li>
                    <li>
                        <span>Pull-ups</span>
                        <strong>{athlete.prs.pullups_unbroken} unbroken</strong>
                    </li>
                    <li>
                        <span>Row 2k</span>
                        <strong>{athlete.prs.row_2k}</strong>
                    </li>
                </ul>
            </div>

            <div className={`${styles.card} glass-panel`}>
                <h3>Recent Summary</h3>
                <p className={styles.recent}>{athlete.recent_workouts_summary}</p>
            </div>

            {athlete.injuries_or_limits && athlete.injuries_or_limits.length > 0 && (
                <div className={`${styles.card} glass-panel warning`}>
                    <h3 style={{ color: 'var(--color-danger)' }}>Limits / Injuries</h3>
                    <ul>
                        {athlete.injuries_or_limits.map((injury, i) => (
                            <li key={i}>{injury}</li>
                        ))}
                    </ul>
                </div>
            )}
        </aside>
    );
};

export default Sidebar;
