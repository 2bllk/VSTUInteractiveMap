import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonSearchbar, IonList, IonItem, IonSegment, IonLabel, IonSegmentButton } from '@ionic/react';
import { useParams } from 'react-router';
import React, { useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Page.css';

const Page: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

  const data = [
    'Amsterdam',
    'Buenos Aires',
    'Cairo',
    'Geneva',
    'Hong Kong',
    'Istanbul',
    'London',
    'Madrid',
    'New York',
    'Panama City',
  ];
  let [results, setResults] = useState([...data]);

  const handleInput = (ev: Event) => {
    let query = '';
    const target = ev.target as HTMLIonSearchbarElement;
    if (target) query = target.value!.toLowerCase();

    setResults(data.filter((d) => d.toLowerCase().indexOf(query) > -1));
  };

  const [searchModalVisible, setSearchModalVisible] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar animated={true} placeholder="Поиск аудитории" onIonInput={(ev) => handleInput(ev)} onFocus={() => { setSearchModalVisible(true) }} onBlur={() => { setSearchModalVisible(false) }}></IonSearchbar>
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
          {results.map((result) => (
            <IonItem>{result}</IonItem>
          ))}
        </IonList>
        }
        <ExploreContainer name={name} />
      </IonContent>
    </IonPage>
  );
};

export default Page;
