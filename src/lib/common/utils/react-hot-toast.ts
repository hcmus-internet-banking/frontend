import toast from "react-hot-toast";

export const noToastErrorOption = {
  error: {
    style: { display: "none" },
  },
};

export const toastNotify = (message: string) => {
  toast(message, {
    icon: "👋",
    style: {
      background: "#333",
      // yellow
      color: "#fde68a",
    },
  });
};
