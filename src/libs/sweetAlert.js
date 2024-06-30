import { formatRupiah } from "@/utils/formatRupiah";
import Swal from "sweetalert2"

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
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
            title: "Success",
            color: "#BBF7D0",
            icon: "success",
            background: "#059669",
            confirmButtonColor: "#052E16",
        });
        setSelectedDate("");
        setSelectedWallet("");
        setSelectedType("");
        setDescription("");
        setAmount("");
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
  }).then(result => {
    if(result.isConfirmed) {
      Swal.fire({
        title: "Success",
        color: "#BBF7D0",
        icon: "success",
        background: "#059669",
        confirmButtonColor: "#052E16",
      });
      setIsAddWalletBtnClicked(false);
      setWalletName("");
      setwalletAmount("");
    }
  }) 
}