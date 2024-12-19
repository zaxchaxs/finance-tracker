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

type SelectedCurrValType = {
  code: string;
  symbol: string;
};

export function AddWalletDialog({ isOpen, setIsOpen }: PropsType) {
  const [selectedCurrency, setSelectedCurrency] =
    useState<SelectedCurrValType>();
  const { currUser: user } = useAuth();

  const { postData } = usePostData();

  const form = useForm<z.infer<typeof addWalletSchema>>({
    resolver: zodResolver(addWalletSchema),
    mode: "onChange",
    reValidateMode: "onSubmit",
    shouldFocusError: true,
  });

  const handleCurrencyChange = (e: string) => {
    const selectedCurrVal: SelectedCurrValType = JSON.parse(e);
    setSelectedCurrency(selectedCurrVal);
    form.setValue("currency", e);
  };

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
            onChange={(val) => handleCurrencyChange(val)}
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
            prefix={selectedCurrency?.symbol + " "}
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
            onChange={(val) => form.setValue("icon", val)}
            type="icon"
          />
        )}
      />
    </FormDialog>
  );
}
