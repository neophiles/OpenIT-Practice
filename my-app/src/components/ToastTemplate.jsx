import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";

function ToastTemplate({ toastInfo }) {
  const toast = useToast();

  useEffect(() => {
    if (!toastInfo) return;

    const id = toastInfo.title;

    if (!toast.isActive(id)) {
      toast({
        id,
        title: toastInfo.title,
        description: toastInfo.description,
        status: "success",
        duration: 5000,
        position: "bottom-left",
      });
    }
  }, [toastInfo, toast]);

  return null;
}

export default ToastTemplate;
