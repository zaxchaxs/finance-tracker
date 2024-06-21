const { addDoc } = require("firebase/firestore");
const { getDocUserById, addUser, addDocWallet, getDocUserWallet, addDocTransaction } = require("../../../libs/firestoreMethods");

const TestingPage = () => {
    
  const addingUser = async () => {
    try {
      const data = {
        userId: "testing123",
        email: "test@gmail.com",
        createdAt: new Date(),
      };
      await addUser(data.userId, data);
      const user = getDocUserById(data.userId);
      if (!user) {
        console.log("Add user : " + "true = " + user.email);
      } else {
        // console.log("Failed add and getting user");
        throw new Error("Failed add and getting user");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const addingUserWallet =  async () => {
    try {
        const newData = {
            accountId : "wallet1",
            userId : "testing123",
            name: "testingNama",
            amount: 50000,
        };

        await addDocWallet(newData);
        const testing = await getDocUserWallet("testing123");
        if(testing){
            console.log(testing);
        } else {
            throw new Error("Failed add and getting waller");
        }

    } catch (error) {
        console.log(error.message);
    }

    const addingIncomeTransaction =  async () => {
        try {
            const newData = {
                transactionId : "transaction1",
                userId : "testing123",
                accountId: "wallet1",
                amount: 50000,
                type: "income",
                date: new Date(),
                desc: "beliuduk"
            };

            await addDocTransaction("testing123", newData);

            const testing = await getDocUserWallet("testing123");

            if(testing.amount > newData.amount){
                console.log(`Transaction success, amount before : ${newData.amount}, after : ${testing.amount}`);
            } else {
                throw new Error("Failed add transaction");
            }
    
        } catch (error) {
            console.log(error.message);
        }

  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-between p-24 text-white">
      <h1>Testing</h1>
      <button onClick={addingUser}>Adding User</button>
      <button onClick={addingUserWallet}>Adding Wallet</button>
      <button onClick={addingIncomeTransaction}>Adding transactions</button>
    </div>
  );
}
};

export default TestingPage;