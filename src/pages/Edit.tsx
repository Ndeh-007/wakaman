import React, {useEffect, useRef, useState} from 'react';
import {
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent, IonCol,
    IonContent, IonGrid,
    IonHeader, IonIcon, IonLabel,
    IonPage, IonRow,
    IonSearchbar,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import './Update.css';
import {addCircle, removeCircle} from "ionicons/icons";
import {IPerson} from "../data/interfaces";
import {createPersonData, updatePersonData} from "../api/update";
import {fetchPerson} from "../api/fetch";
import {useLocation} from "react-router";

const Edit: React.FC = () => {

    const location = useLocation()

    const [people, setPeople] = useState<IPerson[]>([])
    const [searchName, setSearchName] = useState<string>("")
    const createNewPersonBtnRef = useRef<HTMLIonButtonElement>(null)

    const lc_plus_btnRef = useRef<HTMLIonButtonElement>(null)
    const lc_minus_btnRef = useRef<HTMLIonButtonElement>(null)
    const fc_plus_btnRef = useRef<HTMLIonButtonElement>(null)
    const fc_minus_btnRef = useRef<HTMLIonButtonElement>(null)


    function addLaugh(person: IPerson) {
        person.laugh_count++
        const p = computePersonVariables(person)
        updatePersonData(p).then(() => loadData())
    }

    function subLaugh(person: IPerson) {
        person.laugh_count--
        const p = computePersonVariables(person)
        updatePersonData(p).then(() => loadData())
    }

    function addFitch(person: IPerson) {
        person.fitch_count++
        const p = computePersonVariables(person)
        updatePersonData(p).then(() => loadData())
    }

    function subFitch(person: IPerson) {
        person.fitch_count--
        const p = computePersonVariables(person)
        updatePersonData(p).then(() => loadData())
    }

    function addJokeAttempt(person: IPerson) {
        person.joke_attempts++
        const p = computePersonVariables(person)
        updatePersonData(p).then(() => loadData())
    }

    function subJokeAttempt(person: IPerson) {
        person.joke_attempts++
        const p = computePersonVariables(person)
        updatePersonData(p).then(() => loadData())
    }

    function computePersonVariables(person: IPerson) {
        person.count_difference = person.laugh_count - person.fitch_count
        person.laugh_ratio = person.laugh_count / person.joke_attempts
        person.fitch_ratio = person.fitch_count / person.joke_attempts
        return person
    }

    function loadData() {
        fetchPerson(searchName).then((r) => setPeople(r))
    }

    useEffect(() => {
        if (location) {
            let p: IPerson[] = location.state as IPerson[]
            if (!Array.isArray(p))  p = []
            setPeople(p)
        }

    }, [])

    return (
        <IonPage>
            <IonHeader className={"ion-no-border"}>
                <IonToolbar>
                    <IonTitle>Update</IonTitle>
                    <IonButton slot={"end"} routerLink={"/"}>
                        <IonLabel>Leader Boards</IonLabel>
                    </IonButton>
                </IonToolbar>
            </IonHeader>
            <IonContent>


                <IonCard mode={"ios"}>
                    <IonCardContent>
                        <IonToolbar>
                            <IonSearchbar mode={"md"} placeholder={"Search"} onInput={async (e) => {
                                const name = e.currentTarget.value
                                if (name == null) return
                                setSearchName(name)
                                if (name.length == 0) return;
                                fetchPerson(name).then((data) => setPeople(data)).catch(e => console.log(e))
                            }}></IonSearchbar>
                        </IonToolbar>
                        <div className={"ion-padding"}></div>
                        {/*   HEADER   */}
                        <IonGrid class={"table-header "}>
                            <IonRow className={"ion-text-center"}>
                                <IonCol>Name</IonCol>
                                <IonCol>LC</IonCol>
                                <IonCol></IonCol>
                                <IonCol>FC</IonCol>
                                <IonCol></IonCol>
                                <IonCol>CD</IonCol>
                                <IonCol></IonCol>
                                <IonCol>JA</IonCol>
                            </IonRow>
                        </IonGrid>

                        {/*   CONTENT   */}
                        <IonGrid className={"table-content "}>
                            {
                                people?.map((person, index) => {
                                    return (
                                        <IonRow key={index} className={"ion-align-items-center"}>
                                            <IonCol className={"ion-text-center"}>{person?.name}</IonCol>
                                            <IonCol className={"ion-text-center"}>{person?.laugh_count}</IonCol>
                                            <IonCol>
                                                <IonToolbar color={"clear"}>
                                                    <IonButtons slot={"end"}>
                                                        <IonButton color={'success'} ref={lc_plus_btnRef}
                                                                   onClick={() => addLaugh(person)}>
                                                            <IonIcon icon={addCircle}></IonIcon>
                                                        </IonButton>
                                                        <IonButton color={"danger"} ref={lc_minus_btnRef}
                                                                   onClick={() => subLaugh(person)}>
                                                            <IonIcon icon={removeCircle}></IonIcon>
                                                        </IonButton>
                                                    </IonButtons>
                                                </IonToolbar>
                                            </IonCol>
                                            <IonCol className={"ion-text-center"}>   {person?.fitch_count}   </IonCol>
                                            <IonCol>
                                                <IonToolbar color={'clear'}>
                                                    <IonButtons slot={"end"}>
                                                        <IonButton color={'success'} ref={fc_plus_btnRef}
                                                                   onClick={() => addFitch(person)}>
                                                            <IonIcon icon={addCircle}></IonIcon>
                                                        </IonButton>
                                                        <IonButton color={"danger"} ref={fc_minus_btnRef}
                                                                   onClick={() => subFitch(person)}>
                                                            <IonIcon icon={removeCircle}></IonIcon>
                                                        </IonButton>
                                                    </IonButtons>
                                                </IonToolbar>
                                            </IonCol>
                                            <IonCol className={"ion-text-center"}>   {person?.joke_attempts}   </IonCol>
                                            <IonCol>
                                                <IonToolbar color={'clear'}>
                                                    <IonButtons slot={"end"}>
                                                        <IonButton color={'success'}
                                                                   onClick={() => addJokeAttempt(person)}>
                                                            <IonIcon icon={addCircle}></IonIcon>
                                                        </IonButton>
                                                        <IonButton color={"danger"}
                                                                   onClick={() => subJokeAttempt(person)}>
                                                            <IonIcon icon={removeCircle}></IonIcon>
                                                        </IonButton>
                                                    </IonButtons>
                                                </IonToolbar>
                                            </IonCol>
                                            <IonCol className={'ion-text-center'}>{person?.joke_attempts}</IonCol>
                                        </IonRow>
                                    )
                                })
                            }
                            {
                                searchName.length > 0 && (
                                    <IonRow>
                                        <IonCol>{searchName}</IonCol>
                                        <IonCol>
                                            <IonButton ref={createNewPersonBtnRef} onClick={() => {

                                                if (searchName.length == 0) {
                                                    return;
                                                }
                                                createPersonData(searchName).then(() => loadData())
                                            }}>Create</IonButton>
                                        </IonCol>
                                    </IonRow>
                                )
                            }
                        </IonGrid>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default Edit;
