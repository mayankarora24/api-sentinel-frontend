import { getAuth } from "firebase/auth";
import {
  collection,
  getDocs,
  getFirestore,
  limit,
  orderBy,
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

export const getUserLatestAPITestsForSavedProductAPI = async () => {
  const firestore = getFirestore();
  const auth = getAuth();
  const docs = await getDocs(
    query(
      collection(firestore, "reports"),
      where("uid", "==", auth.currentUser.uid),
      where("productAPIId", "!=", null),
      orderBy("createdAt", "desc"),
      limit(5)
    )
  );
  return docs.docs.map((doc) => doc.data());
};

export const getApiTestsForUserUsingProductAPI = async (productAPIId) => {
  const firestore = getFirestore();
  const docs = await getDocs(
    query(
      collection(firestore, "tests"),
      where("productAPIId", "==", productAPIId)
    )
  );
  return docs.docs.map((doc) => doc.data());
};
