import { IonModal, IonContent, IonSearchbar, IonList, IonItem, IonAvatar, IonImg, IonLabel, IonHeader, IonTitle, IonButton, IonIcon, IonToolbar, IonButtons } from '@ionic/react';
import './ExploreContainer.css';
import { useRef, useState } from 'react';
import { closeCircle, mapOutline, navigate, navigateOutline } from 'ionicons/icons';
import Map from '../components/Map';

interface RoomInfoProps {
    room: string | null;
}

const RoomInfoModal: React.FC<RoomInfoProps> = ({ room }) => {
    const modal = useRef<HTMLIonModalElement>(null);

    function dismiss() {
        modal.current?.dismiss();
    }

    return (
        <IonModal
            ref={modal}
            trigger="open-modal"
            isOpen={true}
            initialBreakpoint={0.25}
            breakpoints={[0.25, 0.5]}
            backdropDismiss={true}
            backdropBreakpoint={0.5}
            keyboardClose
        >
            <IonHeader>
                <IonButtons slot="end">
                    <IonButton onClick={() => dismiss()} color="medium">
                        <IonIcon aria-hidden="true" slot="start" ios={closeCircle} />
                    </IonButton>
                </IonButtons>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonHeader>
                    <h2>Аудитория {room}</h2>
                </IonHeader>
                <IonButton expand="block">
                    <IonIcon slot="start" icon={navigate}></IonIcon>
                    Проложить маршрут
                </IonButton>
                {/* <IonSearchbar onClick={() => modal.current?.setCurrentBreakpoint(0.75)} placeholder="Search"></IonSearchbar>
          <IonList>
            <IonItem>
              <IonAvatar slot="start">
                <IonImg src="https://i.pravatar.cc/300?u=b" />
              </IonAvatar>
              <IonLabel>
                <h2>Connor Smith</h2>
                <p>Sales Rep</p>
              </IonLabel>
            </IonItem>
          </IonList> */}
            </IonContent>
        </IonModal>
    );
};

export default RoomInfoModal;