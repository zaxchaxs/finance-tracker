import { getDocsFilterdTransactions, getSnapshotUserTransaction } from "@/libs/firestoreMethods";
import { where } from "firebase/firestore";

export const dateFiltering = (idUser, value, setTransaction) => {
    try {
        switch (value) {
          case "Today":
            return getTransactionToday(idUser, setTransaction);
  
          case "Yesterday":
            return getTransactionYesterday(idUser, setTransaction);
  
          case "Yesterday":
            break;
  
          case "Last 7 days":
            break;
  
          case "Last 30 days":
            break;
  
          case "This month":
            break;
  
          case "Custom":
            break;
  
          default:
            break;
        }
      } catch (error) {
        
      }
}

const getTransactionToday = async (idUser, setTransaction) => {
  try {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));
    
    await getDocsFilterdTransactions(idUser, startOfDay, endOfDay, setTransaction);
  
    return today.toLocaleDateString('en-US', {day: 'numeric', month: 'long', year: '2-digit'});

  } catch (error) {
    console.error(error.message);
  }
}

const getTransactionYesterday = async (idUser, setTransaction) => {
  try {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const startOfDay = new Date(yesterday.setHours(0, 0, 0, 0));
    const endOfDay = new Date(yesterday.setHours(23, 59, 59, 999));

    await getDocsFilterdTransactions(idUser, startOfDay, endOfDay, setTransaction);

    return yesterday.toLocaleDateString('en-US', {day: 'numeric', month: 'long', year: '2-digit'}); 

  } catch (error) {
    console.error(error.message);
  }
}