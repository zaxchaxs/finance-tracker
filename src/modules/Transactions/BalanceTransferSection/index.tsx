"use client";
import SelectInputControler from "@/components/inputControler/SelectInputControler";
import TextInputControler from "@/components/inputControler/TextInputControler";
import LoaderSection from "@/components/loaders/loaderSection";
import { AlertModal } from "@/components/systems/AlertModal";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormField } from "@/components/ui/form";
import TitleSection from "@/components/ui/Title";
import { EXCHANGERATES_EP } from "@/core/endpoints";
import { useUpdateData } from "@/hooks/FirestoreApiHooks";
import useToast from "@/hooks/useToast";
import { ExchangeRateDataType } from "@/types/common";
import {
  addTransactionSchema,
  transferBalanceSchema,
} from "@/types/transactionTypes";
import { WalletType } from "@/types/walletTypes";
import { currencyFormat } from "@/utils/currencyFormat";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type PropsType = {
  wallets: WalletType[];
};

const BalanceTransferSection = ({ wallets }: PropsType) => {
  const [convertedAmount, setConvertedAmount] = useState<number>(0);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertDescription, setAlertDescription] = useState("");
  const { pushToast, dismissToast, updateToast } = useToast();
  const { error, loading, getDocsReference, updateData } = useUpdateData();

  const form = useForm<z.infer<typeof transferBalanceSchema>>({
    resolver: zodResolver(transferBalanceSchema),
    mode: "onChange",
    reValidateMode: "onSubmit",
    shouldFocusError: true,
  });

  const handleSaveClick = async () => {
    const toastId = pushToast({
      message: "Converting amount...",
      isLoading: true,
    });

    try {
      const sourceWallet: WalletType = JSON.parse(
        form.getValues("sourceWalletId")
      );
      const destinationWallet: WalletType = JSON.parse(
        form.getValues("destinationWalletId")
      );
      const amount = Number(form.getValues("amount"));

      if (sourceWallet.balance < amount) {
        updateToast({
          toastId,
          message: `Balance from ${sourceWallet.name} is not enough`,
          isError: true,
        });
        return;
      }

      const response = await fetch(
        `${EXCHANGERATES_EP}/latest/${sourceWallet.currency}`
      );
      const data: ExchangeRateDataType = await response.json();

      const conversionRate =
        data.conversion_rates[`${destinationWallet.currency}`];

      if (!conversionRate) {
        setAlertTitle("Ops! Something wrong!");
        setAlertDescription(
          `Can't convert currency from ${sourceWallet.currency} to ${destinationWallet.currency}. Try again later.`
        );
        setIsAlertOpen(true);
        return;
      }

      const currencyConverted =
        Number(form.getValues("amount")) * conversionRate;
      setConvertedAmount(currencyConverted);

      setAlertDescription(
        `${currencyFormat(amount, sourceWallet.currency)} from ${
          sourceWallet.name
        } will be converted to ${currencyFormat(
          currencyConverted,
          destinationWallet.currency
        )} and transferred to ${destinationWallet.name}.`
      );
      dismissToast();

      setIsDialogOpen(true);
    } catch (error) {
      dismissToast();
      const errorMessage =
        error instanceof Error ? error.message : "Something wrong!";
      console.error(errorMessage);
      setAlertTitle("Error");
      setAlertDescription("Ops! Error converting currency. Try again later!");
      setIsAlertOpen(true); // Open the alert dialog
    }
  };

  const handleSubmit = async () => {
    const toastId = pushToast({
      message: "Loading...",
      isLoading: true,
    });
    const amount = Number(form.getValues("amount"));

    try {
      const sourceWallet: WalletType = JSON.parse(
        form.getValues("sourceWalletId")
      );
      const destinationWallet: WalletType = JSON.parse(
        form.getValues("destinationWalletId")
      );

      const sourceWalletDoc = await getDocsReference<WalletType>(
        "user-wallets",
        [
          {
            fieldPath: "accountId",
            opStf: "==",
            value: sourceWallet.accountId,
          },
        ]
      );
      const destinationWalletDoc = await getDocsReference<WalletType>(
        "user-wallets",
        [
          {
            fieldPath: "accountId",
            opStf: "==",
            value: destinationWallet.accountId,
          },
        ]
      );

      if (!sourceWalletDoc || !destinationWalletDoc) {
        pushToast({
          message: "Ops! It Seems your wallet is not found!",
          isError: true,
        });
        return;
      }

      await updateData(sourceWalletDoc.ref, {
        balance: sourceWalletDoc.data.balance - amount,
      });

      await updateData(destinationWalletDoc.ref, {
        balance: destinationWalletDoc.data.balance + convertedAmount,
      });

      updateToast({
        toastId,
        message: "Success",
      });

      resetFormValue();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something wrong!";
      updateToast({
        toastId,
        message: errorMessage,
        isError: true,
      });
      console.error(errorMessage);
    }
  };

  const resetFormValue = () => {
    form.reset({
      amount: "",
      date: "",
      description: "",
      destinationWalletId: "",
      sourceWalletId: "",
    });
    setAlertTitle("");
    setAlertDescription("");
    setIsAlertOpen(false);
    setIsDialogOpen(false);
    setConvertedAmount(0);
  };

  return (
    <div className="w-full p-4 shadow-md rounded-lg border rounded-t-none">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSaveClick)}
          className="gap-2 flex flex-col"
        >
          <TitleSection className="text-center">Balance Transfer</TitleSection>
          <div className="w-full flex gap-2 items-center justify-between">
            <FormField
              control={form.control}
              name="sourceWalletId"
              render={({ field }) => (
                <SelectInputControler
                  items={wallets.map((wallet) => ({
                    label: wallet.name,
                    value: JSON.stringify(wallet),
                  }))}
                  label="From"
                  placeholder="Select Wallet"
                  field={field}
                />
              )}
            />
            <FormField
              control={form.control}
              name="destinationWalletId"
              render={({ field }) => (
                <SelectInputControler
                  items={wallets.map((wallet) => ({
                    label: wallet.name,
                    value: JSON.stringify(wallet),
                  }))}
                  label="To"
                  placeholder="Select Wallet"
                  field={field}
                />
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <TextInputControler
                {...field}
                label="Date"
                placeholder="Select Date"
                type="date"
                onChange={(val) => form.setValue("date", val.target.value)}
              />
            )}
          />
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
              {false ? <LoaderSection width="w-10" /> : "Save"}
            </Button>
          </div>
        </form>
      </Form>

      <AlertModal
        title={alertTitle}
        description={alertDescription}
        isOpen={isAlertOpen}
        confirmText="Ok"
        onAlertClose={() => setIsAlertOpen(false)}
      />

      <ConfirmSubmitDialog
        title="Are you sure?"
        description={alertDescription}
        isOpen={isDialogOpen}
        onDialogClose={() => setIsDialogOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default BalanceTransferSection;

type DialogPropsType = {
  isOpen: boolean;
  onDialogClose: () => void;
  onSubmit: () => void;
  title: string;
  description: string;
};

const ConfirmSubmitDialog = ({
  title,
  description,
  isOpen,
  onDialogClose,
  onSubmit,
}: DialogPropsType) => {
  return (
    <Dialog open={isOpen} onOpenChange={onDialogClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="w-full justify-between items-center flex">
            <Button
              variant={"destructive"}
              onClick={onDialogClose}
              className="w-fit"
            >
              Cancel
            </Button>
            <Button onClick={onSubmit} className="w-fit">
              Sure
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
