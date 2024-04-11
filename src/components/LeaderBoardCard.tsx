import React from 'react';
import {
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonChip,
     IonLabel,
} from '@ionic/react';
import './LeaderBoardCard.css';
import {IPerson} from "../data/interfaces";

const LeaderBoardCard: React.FC<{person?: IPerson, position: string}> = ({person, position}) => {
    return (
        <IonCard mode={"ios"}>
            <IonChip color={"medium"} className={"ion-float-end ion-margin"}>
                <IonLabel >Count Difference: {person?.count_difference}</IonLabel>
            </IonChip>
            <IonCardHeader>
                <IonCardTitle>{person?.name}</IonCardTitle>
                <IonCardSubtitle>{position}</IonCardSubtitle>
            </IonCardHeader>
        </IonCard>
    );
};

export default LeaderBoardCard;
