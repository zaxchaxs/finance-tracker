"use client";
import { Button } from "@/components/ui/button";
import { NumericFormat } from "react-number-format";
import DescriptionSection from "@/components/ui/Description";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import TitleSection from "@/components/ui/Title";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { currencyIcons, listCurrency } from "@/core/AppData/currencies";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addWalletSchema } from "@/types/walletTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";
import TextInputControler from "@/components/inputControler/TextInputControler";
import SelectInputControler from "@/components/inputControler/SelectInputControler";

type PropsType = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onSubmit: (values: z.infer<typeof addWalletSchema>) => void;
};

type SelectedCurrValType = {
  code: string;
  symbol: string;
};

export function AddWalletDialog({ isOpen, setIsOpen, onSubmit }: PropsType) {
  const [selectedCurrency, setSelectedCurrency] =
    useState<SelectedCurrValType>();

    const form = useForm<z.infer<typeof addWalletSchema>>({
      resolver: zodResolver(addWalletSchema),
      mode: "onChange",
      reValidateMode: "onSubmit",
      shouldFocusError: true,
    });

  const handleCurrencyChange = (e: string) => {
    const selectedCurrVal: SelectedCurrValType = JSON.parse(e);
    setSelectedCurrency(selectedCurrVal);
    form.setValue("currency", e)
  };

  const handleSubmit = (values: z.infer<typeof addWalletSchema>) => {
    onSubmit(values);
    form.reset();
    setIsOpen(!isOpen);
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader onClick={() => console.log(form.getValues())}>
          <DialogTitle className="text-lg sm:text-xl font-semibold sm:font-bold font-title">
            Add Wallet
          </DialogTitle>
          <DescriptionSection>
            Add new wallet account here. Click save when you&apos;re done
          </DescriptionSection>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="gap-2 flex flex-col">
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
                    value: JSON.stringify({code: currency.code, symbol: currency.symbol}),
                  }))}
                  label="Currency"
                  placeholder="Select Currency"
                  field={field}
                  onChange={val => handleCurrencyChange(val)}
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
                    iconPath: `/assets/icons/wallet/${icon.fileName}`
                  }))}
                  label="Icon"
                  placeholder="Select Icon"
                  field={field}
                  onChange={val => form.setValue("icon", val)}
                  type="icon"
                />
              )}
            />
            <div className="w-full flex items-center mt-4 justify-end">
              <Button type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
        <DialogFooter className="w-full justify-centerflex items-end">
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
