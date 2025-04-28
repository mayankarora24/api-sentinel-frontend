import { doc, getDoc, getFirestore } from "firebase/firestore";
export const getReport = async (reportId: string) => {
  const firestore = getFirestore();
  const reportDoc = await getDoc(doc(firestore, "reports", reportId));
  return reportDoc.data();
};
