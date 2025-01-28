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

type PropsType = {
  isOpen: boolean;
  title: string;
  onAlertClose: () => void;
  description: string;
  confirmText?: string;
  cancelText?: string;
};

export function AlertModal({
  isOpen,
  title,
  description,
  confirmText = "Confirm",
  cancelText,
  onAlertClose
}: PropsType) {

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className={cancelText ?? "hidden"}>
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction onClick={onAlertClose}>
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
