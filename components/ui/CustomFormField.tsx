import React, { useState } from "react";
import { Control } from "react-hook-form";
import { FormFieldType } from "../AuthForm";
import Image from "next/image";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "./input";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

interface CustomProps {
  control: Control<any>;
  name: string;
  label: string;
  fieldType: FormFieldType;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
}
type E164Number = string;

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  const { fieldType, placeholder, iconSrc, iconAlt } = props;
  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex border rounded-md border-dark-500 bg-dark-400">
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt || "icon"}
              height={24}
              width={24}
              className="ml-2 "
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="US"
            international
            placeholder={placeholder || "Enter phone number"}
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={(value) => field.onChange(value)}
            className="input-phone "
          />
        </FormControl>
      );
    case FormFieldType.PASSWORD:
      const [showPassword, setShowPassword] = useState(false);

      const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

      return (
        <div className="flex border rounded-md border-dark-500 bg-dark-400 items-center">
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt || "icon"}
              height={24}
              width={24}
              className="ml-2 text-white"
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              type={showPassword ? "text" : "password"} // Toggle between password and text
              className="shad-input border-0 flex-1"
            />
          </FormControl>
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="px-3 text-sm text-blue-400 hover:text-blue-300 transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      );

    default:
      break;
  }
};

const CustomFormField = (props: CustomProps) => {
  const { name, label, control } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <RenderField field={field} props={props} />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
