import { useState, useEffect } from 'react';
import type { AppInputData } from './data/mockData'; // Type-only import
import Sidebar from './Sidebar';
import WodDisplay from './WodDisplay';
import Analysis from './Analysis';
import WodInputPanel from './WodInputPanel';
import { MOCK_DATA } from './data/mockData';
import { parseWodFromText } from './utils/wodParser';
import styles from './App.module.css';

function App() {
  const [data, setData] = useState<AppInputData>(MOCK_DATA);
  const [initialWodText, setInitialWodText] = useState("");

  // Load from localStorage on mount
  useEffect(() => {
    const savedWod = localStorage.getItem('wodcoach_last_wod');
    if (savedWod) {
      setInitialWodText(savedWod);
      // Optional: auto-parse? No, better let user choose to "Load" or just see it in the box.
      // But user requirement says: "Al reload, ripristinare e mostrare 'Riprendi ultimo WOD?' con bottone."
      // WodInputPanel handles showing the text.
      // If we want to restore the analysis view immediately, we should parse it.
      // Let's just set it in the input panel for now, or finding a way to restore full state.
      // For simplicity and robustness: We'll let WodInputPanel handle the text restoration.
    }
  }, []);

  const handleWodAnalysis = (text: string) => {
    const parsedWod = parseWodFromText(text);
    setData(prev => ({
      ...prev,
      wod: parsedWod
    }));
  };

  return (
    <div className={styles.appContainer}>
      <div className={styles.sidebarColumn}>
        <Sidebar athlete={data.athlete} />
      </div>
      <div className={styles.mainColumn}>
        <div className={styles.header}>
          <h1>Welcome back, {data.athlete.name}</h1>
          <p className={styles.date}>{new Date(data.date).toLocaleDateString('it-IT')}</p>
        </div>

        <WodInputPanel
          onAnalyze={handleWodAnalysis}
          initialText={initialWodText}
        />

        <WodDisplay wod={data.wod} />

        <div className={styles.analysisContainer}>
          <Analysis data={data} key={data.wod.title} />
          {/* Key forces remount/reset when WOD changes. 
              Though Analysis.tsx now has logic to reset on prop change, this is double safety. */}
        </div>
      </div>
    </div>
  );
}

export default App;
