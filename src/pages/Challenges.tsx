import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton } from '@ionic/react';
import './Tab2.css';

const Challenges: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Challenges</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Wekelijkse uitdaging</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            Deze week: Verzamel zo veel mogelijk plastic verpakkingen en breng ze naar de PMD-bak.
          </IonCardContent>
        </IonCard>
        <div style={{ marginTop: 12 }}>
          <IonButton>Doe mee</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Challenges;
