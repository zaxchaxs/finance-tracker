import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

type DialogPropsType = {
  isOpen: boolean;
  onDialogClose: () => void;
  onSubmit: () => void;
  title: string;
  description: string;
  loadingSubmit?: boolean;
  confirmText?: string;
  cancelText?: string;
};

const ConfirmSubmitDialog = ({
  title,
  description,
  isOpen,
  onDialogClose,
  onSubmit,
  loadingSubmit,
  cancelText,
  confirmText,
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
              {cancelText ?? "Cancel"}
            </Button>
            <Button
              onClick={onSubmit}
              className="w-fit"
              disabled={loadingSubmit}
            >
              {confirmText ?? "Save"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmSubmitDialog;