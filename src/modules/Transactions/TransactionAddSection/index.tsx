import SelectInputControler from "@/components/inputControler/SelectInputControler";
import TextInputControler from "@/components/inputControler/TextInputControler";
import LoaderSection from "@/components/loaders/loaderSection";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import TitleSection from "@/components/ui/Title";
import { useAuth } from "@/contexts/AuthContext";
import { usePostData, useUpdateData } from "@/hooks/FirestoreApiHooks";
import useToast from "@/hooks/useToast";
import { addTransactionSchema } from "@/types/transactionTypes";
import { WalletType } from "@/types/walletTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type PropsType = {
  wallets: WalletType[];
};

const TransactionAddSection = ({ wallets }: PropsType) => {
  const { currUser: user } = useAuth();
  const { loading, getDocsReference, updateData } = useUpdateData();
  const { postData } = usePostData();
  const { pushToast } = useToast();

  const form = useForm<z.infer<typeof addTransactionSchema>>({
    resolver: zodResolver(addTransactionSchema),
    mode: "onChange",
    reValidateMode: "onSubmit",
    shouldFocusError: true,
  });

  const handleSubmitForm = async (
    values: z.infer<typeof addTransactionSchema>
  ) => {
    const selectedWallet: {
      walletId: string;
      name: string;
    } = JSON.parse(values.walletId);

    const walletDoc = await getDocsReference<WalletType>("user-wallets", [
      {
        fieldPath: "accountId",
        opStf: "==",
        value: selectedWallet.walletId,
      },
    ]);

    if (!walletDoc) {
      pushToast({
        message: "Ops! Wallet not found!",
        isError: true,
      });
      return;
    }

    if (values.type === "income") {
      await updateData(walletDoc.ref, {
        balance: walletDoc.data.balance + Number(values.amount),
      });
    } else {
      await updateData(walletDoc.ref, {
        balance: walletDoc.data.balance - Number(values.amount),
      });
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

    await postData(
      newData,
      `user-transactions/${user?.uid}/transactions`,
      true
    );
    form.reset({
      amount: "",
      date: "",
      description: "",
      type: "",
      walletId: "",
    });
  };

  return (
    <div className="w-full p-4 shadow-md rounded-lg border rounded-t-none">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmitForm)}
          className="gap-2 flex flex-col"
        >
          <TitleSection className="text-center">
            Add New Transaction
          </TitleSection>
          <FormField
            control={form.control}
            name="walletId"
            render={({ field }) => (
              <SelectInputControler
                items={wallets.map((wallet) => ({
                  label: wallet.name,
                  value: JSON.stringify({
                    walletId: wallet.accountId,
                    name: wallet.name,
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
          <div className="w-full flex items-center mt-4 justify-end">
            <Button type="submit">
              {loading ? <LoaderSection width="w-10" /> : "Save"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TransactionAddSection;
