"use client";
import {
  getDocUserById,
  addUser,
  addDocWallet,
  getDocUserWallet,
  addDocTransaction,
} from "../../../libs/firestoreMethods";

const TestingPage = () => {

  const addingUser = async () => {
    try {
      const data = {
        userId: "testing123",
        email: "test@gmail.com",
        createdAt: new Date(),
      };
      await addUser(data.userId, data);
      const user = await getDocUserById(data.userId);

      if (user) {
        console.log("Success add and getting user : " + user.data().email);
      } else {
        throw new Error("Failed add and getting user");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const addingUserWallet = async () => {
    try {
      const newData = {
        accountId: "wallet1",
        userId: "testing123",
        name: "testingNama",
        amount: 50000,
      };

      await addDocWallet(newData);

      const testing = await getDocUserWallet("testing123");
      if (testing) {
        console.log(`Success add and getting wallet : ${testing.docs.map(e => e.data().accountId)}`);
      } else {
        throw new Error("Failed add and getting waller");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const addingIncomeTransaction = async () => {
    try {
      const newData = {
        transactionId: "transaction1",
        userId: "testing123",
        accountId: "wallet1",
        amount: 10000,
        type: "income",
        date: new Date(),
        desc: "beliuduk",
      };

      await addDocTransaction("testing123", newData);

      const testing = await getDocUserWallet("testing123");
      const result = testing.docs.find(el => el.data().accountId === "wallet1" && el.data().userId === "testing123").data();

      if (result.amount > newData.amount) {
        console.log(
          `Transaction success, amount before : ${newData.amount}, after : ${result.amount}`
        );
      } else {
        throw new Error("Failed add income transaction, amount of wallet should ++");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const addingExpenseTransaction = async () => {
    try {
      const newData = {
        transactionId: "transaction1",
        userId: "testing123",
        accountId: "wallet1",
        amount: 10000,
        type: "expense",
        date: new Date(),
        desc: "beliuduk",
      };

      await addDocTransaction("testing123", newData);

      const testing = await getDocUserWallet("testing123");
      const result = testing.docs.find(el => el.data().accountId === "wallet1" && el.data().userId === "testing123").data();

      if (result.amount > newData.amount) {
        console.log(
          `Transaction success, amount before : ${newData.amount}, after : ${result.amount}`
        );
      } else {
        throw new Error("Failed add income transaction, amount of wallet should--");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-between p-24 text-white">
      <h1>Testing</h1>
      <button onClick={addingUser}>Adding User</button>
      <button onClick={addingUserWallet}>Adding Wallet</button>
      <button onClick={addingIncomeTransaction}>Adding income transactions</button>
      <button onClick={addingExpenseTransaction}>Adding expense transactions</button>
    </div>
  );
};

export default TestingPage;
