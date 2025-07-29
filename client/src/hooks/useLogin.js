import { login } from "../utils/apiPaths";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useLogin = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: login,
    onSuccess: async () => {
      toast.success("Login Successfully");
      // queryClient.invalidateQueries({ queryKey: ["authUser"] });

      await queryClient.refetchQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      // console.log("Response data:", error?.response?.data);
      const errorMsg =
        error?.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(errorMsg);
    },
  });

  return {isPending,error,loginMutation: mutate}
};

export default useLogin;
