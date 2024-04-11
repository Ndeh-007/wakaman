import {IPerson} from "../data/interfaces";
import {onSnapshot, collection, query, getDocs, where, orderBy} from "firebase/firestore";
import {FIRESTORE} from "../firebase_keys";

async function fetchPeople(): Promise<IPerson[]> {
    return new Promise((resolve, reject) => {
        const q = query(collection(FIRESTORE, "people"), orderBy("count_difference", "desc"))
        onSnapshot(q, (snapshot) => {
            const data: IPerson[] = []
            snapshot.forEach((_doc) => {
                data.push(_doc.data() as IPerson)
            })
            resolve(data)
        }, (error) => reject(error))
    })
}


async function fetchPerson(name: string): Promise<IPerson[]> {
    return new Promise((resolve, reject) => {
        const q = query(collection(FIRESTORE, "people"), where("name", "==", name))
        const data: IPerson[] = []
        getDocs(q).then((_docs) => {
            _docs.forEach((_doc) => {
                data.push(_doc.data() as IPerson)
            })
            resolve(data)
        }).catch((error) => {
            reject(error)
        });

        onSnapshot(q, (snapshot) => {
            const data: IPerson[] = []
            snapshot.forEach((_doc) => {
                data.push(_doc.data() as IPerson)
            })
            resolve(data)
        }, (error) => reject(error))
    })
}

export {fetchPeople, fetchPerson}