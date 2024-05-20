import { IonModal, IonContent, IonSearchbar, IonList, IonItem, IonAvatar, IonImg, IonLabel, IonHeader, IonTitle, IonButton, IonIcon, IonToolbar, IonButtons } from '@ionic/react';
import './ExploreContainer.css';
import { useRef, useState } from 'react';
import { closeCircle, mapOutline, navigate, navigateOutline } from 'ionicons/icons';
import Map from '../components/Map';
import RoomInfoModal from './RoomInfoModal';

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  const modal = useRef<HTMLIonModalElement>(null);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const handleSelectRoom = (room: any) => {
    setSelectedRoom(room);
  }

  return (
    <IonContent>
      <Map onSelectRoom={handleSelectRoom} />
      <RoomInfoModal room={selectedRoom} />
    </IonContent>
  );
};

export default ExploreContainer;