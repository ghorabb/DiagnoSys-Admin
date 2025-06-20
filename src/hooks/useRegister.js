// hooks/useRegister.js
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

export function useRegister() {
  return useMutation({
    mutationFn: async (userData) => {
      const token = localStorage.getItem("token");

      const { data } = await axios.post(
        "https://diagnosys-backend-nine.vercel.app/auth/register",
        userData,
        {
          headers: {
            token: `Bearer__${token}`,
          },
        }
      );

      return data;
    },
    onSuccess: () => toast.success("User registered successfully!"),
    onError: (err) => {
      const msg = err?.response?.data?.message || "Registration failed!";
      toast.error(msg);
    },
  });
}
