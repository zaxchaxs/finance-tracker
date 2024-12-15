'use client'
import LoaderSection from "@/components/loaders/loaderSection";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TitleSection from "@/components/ui/Title";
import { WalletType } from "@/types/walletTypes";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

type PropsType = {
    wallets: WalletType[]
}
const TransactionReportSection = ({wallets}: PropsType) => {
    const [isShowTransac, setIsShowTransac] = useState(false);
    const [selectedWallet, setSelectedWallet] = useState<string>();
    
    return (
      <div
        className={`w-full flex flex-col items-center font-title shadow-md shadow-gray-400 rounded-lg`}
      >
        <div
          className={`relative w-full rounded-lg overflow-hidden ${
            isShowTransac ? "rounded-b-none" : ""
          }`}
        >
          <div
            className="w-full flex gap-3 items-center cursor-pointer p-4 relative z-10 bg-primary text-lightWhite"
            onClick={() => setIsShowTransac(!isShowTransac)}
          >
            <FontAwesomeIcon
              className="w-2 "
              size="1x"
              icon={faCaretRight}
              rotation={isShowTransac ? 90 : undefined}
            />
            <TitleSection>Current Reports</TitleSection>
          </div>
        </div>

        <div
          className={`w-full rounded-lg rounded-t-none p-4 flex text-secondary text-base flex-col gap-6 font-paragraf font-semibold relative ${
            isShowTransac ? "" : "hidden "
          }`}
        >
          {false ? (
            //   {isGettingData ? (
            <LoaderSection width={"w-14"} />
          ) : wallets?.length === 0 || !wallets ? (
            <div className="flex justify-center items-end w-full text-center py-2">
              <p>{`It seem you don't have a wallet account yet, try creating one.`}</p>
            </div>
          ) : (
            <>
              <div className="w-full flex justify-between items-center">
                <div className="flex items-center bg-foreground rounded-lg">
                  <Select
                    value={selectedWallet}
                    onValueChange={(val) => setSelectedWallet(val)}
                  >
                    <SelectTrigger className="bg-primary ring-black text-lightWhite">
                      <SelectValue placeholder="Select Wallet" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[20rem]">
                      {wallets.map((wallet, idx) => (
                        <SelectItem
                          key={idx}
                          value={wallet.accountId}
                          className="hover:border cursor-pointer rounded-md"
                        >
                          {wallet.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full">
                  Add Transaction
                </Button>
              </div>
              <Tabs defaultValue="today" className="w-full">
                  <TabsList>
                    <TabsTrigger value="today">Today</TabsTrigger>
                    <TabsTrigger value="lastWeek">Last Week</TabsTrigger>
                  </TabsList>
                  <TabsContent value="today">
                    Make changes to your account here.
                  </TabsContent>
                  <TabsContent value="lastWeek">
                    Change your password here.
                  </TabsContent>
                </Tabs>
              {/* <PrimaryButton
                    handleClick={() => setIsShowWallet(!isShowWallet)}
                    text={
                      selectedWallet.name
                        ? selectedWallet.name
                        : isShowWallet
                        ? "Close "
                        : "To:"
                    }
                    type={"secondary"}
                    value={"isShowwallet"}
                  /> */}

              {/* <div
                    className={`${
                      isShowWallet ? "" : "hidden"
                    } flex flex-col gap-2 py-4`}
                  >
                    {walletAcountData.map((e, i) => {
                      const detailsWallet = {
                        accountId: e.accountId,
                        name: e.name,
                      };

                      return (
                        <div
                          onClick={() => handleSelectedWallet(detailsWallet)}
                          key={i}
                          className="cursor-pointer ring-2 ring-secondary w-full rounded-md p-1 px-3 group"
                        >
                          <button className="group-hover:translate-x-3 transition-all ease-in-out duration-200">
                            {e.name}
                          </button>
                        </div>
                      );
                    })}
                  </div> */}

              {/* <div
                    className={`text-secondary font-passionOne w-full justify-between flex flex-col gap-2.5 py-4 ${
                      selectedWallet.accountId ? "" : "hidden"
                    }`}
                  >
                    <input
                      className="bg-transparent w-full py-2 focus:outline-none border-b-2 border-black p-2 rounded-lg"
                      type="date"
                      value={selectedDate}
                      onChange={handleDateChange}
                      name="Test"
                    />
                    <div
                      className={`${
                        selectedType === "income" ? "scale-105" : ""
                      }`}
                    >
                      <PrimaryButton
                        handleClick={handleSelectedType}
                        value={"income"}
                        text={"Income"}
                        type={"primary"}
                      />
                    </div>

                    <div
                      className={`${
                        selectedType === "expanse" ? "scale-105" : ""
                      }`}
                    >
                      <PrimaryButton
                        handleClick={handleSelectedType}
                        value={"expanse"}
                        text={"Expanse"}
                        type={"danger"}
                      />
                    </div>

                    <form
                      className="flex flex-col items-center py-4 gap-3 "
                      onSubmit={handleSubmit}
                    >
                      <InputForm
                        handleChange={handleAmountChange}
                        isRequired={true}
                        name={"Amount"}
                        type={"text"}
                        value={amount}
                        inputMode={"numeric"}
                      />

                      <div className="flex justify-between gap-3 w-full items-center">
                        <InputForm
                          handleChange={handleDescChange}
                          isRequired={false}
                          name={"Description"}
                          type={"text"}
                          value={description}
                        />
                        <div
                          className={`${
                            selectedDate &&
                            selectedWallet.accountId &&
                            selectedType &&
                            amount > 0
                              ? ""
                              : "hidden"
                          }`}
                        >
                          <PrimaryButton
                            handleClick={handleSubmit}
                            text={
                              loadingAddDoc ? (
                                <LoaderLightSection width={"w-7"} />
                              ) : (
                                "Submit"
                              )
                            }
                            type={"primary"}
                            value={"submit"}
                          />
                        </div>
                      </div>
                    </form>
                  </div> */}
            </>
          )}
        </div>
      </div>
    );
};

export default TransactionReportSection;