import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon } from '@ionic/react';
import { megaphone, leaf, trophy, school } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const Tab1: React.FC = () => {
  const [badge, setBadge] = useState<{ key: string; name: string; emoji: string; color: string; desc: string } | null>(null);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    try {
      const stored = localStorage.getItem('gib_badge');
      if (stored) setBadge(JSON.parse(stored));
    } catch (e) {
      // ignore
    }
  }, []);

  // Defensive: ensure URL is /tab1 when this page mounts
  useEffect(() => {
    if (location.pathname !== '/tab1') {
      history.replace('/tab1');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Gooi het in de bak</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding tab1-page">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Hoofdmenu</IonTitle>
          </IonToolbar>
        </IonHeader>

        <section className="hero">
          <h2>Weet jij hoe je afval scheidt?</h2>
          <p>Speel de quiz, ontdek slimme tips en neem uitdagingen aan om afvalscheiding leuk te maken.</p>
          {badge && (
            <div className="badge-chip" style={{ borderColor: badge.color }}>
              <span className="badge-emoji">{badge.emoji}</span>
              <div className="badge-text">
                <strong>{badge.name}</strong>
                <div className="badge-desc">{badge.desc}</div>
              </div>
            </div>
          )}
        </section>

        <section className="menu-grid">
          <IonCard className="menu-card quiz-card">
            <IonCardHeader>
              <IonCardTitle><IonIcon icon={school} /> Quiz</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              Test je kennis in de interactieve quiz — kort, leuk en leerzaam.
            </IonCardContent>
            <div className="card-actions">
              <IonButton expand="block" color="primary" routerLink="/quiz">Start de quiz</IonButton>
            </div>
          </IonCard>

          <IonCard className="menu-card tips-card">
            <IonCardHeader>
              <IonCardTitle><IonIcon icon={leaf} /> Tips</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              Handige en snelle tips om thuis direct beter te scheiden — begrijpelijk en to the point.
            </IonCardContent>
            <div className="card-actions">
              <IonButton expand="block" fill="outline" routerLink="/tab2">Bekijk tips</IonButton>
            </div>
          </IonCard>

          <IonCard className="menu-card challenge-card">
            <IonCardHeader>
              <IonCardTitle><IonIcon icon={megaphone} /> Challenges</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              Daag jezelf uit: wekelijkse opdrachten om afval te verminderen en punten te scoren.
            </IonCardContent>
            <div className="card-actions">
              <IonButton expand="block" fill="outline" routerLink="/challenges">Doe mee</IonButton>
            </div>
          </IonCard>

          <IonCard className="menu-card leaderboard-card">
            <IonCardHeader>
              <IonCardTitle><IonIcon icon={trophy} /> Leaderboard</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              Zie wie de meeste punten verzamelt — perfect voor competitie tussen vrienden.
            </IonCardContent>
            <div className="card-actions">
              <IonButton expand="block" fill="outline" routerLink="/tab3">Bekijk leaderboard</IonButton>
            </div>
          </IonCard>
        </section>

        {/* Keep small reference content */}
        <ExploreContainer name="" />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
