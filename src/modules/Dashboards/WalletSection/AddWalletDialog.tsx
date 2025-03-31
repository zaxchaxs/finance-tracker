"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { currencyIcons, listCurrency } from "@/core/AppData/currencies";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addWalletSchema, WalletType } from "@/types/walletTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "@/components/ui/form";
import TextInputControler from "@/components/inputControler/TextInputControler";
import SelectInputControler from "@/components/inputControler/SelectInputControler";
import FormDialog from "@/components/systems/FormDialog";
import { usePostData } from "@/hooks/FirestoreApiHooks";
import { useAuth } from "@/contexts/AuthContext";
import { v4 as uuidv4 } from "uuid";

type PropsType = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export function AddWalletDialog({ isOpen, setIsOpen }: PropsType) {
  const { currUser: user } = useAuth();
  const { postData, loading } = usePostData();

  const form = useForm<z.infer<typeof addWalletSchema>>({
    resolver: zodResolver(addWalletSchema),
    mode: "onChange",
    reValidateMode: "onSubmit",
    shouldFocusError: true,
  });

  const handleSubmitForm = (values: z.infer<typeof addWalletSchema>) => {
    const newData: WalletType = {
      ...values,
      userId: user?.uid || "",
      accountId: uuidv4(),
      createdAt: new Date().toDateString(),
      balance: Number(values.balance.split(" ")[1]),
      currency: JSON.parse(values.currency).code,
      isPinned: false,
    };
    postData(newData, "user-wallets");
    form.reset();
    setIsOpen(!isOpen);
  };

  return (
    <FormDialog
      title="Add Wallet"
      description="Add new wallet account here. Click save when you're done"
      form={form}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onSubmit={handleSubmitForm}
      loading={loading}
    >
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <TextInputControler
            {...field}
            label="Name"
            placeholder="Wallet Name"
          />
        )}
      />
      <FormField
        control={form.control}
        name="currency"
        render={({ field }) => (
          <SelectInputControler
            items={listCurrency.map((currency) => ({
              label: currency.name,
              value: JSON.stringify({
                code: currency.code,
                symbol: currency.symbol,
              }),
            }))}
            label="Currency"
            placeholder="Select Currency"
            field={field}
          />
        )}
      />
      <FormField
        control={form.control}
        name="balance"
        render={({ field }) => (
          <TextInputControler
            {...field}
            label="Balance"
            placeholder={
              form.getValues("currency")
                ? `Wallet Balance`
                : "Select Currency First"
            }
            type="numeric-currency"
            prefix={form.getValues("currency") ? `${JSON.parse(form.getValues("currency")).symbol} ` : ""}
            disabled={form.getValues("currency") ? false : true}
          />
        )}
      />
      <FormField
        control={form.control}
        name="icon"
        render={({ field }) => (
          <SelectInputControler
            items={currencyIcons.map((icon) => ({
              label: icon.fileName,
              value: icon.fileName,
              iconPath: `/assets/icons/wallet/${icon.fileName}`,
            }))}
            label="Icon"
            placeholder="Select Icon"
            field={field}
            type="icon"
          />
        )}
      />
    </FormDialog>
  );
}
