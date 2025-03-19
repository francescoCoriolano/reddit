import {
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

interface AlertMessageDialogProps {
  onClose: () => void;
  title: string;
  message: string;
  actionLabel?: string;
}

export function AlertMessageDialog({
  onClose,
  title,
  message,
  actionLabel = "Okay",
}: AlertMessageDialogProps) {
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{title}</AlertDialogTitle>
        <AlertDialogDescription>{message}</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogAction onClick={onClose}>{actionLabel}</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
