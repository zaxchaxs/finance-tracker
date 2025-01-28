import { NumericFormat } from "react-number-format";
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input, InputProps } from "../ui/input";
import { cn } from "@/lib/utils";

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
  ...restProps
}: TextInputControllerProps) => {
  return (
    <FormItem className={cn("w-full relative", className)}>
      <FormLabel className="font-bold text-sm sm:text-base">{label}</FormLabel>
      <FormControl>
        {children ? (
          children
        ) : type === "numeric-currency" ? (
          <NumericFormat 
            value={restProps.value}
            disabled={disabled} 
            prefix={prefix}
            placeholder={placeholder}
            customInput={Input}
            onChange={restProps.onChange}
            inputMode="numeric"
          />
        ) : (
          <Input
            {...restProps}
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