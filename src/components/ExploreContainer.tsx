import { IonModal, IonContent, IonSearchbar, IonList, IonItem, IonAvatar, IonImg, IonLabel, IonHeader, IonTitle, IonButton, IonIcon, IonToolbar, IonButtons, IonChip } from '@ionic/react';
import './ExploreContainer.css';
import { useCallback, useEffect, useRef, useState } from 'react';
import { closeCircle, mapOutline, navigate, navigateOutline, pin, close, flag } from 'ionicons/icons';
import Map from '../components/Map';
import RoomInfoModal from './RoomInfoModal';
import { dijkstra } from '../data/MapPathModule';

interface ContainerProps {
  floorNumber: string;
  findedRoomNumber: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ floorNumber, findedRoomNumber }) => {
  const modal = useRef<HTMLIonModalElement>(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
  const [mapRoute, setMapRoute] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [routeButtonDisabled, setRouteButtonDisabled] = useState(true);
  const [roomInfo, setRoomInfo] = useState<any>({});

  useEffect(() => {
    console.log("пупуп")
    if (findedRoomNumber !== "") {
      console.log("alaslasdls")
      setSelectedRooms(oldValues => {
        return [findedRoomNumber];
      })
    }
  }, [findedRoomNumber])

  const handleSelectRoom = (room: any) => {
    setModalOpen(true);
    setSelectedRoom(room);

    setSelectedRooms(oldValues => {
      if (!oldValues.includes(room)) {
        if (oldValues.length == 2) {
          return oldValues;
        }
        if (oldValues.length == 1) {
          setRouteButtonDisabled(false);
        }
        return [...oldValues, room];
      } else {
        return oldValues.filter(item => item !== room);
      }
    })

    fetch(`/src/data/info_floor_${floorNumber}.json`)
      .then(response => response.json())
      .then(data => {
        console.log(data.filter((roomInfo: any) => roomInfo.roomId === room));

        const roomInfo = data.filter((roomInfo: any) => roomInfo.roomId === room);
        setRoomInfo({ ...roomInfo });
        console.log(roomInfo)
      })
      .catch(error => {
        console.error('Ошибка при загрузке файла:', error);
      });

    // if (selectedRooms.length == 2)
    //   setRouteButtonDisabled(false);
  }

  const handleCreateRouteButtonClick = (e: Event) => {
    const roomPointIdA = selectedRooms[0].split("_")[0] == "room" ? selectedRooms[0].replace("room_", "room_point_") : selectedRooms[0] + "_point";
    const roomPointIdB = selectedRooms[1].split("_")[0] == "room" ? selectedRooms[1].replace("room_", "room_point_") : selectedRooms[1] + "_point";

    console.log(roomPointIdA);
    console.log(roomPointIdB);

    fetch(`/src/data/graph_floor_${floorNumber}.json`)
      .then(response => response.json())
      .then(data => {
        const shortestPaths = dijkstra(data, roomPointIdA, roomPointIdB);
        setMapRoute(shortestPaths);
        console.log(shortestPaths);
      })
      .catch(error => {
        console.error('Ошибка при загрузке файла:', error);
      });
  }

  return (
    <IonContent>
      {/* <IonChip>
        <IonIcon icon={flag} color="primary"></IonIcon>
        <IonLabel>4 этаж, 414 ауд.</IonLabel>
        <IonIcon icon={close}></IonIcon>
      </IonChip>
      <IonChip>
        <IonIcon icon={flag} color="primary"></IonIcon>
        <IonLabel>4 этаж, 414 ауд.</IonLabel>
        <IonIcon icon={close}></IonIcon>
      </IonChip> */}
      <Map onSelectRoom={handleSelectRoom} selectedRooms={selectedRooms} route={mapRoute} floorNumber={floorNumber} />
      <RoomInfoModal
        room={selectedRoom}
        onClickRouteButton={handleCreateRouteButtonClick}
        onClose={() => { setModalOpen(false); setSelectedRooms([]) }}
        isOpen={modalOpen}
        isRouteButtonDisabled={routeButtonDisabled}
        roomInfo={roomInfo} />
    </IonContent>
  );
};

export default ExploreContainer;