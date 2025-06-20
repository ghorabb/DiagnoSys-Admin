import { useForm } from "react-hook-form";
import { useRegister } from "../../hooks/useRegister";

const roles = ["doctor", "receptionist", "laboratory", "radiology"];
const genders = ["male", "female"];

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const password = watch("password");

  const registerMutation = useRegister();

  function onSubmit(data) {
    registerMutation.mutate(data, {
      onSuccess: () => {
        reset();
      },
    });
  }

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-100 px-4">
      <div className="w-full max-w-md md:max-w-lg lg:max-w-xl bg-white p-6 md:p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center">Register New Staff</h2>
        <p className="text-gray-500 text-center mb-4">
          Only admins can register users
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            {...register("userName", { required: "Username is required" })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-customBlue"
          />
          {errors.userName && (
            <p className="text-red-500">{errors.userName.message}</p>
          )}

          <input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /[^@\s]+@[^@\s]+\.[^@\s]+/,
                message: "Invalid email",
              },
            })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-customBlue"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}

          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-customBlue"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}

          <input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              required: "Confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-customBlue"
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}

          <select
            {...register("role", { required: "Role is required" })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-customBlue"
            defaultValue=""
          >
            <option value="" disabled>
              Select Role
            </option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          {errors.role && <p className="text-red-500">{errors.role.message}</p>}

          <div className="flex gap-4">
            {genders.map((g) => (
              <label key={g} className="flex items-center gap-1">
                <input
                  type="radio"
                  value={g}
                  {...register("gender", { required: "Gender is required" })}
                />
                <span className="capitalize">{g}</span>
              </label>
            ))}
          </div>
          {errors.gender && (
            <p className="text-red-500">{errors.gender.message}</p>
          )}

          <input
            type="text"
            placeholder="Specialization"
            {...register("specialization", {
              required: "Specialization is required",
            })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-customBlue"
          />
          {errors.specialization && (
            <p className="text-red-500">{errors.specialization.message}</p>
          )}

          <input
            type="text"
            placeholder="Phone"
            {...register("phone", { required: "Phone is required" })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-customBlue"
          />
          {errors.phone && (
            <p className="text-red-500">{errors.phone.message}</p>
          )}

          <button
            type="submit"
            className="w-full bg-customBlue text-white py-2 rounded-lg mt-4"
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
