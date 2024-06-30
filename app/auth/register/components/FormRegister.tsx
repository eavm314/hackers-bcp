"use client";

import React, { useState } from "react";
import { Card, Spacer, Spinner, useDisclosure } from "@nextui-org/react";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from "@/services/firebase/instance";
import BackgroundPage from "@/components/BackgroundPage";
import MessageModal from "@/components/MessageModal";
import Title from "@/components/Title";
import FormInput from "@/components/FormInput";
import { useGlobalStore } from "@/store/StoreProvider";
import { signIn } from "@/services/firebase/auth";
import { VALIDATORS_REGISTER } from "@/data/validators";
import { RegisterFormModel } from "@/models/register";
import { createNewUser } from "@/services/firebase/database/user-queries";

const FormRegister = () => {
  const { setUserEmail, setAuth } = useGlobalStore();
  const [formSumbitted, setFormSumbitted] = useState(false);
  const { control, handleSubmit } = useForm<RegisterFormModel>({
    defaultValues: {
      email: "",
      username: "",
      password: "",
      repeated_password: "",
    },
    resolver: zodResolver(VALIDATORS_REGISTER),
  });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const sumbiting = async (data: FieldValues) => {
    const { email, password, repeated_password, username } = data;
    const gottenUser = await signIn(email, password);

    if (gottenUser) {
      onOpen();
      setLoading(false);
      setFormSumbitted(false);

      return;
    }

    if (repeated_password !== password) {
      onOpen();
      setLoading(false);
      setFormSumbitted(false);

      return;
    }

    if (username.length === 0) {
      onOpen();
      setLoading(false);
      setFormSumbitted(false);

      return;
    }

    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);

      await createNewUser({
        email,
        username,
      });

      console.log(user.user.email);
    } catch (error) {
      console.error(error);
      onOpen();
      setLoading(false);
      setFormSumbitted(false);

      return;
    }

    setUserEmail(email);
    setAuth(true);
    alert("El usuario se registro dentro de la app!");
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
          text={"Datos de registro incorrectos o el usuario ya existe"}
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
            <Title size={3} text={"Registro"} />
          </div>
          <div className="w-full">
            <FormInput
              control={control}
              label={"Email"}
              name={"email"}
              placeholder={"email@domain.x"}
              type={"text"}
            />
            <Spacer y={1} />
            <FormInput
              control={control}
              label="Nomre de usuario"
              name={"username"}
              placeholder={"nombre usuario"}
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
            <Spacer y={1} />
            <div className="w-full mt-2">
              <FormInput
                control={control}
                isPassword={true}
                label="Repita la contraseña"
                name={"repeated_password"}
                placeholder={"********"}
                type={"text"}
              />
            </div>
            <Spacer y={1} />
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
            Registrarse
          </button>
          <button
            className="text-white bg-sky-600
                  hover:bg-sky-500 active:bg-sky-700 font-medium
                  rounded-lg text-sm px-5 py-2.5 text-center inline-flex
                  items-center shadow-md w-full justify-center mt-2"
            type="button"
            onClick={() => router}
          >
            Volver
          </button>
        </form>
      </Card>
    </>
  );
};

export default FormRegister;
