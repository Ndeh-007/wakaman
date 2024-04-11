import React, {useState} from 'react';
import {IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar} from '@ionic/react';
import './Home.css';
import LeaderBoardCard from "../components/LeaderBoardCard";
import {IPerson} from "../data/interfaces";
import LeaderBoardTable from "../components/LeaderBoardTable";
import {fetchPeople} from "../api/fetch";
import {useHistory} from "react-router";

const Home: React.FC = () => {
    const history = useHistory()
    const [firstPerson, setFirstPerson] = useState<IPerson>()
    const [secondPerson, setSecondPerson] = useState<IPerson>()
    const [lastPerson, setLastPerson] = useState<IPerson>()

    const [People, setPeople] = useState<IPerson[]>([])
    const tableHeaders = ["Name", "LC", "FC", "JA", "LR", "FR", "CD"]

    fetchPeople().then((people)=>{
        setFirstPerson(people[0])
        setSecondPerson(people[1])
        setLastPerson(people[people.length -1])

        setPeople(people)
    }).catch((e)=>{
        alert("An Error occurred")
        console.error(e)
    })

    return (
        <IonPage>
            <IonHeader className={"ion-no-border"}>
                <IonToolbar onClick={()=> history.push("/edit", People)}>
                    <IonTitle size={'large'}>DJW Leader Boards</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className={"ion-padding-horizontal"}>
                <IonGrid  className={"ion-no-padding ion-no-margin"}>
                    <IonRow>
                        <IonCol>
                            <LeaderBoardCard person={firstPerson} position={"First"}/>
                        </IonCol>
                        <IonCol>
                            <LeaderBoardCard person={secondPerson} position={"Second"}/>
                        </IonCol>
                        <IonCol>
                            <LeaderBoardCard person={lastPerson} position={"Last"}/>
                        </IonCol>
                    </IonRow>
                </IonGrid>

                <LeaderBoardTable headers={tableHeaders} contents={People}/>

            </IonContent>
        </IonPage>
    );
};

export default Home;
