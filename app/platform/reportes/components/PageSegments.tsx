"use client";

import React, { useEffect, useState } from "react";

import { UsersModel } from "../../../../models/users";
import { TypeSpend } from "../../../../enums/type-spend";
import { PaymentSaving } from "../../../../models/finances";

import Header from "./Header";
import Mount from "./Mount";
import ReportDonutChartTwo from "./ReportDonutChartTwo";

import { useGlobalStore } from "@/store/StoreProvider";
import {
  getDataFromCollectionsByEmail,
  getUserByEmail,
} from "@/services/firebase/database/user-queries";

const PageSegments = () => {
  const { userEmail } = useGlobalStore();

  const usuarioPrueba: string = "Test";
  const actualAmount = 100;
  const initDate = new Date("2024-03-21");
  const endDate = new Date("2024-02-18");
  const emptyUser: UsersModel = {
    id: "",
    email: "",
    username: "",
  };

  const [userData, setUserData] = useState<UsersModel | any>(emptyUser);
  const [dataExpensess, setDataExpensess] = useState<any>([]);

  const getOneUserData = async () => {
    const user = (await getUserByEmail(userEmail)) || emptyUser;

    if (user) {
      setUserData(user);
    }

    await getSavings();
  };

  const getSavings = async () => {
    const dataGastos = await getDataFromCollectionsByEmail(userEmail, "gastos");
    const dataIngresos = await getDataFromCollectionsByEmail(
      userEmail,
      "ingresos",
    );

    const sumGastosRequeridos = dataGastos?.reduce((a, b) => {
      if (b.tipo === TypeSpend.REQUIRED) {
        return a + b.monto;
      }
    }, 0);

    const sumGastosAdicionales = dataGastos?.reduce((a, b) => {
      if (b.tipo === TypeSpend.ADDITIONAL) {
        return a + b.monto;
      }
    }, 0);

    const sumIngresos = dataIngresos?.reduce((a, b) => a + b.monto, 0);

    const formatData = [
      {
        label: PaymentSaving.SAVING,
        value: sumIngresos - (sumGastosAdicionales + sumGastosRequeridos),
        color: "#2563eb",
        cutout: "50%",
      },
      {
        label: PaymentSaving.ADDITIONAL_PAYMENT,
        value: sumGastosAdicionales,
        color: "#ef4444",
        cutout: "50%",
      },
      {
        label: PaymentSaving.NECESSARY_PAYMENT,
        value: sumGastosRequeridos,
        color: "#fde047",
        cutout: "50%",
      },
    ];

    setDataExpensess(formatData);
  };

  useEffect(() => {
    getOneUserData();
    alert(`Bienvenido al estado de sus transacciones ${userData.email}`);
  }, []);

  return (
    <div className="flex flex-col w-full">
      <div className="flex self-start flex-col justify-start items-start">
        <Header usuario={usuarioPrueba} />
        <Mount
          actualAmount={actualAmount}
          endDay={endDate}
          initDay={initDate}
        />
      </div>
      <div className="w-[300px] h-[300px]">
        <ReportDonutChartTwo data={dataExpensess} />
      </div>
    </div>
  );
};

export default PageSegments;
