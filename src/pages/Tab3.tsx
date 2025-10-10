import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButton } from '@ionic/react';
import { useEffect, useState } from 'react';
import './Tab3.css';

const Tab3: React.FC = () => {
  const [board, setBoard] = useState<Array<{ name: string; points: number; date: string }>>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('gib_leaderboard');
      if (raw) setBoard(JSON.parse(raw));
    } catch (e) {
      // ignore
    }
  }, []);

  const clearBoard = () => {
    localStorage.removeItem('gib_leaderboard');
    setBoard([]);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Leaderboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h3>Top spelers</h3>
        <IonList>
          {board.length === 0 ? (
            <IonItem>
              <IonLabel>Geen scores gevonden — maak eerst een quizrun en sla op.</IonLabel>
            </IonItem>
          ) : board.map((entry, idx) => (
            <IonItem key={idx}>
              <IonLabel>{idx + 1}. {entry.name} — {entry.points} punten</IonLabel>
            </IonItem>
          ))}
        </IonList>
        <div style={{ marginTop: 12 }}>
          <IonButton color="medium" onClick={clearBoard}>Leeg leaderboard</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
