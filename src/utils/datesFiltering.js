import { getDocsFilterdTransactions, getSnapshotUserTransaction } from "@/libs/firestoreMethods";
import { customDateSweetAlert } from "@/libs/sweetAlert";
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
            return getTransactionLastMonth(idUser, walletId, setTransaction);
  
          case "This month":
            return getTransactionThisMonth(idUser, walletId, setTransaction);
  
          case "Custom":
            return customDateSweetAlert();
  
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

  } catch (error) {
    console.error('Error getting document',error.message);
  }
}

const getTransactionLastMonth = async (idUser, walletId, setTransaction) => {
  try {
    const today = new Date() ;
    const lastMonth = new Date(today);
    lastMonth.setDate(today.getDate()-30)
    const startOfMonth = new Date(lastMonth.setHours(0,0,0,0));
    const endOfMonth = new Date(today.setHours(23, 59, 59, 999));

    await getDocsFilterdTransactions(idUser, startOfMonth, endOfMonth, walletId, setTransaction);
    
  } catch (error) {
    console.error('Error getting document',error.message);
  }
}

const getTransactionThisMonth = async (idUser, walletId, setTransaction) => {
  try {
    const today = new Date();
    const firstDayInMonth = new Date(today);
    firstDayInMonth.setDate(1);
    const startOfFirstDay = new Date(firstDayInMonth.setHours(0,0,0,0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));
    
    await getDocsFilterdTransactions(idUser, startOfFirstDay, endOfDay, walletId, setTransaction);

  } catch (error) {
    console.error(error.message);
  }
}