import { Button } from "@nextui-org/button";
import React, { useState } from "react";
import { Controller } from "react-hook-form";

interface Props {
  control: any;
  name: string;
  placeholder: string;
  style: any;
  multiline?: boolean;
  scrollEnabled?: boolean;
  textAlignVertical?: "center" | "auto" | "top" | "bottom" | undefined;
  number?: boolean;
  isPassword?: boolean;
}

const FormInput = ({
  control,
  name,
  placeholder,
  style,
  multiline = false,
  scrollEnabled = false,
  textAlignVertical = undefined,
  number = false,
  isPassword,
}: Props) => {
  // If it is password
  const [showPassword, setShowPassword] = useState<boolean>(true);

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
        <View key={name}>
          {isPassword ? (
            <View className="h-max w-full flex flex-row justify-between items-center">
              <View className="w-4/5">
                <Button isIconOnly aria-label="Like" color="danger">
                  <HeartIcon />
                </Button>
              </View>
            </View>
          ) : (
            <TextInput
              keyboardType={number ? "number-pad" : "default"}
              multiline={multiline}
              placeholder={placeholder}
              scrollEnabled={scrollEnabled}
              style={style}
              textAlignVertical={textAlignVertical}
              value={value.toString()}
              onBlur={onBlur}
              onChangeText={onChange}
            />
          )}
          {error && (
            <Text className="w-[85%] text-start text-red-600 my-1">
              {error.message}
            </Text>
          )}
        </View>
      )}
    />
  );
};

export default FormInput;
