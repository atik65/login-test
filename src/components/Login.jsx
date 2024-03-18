"use client";

import { useFormik } from "formik";
import Link from "next/link";
import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";
import * as yup from "yup";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginForm = ({ handleIsLogin }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const { values, errors, touched, handleSubmit, handleChange } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      email: yup.string().email("Invalid email").required("Email is required"),
      password: yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true);

      try {
        const res = await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
          // callbackUrl: `${window.location.origin}/dashboard`,
          // callbackUrl: `/`,
        });
        console.log(res);
        if (res?.status != 200) {
          enqueueSnackbar("Email or Password wrong", {
            variant: "error",
          });
        }

        if (res?.status === 200) {
          enqueueSnackbar("Logged in successfully", {
            variant: "default",
          });

          router.push("/");
        }
      } catch (error) {
        console.log("error = ", error);
        enqueueSnackbar(error.message | "Something went wrong.", {
          variant: "error",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <div className=" px-5 select-none">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col gap-5 mt-5">
          <form onSubmit={handleSubmit}>
            {/* email */}

            <div className="w-full pt-1 border bg-inherit border-[#8D8787]  px-5">
              <label htmlFor="email" className=" text-sm">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full h-[40px]  outline-none bg-inherit  placeholder:font-bold placeholder:text-gray-500"
                placeholder="Enter your email"
                name="email"
                value={values.email}
                onChange={handleChange}
              />

              {errors.email && touched.email && (
                <p className="text-red-500 text-sm pb-1">{errors.email}</p>
              )}
            </div>

            {/* password */}
            <div className="mt-5 w-full pt-1 border bg-inherit border-[#8D8787]  px-5">
              <label htmlFor="password" className=" text-sm">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full h-[40px]  outline-none bg-inherit  placeholder:font-bold placeholder:text-gray-500"
                placeholder="Enter your password"
                name="password"
                value={values.password}
                onChange={handleChange}
              />

              {errors.password && touched.password && (
                <p className="text-red-500 text-sm pb-1">{errors.password}</p>
              )}
            </div>

            <div className="flex justify-center mt-5">
              <button
                disabled={isSubmitting}
                type="submit"
                className="bg-gradient-to-r from-[#C2CE3B] to-[#60BA08] hover:from-[#60BA08] hover:to-[#C2CE3B] w-full h-[70px] text-black font-bold transition-all duration-500 disabled:opacity-50"
              >
                {isSubmitting ? "Loading" : "LOGIN"}
              </button>
            </div>
          </form>
        </div>

        {/* Don't have an account */}

        {/* forgot password */}

        <div>
          <p className="text-white font-bold text-center mt-2">
            <Link
              href={"/forgot-password"}
              className="text-[#C2CE3B] cursor-pointer"
            >
              Forgot Password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
