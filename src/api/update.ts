import {IPerson} from "../data/interfaces";
import {setDoc, collection, doc} from "firebase/firestore"
import {FIRESTORE} from "../firebase_keys";

export async function updatePersonData(person: IPerson): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        const _doc = doc(collection(FIRESTORE, `people`), `${person.id}`)
        setDoc(_doc, person).then(() => {
            resolve(true)
        }).catch((error) => {
            console.error(error)
            reject(error)
        })
    })
}

export async function createPersonData(name: string): Promise<boolean> {
    const person: IPerson = {
        name: name,
        id: name,
        fitch_count: 0,
        laugh_count: 0,
        count_difference: 0,
        laugh_ratio: 0,
        fitch_ratio: 0,
        joke_attempts: 0,
        name_array: Array.from(name),
    }
    return updatePersonData(person)
}
