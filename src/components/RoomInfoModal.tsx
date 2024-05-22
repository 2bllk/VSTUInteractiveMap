import { IonModal, IonContent, IonSearchbar, IonList, IonItem, IonAvatar, IonImg, IonLabel, IonHeader, IonTitle, IonButton, IonIcon, IonToolbar, IonButtons, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonNote, IonText } from '@ionic/react';
import './ExploreContainer.css';
import './RoomInfoModal.css';
import { useRef, useState } from 'react';
import { airplane, bluetooth, call, closeCircle, mapOutline, navigate, navigateOutline, wifi, accessibility } from 'ionicons/icons';
import Map from '../components/Map';

interface RoomInfoProps {
    room: string | null;
    onClickRouteButton: (event: any) => void;
    onClose: () => void;
    isOpen: boolean;
    isRouteButtonDisabled: boolean;
    roomInfo: any;
}

const RoomInfoModal: React.FC<RoomInfoProps> = ({ room, onClickRouteButton, onClose, isOpen, isRouteButtonDisabled, roomInfo }) => {
    const modal = useRef<HTMLIonModalElement>(null);

    function dismiss() {
        onClose();
        // modal.current?.dismiss();
    }

    return (
        <IonModal
            ref={modal}
            // trigger="open-modal"
            isOpen={isOpen}
            initialBreakpoint={0.25}
            // onIonBreakpointDidChange={}
            breakpoints={[0.25, 0.5, 0.75, 1]}
            backdropDismiss={false}
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
                {/* <IonHeader>
                    <h2>Аудитория {room}</h2>
                </IonHeader>
                <IonButton expand="block" onClick={onClickRouteButton}>
                    <IonIcon slot="start" icon={navigate}></IonIcon>
                    Проложить маршрут
                </IonButton> */}
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

                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>{roomInfo[0] ? roomInfo[0].name : "Нет информации"}</IonCardTitle>
                        {/* <IonCardSubtitle>Card Subtitle</IonCardSubtitle> */}
                    </IonCardHeader>

                    <IonCardContent>{roomInfo[0] ? roomInfo[0].type : ""} {"\n"} {roomInfo[0] ? roomInfo[0].desc : "Нет информации"}</IonCardContent>

                    <IonButton fill="clear" expand="block" onClick={onClickRouteButton} disabled={isRouteButtonDisabled}>
                        <IonIcon slot="start" icon={navigate}></IonIcon>
                        Проложить маршрут
                    </IonButton>
                </IonCard>

                <IonList inset={true}>
                    <IonItem key={-1}>
                        <IonIcon aria-hidden="true" icon={accessibility} slot="start"></IonIcon>
                        <IonLabel>Количество мест: {roomInfo[0] ? roomInfo[0].placesCount : "error"}</IonLabel>
                    </IonItem>

                    {
                        roomInfo[0] && roomInfo[0].equipment.map((eq: any, i: number) => {
                            return (
                                <IonItem key={i}>
                                    <IonIcon aria-hidden="true" icon={eq.icon} slot="start"></IonIcon>
                                    <IonLabel>{eq.name}: {eq.count}</IonLabel>
                                </IonItem>
                            )
                        })
                    }

                    {/* <IonItem>
                        <IonIcon aria-hidden="true" icon={wifi} slot="start"></IonIcon>
                        <IonLabel>Компьютеры</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonIcon aria-hidden="true" icon={bluetooth} slot="start"></IonIcon>
                        <IonLabel>Проектор</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonIcon aria-hidden="true" icon={call} slot="start"></IonIcon>
                        <IonLabel>Маркерная доска</IonLabel>
                    </IonItem> */}
                </IonList>

                {/* <IonList inset={true}>
                    <IonItem>
                        <IonIcon aria-hidden="true" icon={airplane} slot="start"></IonIcon>
                        <IonLabel>Airplane Mode</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonIcon aria-hidden="true" icon={wifi} slot="start"></IonIcon>
                        <IonLabel>Wi-Fi</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonIcon aria-hidden="true" icon={bluetooth} slot="start"></IonIcon>
                        <IonLabel>Bluetooth</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonIcon aria-hidden="true" icon={call} slot="start"></IonIcon>
                        <IonLabel>Cellular</IonLabel>
                    </IonItem>
                </IonList> */}

                {/* <IonNote color="medium" class="ion-margin-horizontal">
                    Your comments will be kept anonymous and will only be used to improve the reliability of our products.
                </IonNote> */}

            </IonContent>
        </IonModal>
    );
};

export default RoomInfoModal;