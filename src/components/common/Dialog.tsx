import { XMarkIcon } from "@heroicons/react/24/outline";
import IconButton from "./IconButton";

interface Props {
  children: React.ReactNode;
  open: boolean;
  onClose: Function;
}
export default function Dialog({ children, open, onClose }: Props) {
  if (!open) {
    return <></>;
  }
  return (
    <div className="bg-smoke-light fixed inset-0 z-50 flex overflow-auto">
      <div className="relative m-auto flex w-full max-w-md flex-col rounded-lg bg-slate-50 p-8 shadow-lg dark:bg-gray-700">
        <div>{children}</div>
        <span className="absolute right-0 top-0 p-4">
          <IconButton onClick={() => onClose()}>
            <XMarkIcon className="h-4 w-4" />
          </IconButton>
        </span>
      </div>
    </div>
  );
}
