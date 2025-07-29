import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "../utils/apiPaths";

const useSignUp = () => {
  const queryClient = useQueryClient();

  const {mutate, isPending, error} = useMutation({
    mutationFn: signup,
    onSuccess: async () => {
    await queryClient.invalidateQueries({ queryKey: ["authUser"] });
    toast.success("Signup successful!");
    // navigate("/");
  },
  onError: (error) => {
    // console.log("Response data:", error?.response?.data);
    const errorMsg = error?.response?.data?.message || "Something went wrong. Please try again.";
    toast.error(errorMsg);
  },
});

  return {isPending,error,signupMutation: mutate}
};

export default useSignUp;