import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/react';
import './Tab2.css';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tips</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Snel en slim: korte tips</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <ul>
              <li>Leeg verpakkingen en knijp ze plat — bespaart ruimte in de PMD-bak.</li>
              <li>Houd etensresten uit plastic en glas — spoel kort na indien nodig.</li>
              <li>Bewaar batterijen apart en lever ze in bij een inzamelpunt.</li>
            </ul>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
