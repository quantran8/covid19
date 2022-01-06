import axios from 'axios';
import { FirestoreDB } from 'firebase/index';
import { getDateTime } from 'custom/format';
export const getAllRequest = async (ag1, operator, ag2) => {
  const AllRequest = [];
  if (ag1 && operator && ag2) {
    const data = await FirestoreDB.collection('users')
      .where(ag1, operator, ag2)
      .get();
    data.forEach((item) => AllRequest.push({
       ...item.data(), 
       id: item.id,
       }));
  } else {
    const data = await FirestoreDB.collection('users').get();
    data.forEach((item) => AllRequest.push({
       ...item.data(), 
       id: item.id,
      }));
  }

  return AllRequest;
};
export const removeRequest = (id) => {
  FirestoreDB.collection('users').doc(id).delete();
};

export const addRequestFB = async (requestIfno) => {
  const data = await FirestoreDB.collection('users').add(requestIfno);
  return data.id;
};
export const updateRequestFB = (id, requestInfo) => {
  FirestoreDB.collection('users').doc(id).set(requestInfo);
};
