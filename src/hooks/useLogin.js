import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: async (credentials) => {
      const { data } = await axios.post(
        "https://diagnosys-backend-nine.vercel.app/auth/login",
        {
          ...credentials,
          role: "admin",
        }
      );
      return data;
    },
    onSuccess: (data) => {
      const token = data?.rseults?.token;
      if (!token) {
        toast.error("Login failed! No token received.");
        return;
      }

      const payload = JSON.parse(atob(token.split(".")[1]));
      const roleFromToken = payload?.role?.toLowerCase();

      if (roleFromToken !== "admin") {
        toast.error("Access denied! Only admin can login.");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("role", roleFromToken);

      toast.success("Logged in as admin!");

      navigate("/register");
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || "Login failed!";
      toast.error(errorMessage);
    },
  });

  return loginMutation;
}
