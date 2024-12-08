import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

type PropsType = {
  isOpen: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
};

export function AlertDialogs({
  isOpen,
  title,
  description,
  confirmText = "Confirm",
  cancelText,
}: PropsType) {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(isOpen);
  return (
    <AlertDialog open={isDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className={cancelText ?? 'hidden'}>{cancelText}</AlertDialogCancel>
          <AlertDialogAction onClick={() => setIsDialogOpen(!isDialogOpen)}>{confirmText}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
