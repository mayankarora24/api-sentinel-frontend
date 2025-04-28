import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";

export const saveProductAPI = async (productAPIPayload, uid) => {
  const firestore = getFirestore();
  const productAPIRef = doc(collection(firestore, "productAPIs"));
  await setDoc(productAPIRef, {
    ...productAPIPayload,
    productAPIId: productAPIRef.id,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    uid: uid,
  });
};

export const getUserProductAPIs = async (uid) => {
  const firestore = getFirestore();
  const docs = await getDocs(
    query(collection(firestore, "productAPIs"), where("uid", "==", uid))
  );
  return docs.docs.map((doc) => doc.data());
};
export const getApiTestsReportsForUserUsingProductAPI = async (
  productAPIId
) => {
  const firestore = getFirestore();
  const docs = await getDocs(
    query(
      collection(firestore, "reports"),
      where("productAPIId", "==", productAPIId)
    )
  );
  return docs.docs.map((doc) => doc.data());
};
