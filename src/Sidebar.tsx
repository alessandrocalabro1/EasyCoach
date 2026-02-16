import React from 'react';
import type { Athlete } from './data/mockData';
import styles from './Sidebar.module.css';

interface SidebarProps {
    athlete: Athlete;
}

const Sidebar: React.FC<SidebarProps> = ({ athlete }) => {
    // Helper to check if any PRs exist
    const hasPrs = Object.values(athlete.prs).some(val => val !== null);
    const hasGoals = athlete.goals.length > 0;
    const hasInjuries = athlete.injuries_or_limits && athlete.injuries_or_limits.length > 0;

    return (
        <aside className={styles.sidebar}>
            <div className={`${styles.card} glass-panel fade-in`}>
                <div className={styles.profileHeader}>
                    <div className={styles.avatarPlaceholder}>
                        {athlete.name?.charAt(0).toUpperCase() || "A"}
                    </div>
                    <div>
                        <h2 className={styles.name}>{athlete.name || "Athlete"}</h2>
                        <span className={styles.levelTag}>{athlete.level?.toUpperCase() || "BEGINNER"}</span>
                    </div>
                </div>

                {hasGoals && (
                    <div className={styles.goalsSection}>
                        <h4>Obiettivi</h4>
                        <p className={styles.goals}>{athlete.goals.join(', ')}</p>
                    </div>
                )}
            </div>

            {hasPrs && (
                <div className={`${styles.card} glass-panel fade-in`}>
                    <h3>Personal Records</h3>
                    <ul className={styles.prList}>
                        {athlete.prs.back_squat_1rm && (
                            <li><span>Back Squat</span><strong>{athlete.prs.back_squat_1rm} kg</strong></li>
                        )}
                        {athlete.prs.deadlift_1rm && (
                            <li><span>Deadlift</span><strong>{athlete.prs.deadlift_1rm} kg</strong></li>
                        )}
                        {athlete.prs.clean_and_jerk_1rm && (
                            <li><span>Clean & Jerk</span><strong>{athlete.prs.clean_and_jerk_1rm} kg</strong></li>
                        )}
                        {athlete.prs.snatch_1rm && (
                            <li><span>Snatch</span><strong>{athlete.prs.snatch_1rm} kg</strong></li>
                        )}
                        {athlete.prs.pullups_unbroken && (
                            <li><span>Pull-ups</span><strong>{athlete.prs.pullups_unbroken} unbroken</strong></li>
                        )}
                        {athlete.prs.row_2k && (
                            <li><span>Row 2k</span><strong>{athlete.prs.row_2k}</strong></li>
                        )}
                    </ul>
                </div>
            )}

            {athlete.recent_workouts_summary && (
                <div className={`${styles.card} glass-panel fade-in`}>
                    <h3>Recent Summary</h3>
                    <p className={styles.recent}>{athlete.recent_workouts_summary}</p>
                </div>
            )}

            {hasInjuries && (
                <div className={`${styles.card} glass-panel warning fade-in`}>
                    <h3 style={{ color: '#ef4444' }}>⚠️ Limits / Injuries</h3>
                    <ul>
                        {athlete.injuries_or_limits.map((injury, i) => (
                            <li key={i}>{injury}</li>
                        ))}
                    </ul>
                </div>
            )}

            {!hasPrs && !hasGoals && !hasInjuries && (
                <div className={`${styles.card} glass-panel fade-in`}>
                    <h3>Profilo Vuoto</h3>
                    <p className={styles.emptyText}>I tuoi dati appariranno qui man mano che ti alleni.</p>
                </div>
            )}
        </aside>
    );
};

export default Sidebar;
