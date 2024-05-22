import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonSearchbar, IonList, IonItem, IonSegment, IonLabel, IonSegmentButton, IonAvatar, IonIcon } from '@ionic/react';
import { useParams } from 'react-router';
import React, { useEffect, useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Page.css';

import Fuse from 'fuse.js';
import { book } from 'ionicons/icons';


// const data = [
//   { id: 1, name: 'John Doe' },
//   { id: 2, name: 'Jane Doe' },
//   { id: 3, name: 'Bob Smith' },
// ];

const data: any[] = [];

const Page: React.FC = () => {

  const { floorNumber } = useParams<{ floorNumber: string; }>();

  // const data = [
  //   'Amsterdam',
  //   'Buenos Aires',
  //   'Cairo',
  //   'Geneva',
  //   'Hong Kong',
  //   'Istanbul',
  //   'London',
  //   'Madrid',
  //   'New York',
  //   'Panama City',
  // ];
  let [results, setResults] = useState<any>([]);
  const [data, setData] = useState<any[]>([]);
  const [findedRoomNumber, setFindedRoomNumber] = useState<string>("");

  useEffect(() => {
    fetch(`/src/data/info_floor_${floorNumber}.json`)
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error('Ошибка при загрузке файла:', error);
      });
  }, [])

  const fuse = new Fuse(data, {
    keys: ['name', "type", "desc"],
  });

  const handleInput = (ev: Event) => {
    // let query = '';
    // const target = ev.target as HTMLIonSearchbarElement;
    // if (target) query = target.value!.toLowerCase();

    // setResults(data.filter((d) => d.toLowerCase().indexOf(query) > -1));

    let query = '';
    const target = ev.target as HTMLIonSearchbarElement;
    if (target) query = target.value!.toLowerCase();
    const searchResults = fuse.search(query);
    // setResults(searchResults);
    setResults(searchResults.map((result) => result.item));
  };

  const [searchModalVisible, setSearchModalVisible] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          {/* <IonTitle>{name}</IonTitle> */}
          <IonTitle>1 корпус, {floorNumber} этаж</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar animated={true} placeholder="Поиск аудитории" onIonInput={(ev) => handleInput(ev)} onFocus={() => { setSearchModalVisible(true) }} onBlur={() => { setSearchModalVisible(true) }}></IonSearchbar>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader>
          {/* <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar> */}
          {/* <IonToolbar>
            <IonSegment value="all">
              <IonSegmentButton value="all">
                <IonLabel>All</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="favorites">
                <IonLabel>Favorites</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </IonToolbar> */}
          {/* <IonToolbar>


          </IonToolbar> */}
        </IonHeader>
        {searchModalVisible && <IonList style={{ position: "absolute", zIndex: 1, width: "100%" }}>
          {results.map((result: any, i: number) => (
            // <IonItem>{JSON.stringify(result)}</IonItem>
            <IonItem key={i} onClick={() => { setFindedRoomNumber(result.roomId); setResults([]); }}>
              <IonAvatar slot="start">
                <IonIcon icon={book} />
              </IonAvatar>
              <IonLabel>
                <h2>{result.name}</h2>
                <p>{result.type}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
        }
        <ExploreContainer floorNumber={floorNumber} findedRoomNumber={findedRoomNumber} />
      </IonContent>
    </IonPage>
  );
};

export default Page;
