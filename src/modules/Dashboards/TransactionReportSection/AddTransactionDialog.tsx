import SelectInputControler from "@/components/inputControler/SelectInputControler";
import TextInputControler from "@/components/inputControler/TextInputControler";
import FormDialog from "@/components/systems/FormDialog";
import { FormField } from "@/components/ui/form";
import { usePostData } from "@/hooks/FirestoreApiHooks";
import { addTransactionSchema } from "@/types/transactionTypes";
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
  const { postData } = usePostData();
  const form = useForm<z.infer<typeof addTransactionSchema>>({
    resolver: zodResolver(addTransactionSchema),
    mode: "onChange",
    reValidateMode: "onSubmit",
    shouldFocusError: true,
  });

  const handleSubmitForm = (values: z.infer<typeof addTransactionSchema>) => {
    console.log(values);
    
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
    >
      <FormField
        control={form.control}
        name="walletId"
        render={({ field }) => (
          <SelectInputControler
            items={wallets.map((wallet) => ({
              label: wallet.name,
              value: wallet.accountId,
            }))}
            label="Wallet"
            placeholder="Select Wallet"
            field={field}
            onChange={(val) => form.setValue("walletId", val)}
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
              onChange={(val) => form.setValue("type", val)}
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