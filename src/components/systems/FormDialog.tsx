import { Dispatch, ReactNode, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";
import { z, ZodType, ZodTypeDef } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import DescriptionSection from "../ui/Description";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { cn } from "@/lib/utils";
import LoaderSection from "../loaders/loaderSection";

type PropsType<TSchema extends ZodType<any, ZodTypeDef, any>> = {
  title: string;
  description: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onSubmit: (values: z.infer<TSchema>) => void;
  form: UseFormReturn<any, any, undefined>;
  children: ReactNode;
  loading?: boolean;
  className?: string;
};

const FormDialog = <TSchema extends ZodType<any, ZodTypeDef, any>> ({
    title,
    description,
    isOpen,
    onSubmit,
    setIsOpen,
    form,
    className,
    loading,
    children,
}: PropsType<TSchema>) => {
    return (
      <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl font-semibold sm:font-bold font-title">
              {title}
            </DialogTitle>
            <DescriptionSection>{description}</DescriptionSection>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className={cn("gap-2 flex flex-col", className)}
            >
              {children}
              <div className="w-full flex items-center mt-4 justify-end">
                <Button type="submit" disabled={loading}>
                  {
                    loading ? (
                      <LoaderSection width="w-10" />
                    ) : "Save"
                  }
                  </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    );
}

export default FormDialog;