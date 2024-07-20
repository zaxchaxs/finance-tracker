import { formatRupiah } from "@/utils/formatRupiah";
import Swal from "sweetalert2";
import {
  addDocTransaction,
  addDocWallet,
  deleteWalletDoc,
} from "./firestoreMethods";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export const sweetAlertAddTransac = (
  newData,
  setSelectedDate,
  setSelectedWallet,
  setSelectedType,
  setDescription,
  setAmount
) => {
//   const option = {
//     year: 'numeric', month: '2-digit', day: '2-digit'
// }
  const convertedAmount = formatRupiah(newData.amount);
  const convertedDate = newData.date.toDateString();

  Swal.fire({
    title: "Are you sure?",
    color: "#BBF7D0",
    background: "#059669",
    showCancelButton: true,
    reverseButtons: true,
    confirmButtonText: "Submit",
    confirmButtonColor: "#052E16",
    cancelButtonText: "Cancel",
    cancelButtonColor: "#EF4444",
    html: `
        <p><strong>${
          newData.type === "income" ? "Income: +" : "Expanse: -"
        }</strong>${convertedAmount}</p>
        <p><strong>${newData.type === "income" ? "To:" : "From:"}</strong>  ${
      newData.name
    }</p>
        <p><strong>"${newData.description}"</strong></p>
        <p><strong>${convertedDate}</strong></p>
      `,
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await addDocTransaction(newData.userId, newData);
        Swal.fire({
          title: "Success",
          color: "#BBF7D0",
          icon: "success",
          background: "#059669",
          confirmButtonColor: "#052E16",
        });
      } catch (error) {
        Swal.fire({
          title: "Failed",
          color: "#052E16",
          icon: "error",
          background: "#BBF7D0",
          text: error.message,
          confirmButtonColor: "#059669",
        });
      } finally {
        setSelectedDate("");
        setSelectedWallet("");
        setSelectedType("");
        setDescription("");
        setAmount("");
      }
    }
  });
};

export const sweetAlertAddWallet = (
  newData,
  setIsAddWalletBtnClicked,
  setWalletName,
  setwalletAmount
) => {
  const convertedAmount = formatRupiah(newData.amount);

  Swal.fire({
    title: "Are you sure?",
    color: "#BBF7D0",
    background: "#059669",
    showCancelButton: true,
    reverseButtons: true,
    confirmButtonText: "Submit",
    confirmButtonColor: "#052E16",
    cancelButtonText: "Cancel",
    cancelButtonColor: "#EF4444",
    toast: true,
    html: `
        <p><strong>Name: </strong> ${newData.name}</p>
        <p><strong>Amount: </strong>${convertedAmount}</p>
    `,
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await addDocWallet(newData);
        Swal.fire({
          title: "Success",
          color: "#BBF7D0",
          icon: "success",
          background: "#059669",
          confirmButtonColor: "#052E16",
        });
      } catch (error) {
        Swal.fire({
          title: "Failed",
          color: "#052E16",
          icon: "error",
          background: "#BBF7D0",
          text: error.message,
          confirmButtonColor: "#059669",
        });
      }
      setIsAddWalletBtnClicked(false);
      setWalletName("");
      setwalletAmount("");
    }
  });
};

export const sweetAlertDeleteWallet = (data) => {
  const convertedAmount = formatRupiah(data.amount);

  Swal.fire({
    title: "Are you sure?",
    color: "#BBF7D0",
    background: "#059669",
    showCancelButton: true,
    reverseButtons: true,
    confirmButtonText: "Yes",
    confirmButtonColor: "#052E16",
    cancelButtonText: "Cancel",
    cancelButtonColor: "#EF4444",
    html: `
          <p><strong>Name: </strong> ${data.name}</p>
          <p><strong>Amount: </strong>${convertedAmount}</p>
      `,
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await deleteWalletDoc(data.accountId, data.userId);
        Swal.fire({
          title: "Success",
          color: "#BBF7D0",
          icon: "success",
          background: "#059669",
          confirmButtonColor: "#052E16",
        });
      } catch (error) {
        Swal.fire({
          title: "Failed",
          color: "#052E16",
          icon: "error",
          background: "#BBF7D0",
          text: error.message,
          confirmButtonColor: "#059669",
        });
      }
    }
  });
};

export const failedSweetAlert = (message) => {
  Swal.fire({
    title: "Failed",
    color: "#052E16",
    icon: "error",
    background: "#BBF7D0",
    text: message,
    confirmButtonColor: "#059669",
  })
}

export const successSignupSweetAlert = () => {
  Swal.fire({
    title: "Success",
    color: "#BBF7D0",
    icon: "success",
    background: "#059669",
    confirmButtonColor: "#052E16",
  }).then(result => {
    if(result.isConfirmed) {
      window.location.href = '/login';
    }
  })
}

export const customDateSweetAlert = () => {
  Swal.fire({
    title: "Select Date",
    color: "#BBF7D0",
    background: "#059669",
    confirmButtonColor: "#052E16",
    input: "date",
    didOpen: () => {
      
    }
  }).then(result => {
    if(result.isConfirmed) {
      const test = "";
    }
  })
}

export const SideSweetAlertSuccess = () => {
  return toast("testing");

  Swal.fire({
    title: 'Hello World!',
    text: 'This is a SweetAlert2 message.',
    icon: 'success',
    position: 'top-end',
    toast: true,
    showConfirmButton: false,
    timer: 3000
  });
}