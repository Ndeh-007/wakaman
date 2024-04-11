import React from 'react';
import {IonCard, IonCardContent, IonCol, IonGrid, IonRow} from '@ionic/react';
import './LeaderBoardTable.css';
import {IPerson} from "../data/interfaces";

const LeaderBoardTable: React.FC<{ headers: string[], contents?: IPerson[] }> = ({headers, contents}) => {
    return (
        <IonCard mode={"ios"}>
            <IonCardContent>
                <IonGrid className={"table-header"}>
                    {/*
                    TABLE HEADER
                */}
                    <IonRow>
                        {
                            headers.map((title, index) => {
                                return (
                                    <IonCol key={index}  className={index==0?"":"ion-text-center"} >{title}</IonCol>
                                )
                            })
                        }
                    </IonRow>
                </IonGrid>

                {/*
                TABLE CONTENT
            */}

                <IonGrid className={"table-content"}>
                    {
                        contents?.map((person, index) => {
                            return (
                                <IonRow key={index} >
                                    <IonCol>{person?.name}</IonCol>
                                    <IonCol className={"ion-text-center"}>{person?.laugh_count}</IonCol>
                                    <IonCol className={"ion-text-center"}>{person?.fitch_count}</IonCol>
                                    <IonCol className={"ion-text-center"}>{person?.joke_attempts}</IonCol>
                                    <IonCol className={"ion-text-center"}>{person?.laugh_ratio}</IonCol>
                                    <IonCol className={"ion-text-center"}>{person?.fitch_ratio}</IonCol>
                                    <IonCol className={"ion-text-center"}>{person?.count_difference}</IonCol>
                                </IonRow>
                            )
                        })
                    }
                </IonGrid>
            </IonCardContent>
        </IonCard>
    );
};

export default LeaderBoardTable;
