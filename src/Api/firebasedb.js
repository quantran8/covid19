import axios from 'axios';
import {FirestoreDB} from 'firebase/index';
export const getAllRequest = async () => {
    const AllRequest = [];
    // const data =  FirestoreDB.collection("users").get().then(snapshot =>{
    //     console.log(snapshot)
    //     snapshot.forEach(doc => AllRequest.push(doc.data()))
    // });
    const data = await FirestoreDB.collection("users").get();
    data.forEach(item => AllRequest.push({...item.data(),id:item.id}))
    return AllRequest;
}