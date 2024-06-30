"use client";

import React, { useEffect, useState } from "react";
import moment from "moment";

import { UsersModel } from "../../../../models/users";
import { TypeSpend } from "../../../../enums/type-spend";
import { PaymentSaving } from "../../../../models/finances";

import Header from "./Header";
import Mount from "./Mount";
import ReportDonutChartTwo from "./ReportDonutChartTwo";
import UserStatus from "./UserStatus";

import { useGlobalStore } from "@/store/StoreProvider";
import {
  getDataFromCollectionsByEmail,
  getUserByEmail,
} from "@/services/firebase/database/user-queries";

const PageSegments = () => {
  const { userEmail, ginit, gend } = useGlobalStore();

  const usuarioPrueba: string = "Test";
  const actualAmount = 100;
  const [initDate, setInitDate] = useState<any>(ginit);
  const [endDate, setEndDate] = useState<any>(gend);
  const emptyUser: UsersModel = {
    id: "",
    email: "",
    username: "",
  };

  const [userData, setUserData] = useState<UsersModel | any>(emptyUser);
  const [reports, setReports] = useState<any>([]);
  const [gastosAdicionales, setGastosAdicionales] = useState<any[]>([]);
  const [gastosNecesarios, setGastosNecesarios] = useState<any[]>([]);
  const [ahorrosObtenidos, setAhorrosObtenidos] = useState<any[]>([]);

  const [dataExpensess, setDataExpensess] = useState<any>([]);

  const getOneUserData = async () => {
    const user =
      (await getUserByEmail(userEmail || "jsce2021@gmail.com")) || emptyUser;

    if (user) {
      setUserData(user);
    }

    await getSavings();
  };

  const getSavings = async () => {
    const dataGastos: any = await getDataFromCollectionsByEmail(
      userEmail || "jsce2021@gmail.com",
      "gastos",
    );
    const dataIngresos: any = await getDataFromCollectionsByEmail(
      userEmail || "jsce2021@gmail.com",
      "ingresos",
    );

    const sumGastosRequeridos = dataGastos?.reduce((a: any, b: any) => {
      if (b.tipo === TypeSpend.REQUIRED) {
        return a + b.monto;
      } else {
        return a + 0;
      }
    }, 0);

    const sumGastosAdicionales = dataGastos?.reduce((a: any, b: any) => {
      if (b.tipo === TypeSpend.ADDITIONAL) {
        return a + b.monto;
      } else {
        return a + 0;
      }
    }, 0);

    const sumIngresos = dataIngresos?.reduce(
      (a: any, b: any) => a + b.monto,
      0,
    );

    const x = [
      ...dataGastos?.map((gasto: any) => {
        if (gasto.tipo === TypeSpend.REQUIRED) {
          return gasto;
        }
      }),
    ];

    setGastosNecesarios(x);

    const y = [
      ...dataGastos?.filter((gasto: any) => {
        if (gasto.tipo === TypeSpend.ADDITIONAL) {
          return gasto;
        }
      }),
    ];

    setGastosAdicionales(y);

    setAhorrosObtenidos([...dataIngresos]);

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

    const dataToInsert: any[] = [];

    gastosAdicionales.map((gasto) => {
      dataToInsert.push({
        type: TypeSpend.ADDITIONAL,
        amount: gasto.monto,
        init: initDate,
        end: endDate,
        date: moment(new Date()).format("DD-MM-YYYY"),
      });
    });
    setReports(dataToInsert);
  };

  useEffect(() => {
    getOneUserData();
  }, []);

  useEffect(() => {
    // getOneUserData();
    // const dataToInsert: any[] = [];
    // gastosAdicionales.map((gasto) => {
    //   dataToInsert.push({
    //     type: TypeSpend.ADDITIONAL,
    //     amount: gasto.monto,
    //     init: initDate,
    //     end: endDate,
    //     date: moment(new Date()).format("DD-MM-YYYY"),
    //   });
    // });
    // setReports(dataToInsert);
  }, [ginit, gend]);

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row justify-around items-center">
        <div className="flex flex-col">
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
        <UserStatus data={reports} />
      </div>
    </div>
  );
};

export default PageSegments;
