import SelectInputControler from "@/components/inputControler/SelectInputControler";
import TextInputControler from "@/components/inputControler/TextInputControler";
import FormDialog from "@/components/systems/FormDialog";
import { FormField } from "@/components/ui/form";
import { useAuth } from "@/contexts/AuthContext";
import { usePostData, useUpdateData } from "@/hooks/FirestoreApiHooks";
import useToast from "@/hooks/useToast";
import { addTransactionSchema, TransactionType } from "@/types/transactionTypes";
import { WalletType } from "@/types/walletTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type PropsType = {
  wallets: WalletType[];
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};
export default function AddTransactionDialog({
  wallets,
  isOpen,
  setIsOpen,
}: PropsType) {
  const {currUser:user} = useAuth();
  const { postData, loading: loadingPostData } = usePostData();
  const {loading, getDocsReference, updateData} = useUpdateData();
  const { pushToast } = useToast();
  const form = useForm<z.infer<typeof addTransactionSchema>>({
    resolver: zodResolver(addTransactionSchema),
    mode: "onChange",
    reValidateMode: "onSubmit",
    shouldFocusError: true,
  });

  const handleSubmitForm = async (values: z.infer<typeof addTransactionSchema>) => {
    const selectedWallet: {
      walletId: string;
      name: string;
    } = JSON.parse(values.walletId);

    const walletDoc = await getDocsReference<WalletType>("user-wallets", [{
      fieldPath: "accountId",
      opStf: "==",
      value: selectedWallet.walletId
    }]);

    if(!walletDoc) {
      pushToast({
        message: "Ops! Wallet not found!",
        isError: true
      })
      return;
    };

    if(values.type === "income") {
      await updateData(walletDoc.ref, {
        balance: walletDoc.data.balance + Number(values.amount)
      });
    } else {
      await updateData(walletDoc.ref, {
        balance: walletDoc.data.balance - Number(values.amount)
      })
    }

    const newData = {
      accountId: selectedWallet.walletId,
      amount: Number(values.amount),
      date: new Date(values.date),
      description: values.description || "",
      type: values.type,
      createdAt: new Date(),
      name: selectedWallet.name,
      userId: user?.uid || "",
      currency: walletDoc.data.currency,
    };

    await postData(newData,`user-transactions/${user?.uid}/transactions`, true);
    
    setIsOpen(false);
    form.reset();
  };

  return (
    <FormDialog
      title="Add New Transactions"
      description="Add new transactions here. Click save when you're done"
      form={form}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onSubmit={handleSubmitForm}
      loading={loading || loadingPostData}
    >
      <FormField
        control={form.control}
        name="walletId"
        render={({ field }) => (
          <SelectInputControler
            items={wallets.map((wallet) => ({
              label: wallet.name,
              value: JSON.stringify({
                walletId: wallet.accountId,
                name: wallet.name
              }),
            }))}
            label="Wallet"
            placeholder="Select Wallet"
            field={field}
          />
        )}
      />
      <div className="flex justify-between items-center gap-2">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <TextInputControler
              {...field}
              className="w-fit"
              label="Date"
              placeholder="Select Date"
              type="date"
              onChange={(val) => form.setValue("date", val.target.value)}
            />
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <SelectInputControler
              items={[
                {
                  type: "income",
                },
                {
                  type: "expanse",
                },
              ].map((type) => ({
                label: type.type,
                value: type.type,
              }))}
              label="Type"
              placeholder="Select Type"
              field={field}
            />
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="amount"
        render={({ field }) => (
          <TextInputControler
            {...field}
            label="Amount"
            placeholder="Amount of transaction"
            type="numeric-currency"
          />
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <TextInputControler
            {...field}
            label="Description"
            placeholder="Description"
          />
        )}
      />
    </FormDialog>
  );
}