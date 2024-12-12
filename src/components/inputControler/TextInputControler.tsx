import { NumericFormat } from "react-number-format";
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input, InputProps } from "../ui/input";

interface TextInputControllerProps extends InputProps {
    label: string;
    description?: string;
    placeholder: string;
    children?: React.ReactNode;
    isRequired?: boolean;
    type?: "number" | "text" | "password" | "email" | "file" | "time" | "numeric-currency";
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
  ...restProps
}: TextInputControllerProps) => {
  return (
    <FormItem className="w-full relative">
      <FormLabel className="font-bold text-sm sm:text-base">{label}</FormLabel>
      <FormControl>
        {children ? (
          children
        ) : type === "numeric-currency" ? (
          <NumericFormat 
            disabled={disabled} 
            prefix={prefix}
            placeholder={placeholder}
            customInput={Input}
            onChange={restProps.onChange}
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