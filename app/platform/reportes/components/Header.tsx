import React from "react";

interface Props {
  usuario: string;
}

const Header = ({ usuario }: Props) => {
  return (
    <div className="flex flex-col justify-start items-start w-full p-1 m-1 bg-transparent">
      <p className="text-[12px] font-thin m-1">Movimientos realizados</p>
      <p className="text-[14px] font-bold m-1">Bienvenido Usuario {usuario}</p>
    </div>
  );
};

export default Header;
