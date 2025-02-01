import { NumericFormat } from "react-number-format";
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input, InputProps } from "../ui/input";
import { cn } from "@/lib/utils";
import { LucideEye, LucideEyeOff } from "lucide-react";
import { useState } from "react";

interface TextInputControllerProps extends InputProps {
    label: string;
    description?: string;
    placeholder: string;
    children?: React.ReactNode;
    isRequired?: boolean;
    type?: "number" | "text" | "password" | "email" | "file" | "time" | "date" | "numeric-currency";
    value?: any;
    className?: string;
  }

const TextInputControler = ({
  prefix,
  label,
  description,
  placeholder,
  children,
  type,
  isRequired = true,
  disabled,
  className,
  value = "",
  ...restProps
}: TextInputControllerProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormItem className={cn("w-full relative", className)}>
      <FormLabel className="font-bold text-sm sm:text-base">{label}</FormLabel>
      <FormControl>
        {children ? (
          children
        ) : type === "numeric-currency" ? (
          <NumericFormat
            value={value}
            disabled={disabled}
            prefix={prefix}
            placeholder={placeholder}
            customInput={Input}
            onChange={restProps.onChange}
            inputMode="numeric"
          />
        ) : type === "password" ? (
          <div className="items-center flex h-9 w-full rounded-md border border-input group-focus-visible:ring-1">
            <Input
              {...restProps}
              value={value}
              onChange={restProps.onChange}
              type={showPassword ? "text" : "password"}
              placeholder={placeholder}
              className="border-none focus-visible:ring-0 group"
            />
            <div
              className="flex items-center p-2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <LucideEyeOff /> : <LucideEye />}
            </div>
          </div>
        ) : (
          <Input
            {...restProps}
            value={value}
            onChange={restProps.onChange}
            type={type ?? ""}
            placeholder={placeholder}
          />
        )}
      </FormControl>
      {description && (
        <FormDescription className="text-gray-600 text-sm sm:text-sm md:text-sm">
          {description}
        </FormDescription>
      )}
      <FormMessage />
    </FormItem>
  );
};

export default TextInputControler;