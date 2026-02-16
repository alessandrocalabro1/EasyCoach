import { useState, useEffect } from 'react';
import type { AppInputData } from './data/mockData';
import Sidebar from './Sidebar';
import WodDisplay from './WodDisplay';
import Analysis from './Analysis';
import WodInputPanel from './WodInputPanel';
import LoginScreen from './LoginScreen';
import { INITIAL_EMPTY_DATA } from './data/mockData';
import { parseWodFromText } from './utils/wodParser';
import styles from './App.module.css';

function App() {
  const [nickname, setNickname] = useState<string | null>(null);
  const [data, setData] = useState<AppInputData>(INITIAL_EMPTY_DATA);
  const [initialWodText, setInitialWodText] = useState("");

  // Check login status on mount
  useEffect(() => {
    const savedNickname = localStorage.getItem('wodcoach_nickname');
    if (savedNickname) {
      setNickname(savedNickname);
      setData(prev => ({
        ...prev,
        athlete: { ...prev.athlete, name: savedNickname }
      }));
    }
  }, []);

  // Load last WOD on mount if available
  useEffect(() => {
    const savedWod = localStorage.getItem('wodcoach_last_wod');
    if (savedWod) {
      setInitialWodText(savedWod);
    }
  }, []);

  const handleLogin = (name: string) => {
    localStorage.setItem('wodcoach_nickname', name);
    setNickname(name);
    setData(prev => ({
      ...prev,
      athlete: { ...prev.athlete, name: name }
    }));
  };

  const handleWodAnalysis = (text: string) => {
    const parsedWod = parseWodFromText(text);
    setData(prev => ({
      ...prev,
      wod: parsedWod
    }));
  };

  if (!nickname) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className={styles.appContainer}>
      <div className={styles.sidebarColumn}>
        <Sidebar athlete={data.athlete} />
      </div>
      <div className={styles.mainColumn}>
        <div className={styles.header}>
          <h1>Ciao, {nickname} 👋</h1>
          <p className={styles.date}>{new Date(data.date).toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
        </div>

        <WodInputPanel
          onAnalyze={handleWodAnalysis}
          initialText={initialWodText}
        />

        {data.wod.parts.length > 0 && (
          <>
            <div className="fade-in">
              <WodDisplay wod={data.wod} />
            </div>

            <div className={`${styles.analysisContainer} fade-in`}>
              <Analysis data={data} key={data.wod.title || 'analysis'} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
