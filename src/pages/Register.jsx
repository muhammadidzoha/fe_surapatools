"use client";
import { Label } from "../components/ui/Label";
import { Input } from "../components/ui/input";
import { cn } from "../../lib/utils";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import axios from "axios";
import { Select } from "../components/ui/Select";

export function Register({ onClick, setIsRegis }) {
  const roleOptions = [
    { label: "CS/Teller/Sales", value: "7f831932-ad9e-4e44-b91d-0f4bfbff84bf" },
    {
      label: "Professional Sales",
      value: "dfcb6dfb-05fa-4cf3-ab89-3ced8189455e",
    },
    {
      label: "Supporting Sales",
      value: "ee7b06de-f17f-4be3-bac5-611d130afa47",
    },
  ];

  const onSubmit = async (values) => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const handleLoading = delay(1000);

    toast.promise(
      handleLoading.then(() =>
        axios.post("http://localhost:1234/api/auth/register", values)
      ),
      {
        pending: "Registering...",
        success: {
          render(response) {
            localStorage.setItem(
              "user",
              JSON.stringify(response.data.data.data)
            );
            return response.data.data.message;
          },
          onClose: () => {
            setIsRegis(false);
          },
        },
        error: {
          render(response) {
            return response.data.response.data.message;
          },
          onClose: () => {
            setIsRegis(false);
          },
        },
      }
    );
  };

  const { values, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      username: "",
      password: "",
      roleId: "",
    },
    onSubmit,
  });

  console.log(values);

  return (
    <div className="shadow-input mx-auto w-full max-w-sm rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black ">
      <h2 className="text-xl font-bold text-center text-neutral-800 dark:text-neutral-200">
        Welcome to Surapatools
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2"></div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            placeholder="mandiribandung"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Select id="roleId" onChange={handleChange} onBlur={handleBlur}>
            <option value="">Select Role</option>
            {roleOptions.map((role) => (
              <option key={role.value} value={role.value}>
                {role.label}
              </option>
            ))}
          </Select>
        </LabelInputContainer>

        <div className="flex flex-col space-y-4">
          <button
            className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] cursor-pointer"
            type="submit"
          >
            Sign Up &rarr;
            <BottomGradient />
          </button>
          <button
            className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] cursor-pointer"
            type="button"
            onClick={onClick}
          >
            &larr; Back
            <BottomGradient />
          </button>
        </div>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
