"use client";

import React, { useState } from "react";
import { Spacer, Divider, Card } from "@nextui-org/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import FormInput from "@/components/FormInput";
import { useGlobalStore } from "@/store/StoreProvider";
import { VALIDATORS_LOGIN } from "@/data/validators";
import { LoginFormModel } from "@/models/login";
import { signIn, signInWithGoogle } from "@/services/firebase/auth";

const FormLogin = () => {
  const { userEmail, setUserEmail, setAuth } = useGlobalStore();
  const { control, handleSubmit } = useForm<LoginFormModel>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(VALIDATORS_LOGIN),
  });

  const [error, setError] = useState(false);

  const router = useRouter();

  const whensubmit = async (data: FieldValues) => {
    const { email, password } = data;
    const gottenUser = await signIn(email, password);

    if (!gottenUser) {
      setError(true);

      return;
    }
    setUserEmail(email);
    setAuth(true);
    router.push("/platform");
  };

  return (
    <Card className="w-full h-full flex justify-center items-center">
      <form
        className="w-max-content bg-white rounded-lg shadow md:mt-0
          sm:max-w-md xl:p-0 dark:bg-gray-800 flex
          flex-col items-center"
        onSubmit={handleSubmit((data) => whensubmit(data))}
      >
        <h3>Login</h3>
        <FormInput
          control={control}
          name={"email"}
          placeholder={"email@domain.x"}
          type={"text"}
        />
        <Spacer y={1} />
        <div className="w-full">
          <FormInput
            control={control}
            isPassword={true}
            name={"password"}
            placeholder={"********"}
            type={"text"}
          />
        </div>
        <Spacer y={1} />
        <Divider />
        <Spacer y={1} />
        <button
          className="text-white bg-red-600
                  hover:bg-red-500 active:bg-red-700 font-medium
                  rounded-lg text-sm px-5 py-2.5 text-center inline-flex
                  items-center shadow-md w-full justify-center mt-2"
          type="button"
        >
          Ingresar
        </button>
        <button
          className="text-white bg-sky-600
                  hover:bg-sky-500 active:bg-sky-700 font-medium
                  rounded-lg text-sm px-5 py-2.5 text-center inline-flex
                  items-center shadow-md w-full justify-center mt-2"
          type="button"
          onClick={signInWithGoogle}
        >
          <svg
            aria-hidden="true"
            className="w-4 h-4 mr-2"
            fill="currentColor"
            viewBox="0 0 18 19"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841
                      8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7
                      2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882
                      5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0
                      5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088
                      1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
              fillRule="evenodd"
            />
          </svg>
          Ingresar con Google
        </button>
      </form>
    </Card>
  );
};

export default FormLogin;
