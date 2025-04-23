import { toast } from "react-toastify";

export const notify = (message, type) => {
  const toastType = toast[type] || toast;
  toastType(message, {
    theme: "colored",
    autoClose: 3000,
    position: "top-right",
  });
};
