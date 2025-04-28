import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

export const getUserApiTests = async (uid) => {
  const firestore = getFirestore();
  const docs = await getDocs(
    query(collection(firestore, "tests"), where("uid", "==", uid))
  );
  return docs.docs.map((doc) => doc.data());
};
