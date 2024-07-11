import { getSnapshotUserTransaction } from "@/libs/firestoreMethods";
import { where } from "firebase/firestore";

export const dateFiltering = (idUser, value, setTransaction) => {
    try {
        switch (value) {
          case "Today":
            return getTransactionToday(idUser, setTransaction)
  
          case "Yesterday":
            return getTransactionYesterday()
  
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
    const today = new Date();
    const conditional = where("date", "==", today);
    await getSnapshotUserTransaction(idUser, setTransaction, conditional)

    const date = today.toLocaleDateString('en-US', {day: 'numeric', month: 'long', year: '2-digit'});

    return date
}

const getTransactionYesterday = () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);


    return yesterday.toLocaleDateString('en-US', {day: 'numeric', month: 'long', year: '2-digit'});
}