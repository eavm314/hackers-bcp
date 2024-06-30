"use client";

import React, { useEffect, useState } from "react";

import { getData } from "../../../../services/firebase/database/queries";
import { UsersModel } from "../../../../models/users";

import Header from "./Header";
import Mount from "./Mount";
import ReportDonutChartTwo from "./ReportDonutChartTwo";

import { useGlobalStore } from "@/store/StoreProvider";
import { getUserByEmail } from "@/services/firebase/database/user-queries";
import { PaymentSaving } from "@/models/finances";

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
    gastos: [],
    ingresos: [],
    objetivo_compra: [],
  };

  const [userData, setUserData] = useState<UsersModel | any>(emptyUser);
  const data = [
    {
      label: PaymentSaving.NECESSARY_PAYMENT,
      value: 29,
      color: "#fde047",
      cutout: "50%",
    },
    {
      label: PaymentSaving.ADDITIONAL_PAYMENT,
      value: 11,
      color: "#ef4444",
      cutout: "50%",
    },
    {
      label: PaymentSaving.SAVING,
      value: 60,
      color: "#2563eb",
      cutout: "50%",
    },
  ];

  const getOneUserData = async () => {
    const user = (await getUserByEmail(userEmail)) || emptyUser;

    if (user) {
      setUserData(user);
    }

    const payments = await getSavings();
  };

  const getNecessaryPayments = () => {};

  const getAdditionalPayments = () => {};

  const getSavings = async () => {
    const objetivo_compra = await getData("objetivo_compra");
    const userDataPayments = objetivo_compra.map((item) => {
      if (userData.objetivo_compra.includes(item.id)) {
        return item;
      }
    });

    return userDataPayments;
  };

  useEffect(() => {
    getOneUserData();
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
        <ReportDonutChartTwo data={data} />
      </div>
    </div>
  );
};

export default PageSegments;
