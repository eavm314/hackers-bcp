"use client";

import React, { useState } from "react";
import { Spacer, Card, useDisclosure, Spinner } from "@nextui-org/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";

import BackgroundPage from "../../../../components/BackgroundPage";

import Title from "@/components/Title";
import MessageModal from "@/components/MessageModal";
import FormInput from "@/components/FormInput";
import { useGlobalStore } from "@/store/StoreProvider";
import { VALIDATORS_LOGIN } from "@/data/validators";
import { LoginFormModel } from "@/models/login";
import { signIn } from "@/services/firebase/auth";

const FormLogin = () => {
  const { userEmail, setUserEmail, setAuth } = useGlobalStore();
  const [formSumbitted, setFormSumbitted] = useState(false);
  const { control, handleSubmit } = useForm<LoginFormModel>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(VALIDATORS_LOGIN),
  });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const sumbiting = async (data: FieldValues) => {
    const { email, password } = data;
    const gottenUser = await signIn(email, password);

    if (!gottenUser) {
      onOpen();
      setLoading(false);
      setFormSumbitted(false);

      return;
    }
    setUserEmail(email);
    setAuth(true);
    router.push("/platform");
  };

  const whensubmit = async (data: FieldValues) => {
    if (!formSumbitted) {
      return;
    }
    setLoading(true);
    await sumbiting(data);
    setLoading(false);
  };

  return (
    <>
      {loading && (
        <BackgroundPage>
          <Spinner />
        </BackgroundPage>
      )}
      {isOpen && (
        <MessageModal
          isOpen={isOpen}
          text={"Usuario o contraseña incorrectos"}
          title={"Error"}
          yesAction={() => {}}
          onOpenChange={onOpenChange}
        />
      )}
      <Card className="w-full h-full flex justify-center items-center">
        <form
          className="w-max-content bg-white rounded-lg md:mt-0
          sm:max-w-md xl:p-0 dark:bg-gray-800 flex
          flex-col items-center p-7"
          onSubmit={handleSubmit((data) => whensubmit(data))}
        >
          <div className="mb-5">
            <Title size={3} text={"Login"} />
          </div>
          <div className="w-full">
            <FormInput
              control={control}
              label="Email"
              name={"email"}
              placeholder={"email@domain.x"}
              type={"text"}
            />
            <Spacer y={1} />
            <div className="w-full mt-2">
              <FormInput
                control={control}
                isPassword={true}
                label="Contraseña"
                name={"password"}
                placeholder={"********"}
                type={"text"}
              />
            </div>
          </div>
          <Spacer y={1} />
          <Spacer y={1} />
          <button
            className="text-white bg-red-600
                  hover:bg-red-500 active:bg-red-700 font-medium
                  rounded-lg text-sm px-5 py-2.5 text-center inline-flex
                  items-center shadow-md w-full justify-center mt-5"
            type="submit"
            onClick={() => setFormSumbitted(true)}
          >
            Ingresar
          </button>
          <p
            className="text-sm font-light text-gray-500 dark:text-gray-400
            mb-6 mt-5"
          >
            ¿No tiene una cuenta?{" "}
            <Link
              className="font-medium text-primary-600 hover:underline
            dark:text-primary-500"
              href={"/auth/register"}
            >
              Regístrese aquí
            </Link>
          </p>
        </form>
      </Card>
    </>
  );
};

export default FormLogin;
