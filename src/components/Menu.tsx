import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { archiveOutline, archiveSharp, bookmarkOutline, businessOutline, businessSharp, heartOutline, heartSharp, layersOutline, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';
import './Menu.css';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
  disabled: boolean;
}

const appPages: AppPage[] = [
  {
    title: '1 корпус',
    url: '/floor/99',
    iosIcon: businessOutline,
    mdIcon: businessSharp,
    disabled: true
  },
  {
    title: '2 корпус',
    url: '/floor/1',
    iosIcon: businessOutline,
    mdIcon: businessSharp,
    disabled: false
  },
  {
    title: '3 корпус',
    url: '/folder/Outbox2',
    iosIcon: businessOutline,
    mdIcon: businessSharp,
    disabled: true
  },
  // {
  //   title: 'Favorites',
  //   url: '/folder/Favorites',
  //   iosIcon: heartOutline,
  //   mdIcon: heartSharp
  // },
  // {
  //   title: 'Archived',
  //   url: '/folder/Archived',
  //   iosIcon: archiveOutline,
  //   mdIcon: archiveSharp
  // },
  // {
  //   title: 'Trash',
  //   url: '/folder/Trash',
  //   iosIcon: trashOutline,
  //   mdIcon: trashSharp
  // },
  // {
  //   title: 'Spam',
  //   url: '/folder/Spam',
  //   iosIcon: warningOutline,
  //   mdIcon: warningSharp
  // }
];

interface LayerPage {
  url: string;
  title: string;
}

const layers: LayerPage[] = [
  {
    title: '1 этаж',
    url: '/floor/1',
  },
  {
    title: '2 этаж',
    url: '/floor/2',
  },
  {
    title: '3 этаж',
    url: '/floor/3',
  },
  {
    title: '4 этаж',
    url: '/floor/4',
  },
]
//const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="push">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Карта ВГТУ</IonListHeader>
          <IonNote>Интерактивная карта ВУЗа</IonNote>
          {appPages.map((appPage, index) => {
            if (appPage.disabled) {
              return (
                <IonItem key={index} className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false} disabled={appPage.disabled}>
                  <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              );
            }
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false} disabled={appPage.disabled}>
                  <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>

        <IonList id="labels-list">
          <IonListHeader>Этаж</IonListHeader>
          {layers.map((layerPage, index) => (
            // <IonItem lines="none" key={index}>
            //   <IonIcon aria-hidden="true" slot="start" icon={layersOutline} />
            //   <IonLabel>{label}</IonLabel>
            // </IonItem>
            <IonMenuToggle key={index} autoHide={false}>
              <IonItem className={location.pathname === layerPage.url ? 'selected' : ''} routerLink={layerPage.url} routerDirection="none" lines="none" detail={false}>
                <IonIcon aria-hidden="true" slot="start" ios={layersOutline} md={layersOutline} />
                <IonLabel>{layerPage.title}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          ))}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
