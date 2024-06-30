import React from "react";

import { formatDateToString } from "../../../../utils/moment-date";

interface Props {
  actualAmount: number;
  initDay: Date;
  endDay: Date;
}

const Mount = ({ actualAmount, initDay, endDay }: Props) => {
  const momentInitDay = formatDateToString(initDay);
  const momentEndDay = formatDateToString(endDay);

  return (
    <div className="flex flex-col justify-start items-start w-full p-1 m-1 bg-transparent">
      <p className="text-3 font-thin m-1">Monto actual: {actualAmount}</p>
      <p className="text-5 font-bold m-1">
        Desde {momentInitDay} hasta {momentEndDay}
      </p>
    </div>
  );
};

export default Mount;
