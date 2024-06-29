import { formatRupiah } from "@/utils/formatRupiah";
import Swal from "sweetalert2"

export const sweetAlertAddTransac = (newData) => {
    const convertedAmount = formatRupiah(newData.amount);
    
    Swal.fire({
      title: "Are you sure?",
      color: "#BBF7D0",
      background: "#059669",
      showCancelButton: true,
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
      text: newData.name,
      text: newData.amount,
      text: newData.description,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
            title: "Success",
            color: "#BBF7D0",
            icon: "success",
            background: "#059669",
            confirmButtonColor: "#052E16",
        });
      }
    });
}