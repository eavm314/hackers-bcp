"use client";

import { Icon } from "@iconify/react";
import { Input } from "@nextui-org/input";
import React, { useState } from "react";
import { Controller } from "react-hook-form";

interface Props {
  control: any;
  label: string;
  name: string;
  type: string;
  placeholder: string;
  isPassword?: boolean;
}

const FormInput = ({
  control,
  label,
  name,
  type,
  placeholder,
  isPassword,
}: Props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const passwordIconStyles: string = `w-8 h-8 ${!showPassword ? "bg-secondary-blue" : "bg-primary-gray"}
                                      rounded-lg border-[1px] flex justify-center items-center`;

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <div key={name}>
          {isPassword ? (
            <div className="h-max w-full flex flex-row justify-between items-center">
              <Input
                className="w-4/5"
                label={label}
                placeholder={placeholder}
                type={showPassword ? "text" : "password"}
                value={value.toString()}
                variant="bordered"
                onBlur={onBlur}
                onChange={onChange}
              />
              <button
                aria-label="Like"
                className={passwordIconStyles}
                color="danger"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <Icon icon="mdi:eye" />
                ) : (
                  <Icon icon="octicon:eye-closed" />
                )}
              </button>
            </div>
          ) : (
            <Input
              label={name}
              placeholder={placeholder}
              type={type}
              value={value.toString()}
              variant="bordered"
              onBlur={onBlur}
              onChange={onChange}
            />
          )}
          {error && (
            <p
              className="w-[85%] text-red-600 my-1 ml-2"
              style={{ fontSize: "12px" }}
            >
              {error.message}
            </p>
          )}
        </div>
      )}
    />
  );
};

export default FormInput;
