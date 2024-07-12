import { getDocsFilterdTransactions, getSnapshotUserTransaction } from "@/libs/firestoreMethods";
import { where } from "firebase/firestore";

export const dateFiltering = (idUser, valueDate, walletId, setTransaction) => {
    try {
        switch (valueDate) {
          case "Today":
            return getTransactionToday(idUser, walletId, setTransaction);
  
            case "Yesterday":
            return getTransactionYesterday(idUser, walletId, setTransaction);
  
          case "Last 7 days":
            return getTransactionLastWeek(idUser, walletId, setTransaction);
  
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

const getTransactionToday = async (idUser, walletId, setTransaction) => {
  try {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));
    
    await getDocsFilterdTransactions(idUser, startOfDay, endOfDay, walletId, setTransaction);
    
    // const option = {day: 'numeric', month: 'long', year: '2-digit'}
    // return today.toLocaleDateString('en-US', option);

  } catch (error) {
    console.error(error.message);
  }
}

const getTransactionYesterday = async (idUser, walletId, setTransaction) => {
  try {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const startOfDay = new Date(yesterday.setHours(0, 0, 0, 0));
    const endOfDay = new Date(yesterday.setHours(23, 59, 59, 999));

    await getDocsFilterdTransactions(idUser, startOfDay, endOfDay, walletId, setTransaction);

    // const option = {day: 'numeric', month: 'long', year: '2-digit'}
    // return yesterday.toLocaleDateString('en-US', option); 

  } catch (error) {
    console.error(error.message);
  }
}

const getTransactionLastWeek =  async (idUser, walletId, setTransaction) => {
  try {
    const today = new Date();
    const lastWeek = new Date();
    lastWeek.setDate(today.getDate() - 7);
    const startOfWeek = new Date(lastWeek.setHours(0,0,0,0));
    const endOfWeek = new Date(today.setHours(23, 59, 59, 999));

    await getDocsFilterdTransactions(idUser, startOfWeek, endOfWeek, walletId, setTransaction);

    // const option = {day: 'numeric', month: 'long'};
    // return `${lastWeek.toLocaleDateString('en-US', option)} - ${today.toLocaleDateString('en-US', option)}`


  } catch (error) {
    
  }
}