import { Bounce, ToastOptions, toast } from "react-toastify";

const commonOptions: ToastOptions = {
  position: "bottom-right",
  autoClose: 10000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  transition: Bounce,
};

export function successToast(message: string) {
  return toast.success(message, commonOptions);
}

export function errorToast(message: string) {
  return toast.error(message, commonOptions);
}
