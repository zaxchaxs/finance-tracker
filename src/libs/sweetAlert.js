import { formatRupiah } from "@/utils/formatRupiah";
import Swal from "sweetalert2"
import { addDocTransaction, addDocWallet } from "./firestoreMethods";
import { useState } from "react";

export const sweetAlertAddTransac = (newData, setSelectedDate, setSelectedWallet, setSelectedType, setDescription, setAmount ) => {
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
      html: `
        <p><strong>${newData.type === 'income' ? 'Income: +' : 'Expanse: -'}</strong>${convertedAmount}</p>
        <p><strong>${newData.type === 'income' ? 'To:' : 'From:'}</strong>  ${newData.name}</p>
        <p><strong>"${newData.description}"</strong></p>
        <p><strong>${newData.date}</strong></p>
      `,
    }).then( async (result) => {
      if (result.isConfirmed) {
        try {
          await addDocTransaction(newData.userId, newData)
          Swal.fire({
              title: "Success",
              color: "#BBF7D0",
              icon: "success",
              background: "#059669",
              confirmButtonColor: "#052E16",
          });
        } catch (error) {
          console.error(error.message);
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
}

export const sweetAlertAddWallet = (newData, setIsAddWalletBtnClicked, setWalletName, setwalletAmount) => {
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
    html: `
        <p><strong>Name: </strong> ${newData.name}</p>
        <p><strong>Amount: </strong>${convertedAmount}</p>
    `
  }).then(async result => {
    if(result.isConfirmed) {
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
  }) 
}