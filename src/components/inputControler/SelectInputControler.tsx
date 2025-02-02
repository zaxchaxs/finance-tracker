import { SelectDataType } from "@/types/common";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { SelectProps } from "@radix-ui/react-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Image from "next/image";
import { cn } from "@/lib/utils";


interface SelectInputControllerProps extends SelectProps {
  label: string;
  description?: string;
  placeholder: string;
  items: SelectDataType[];
  field: any;
  disabled?: boolean;
  loading?: boolean;
  isRequired?: boolean;
  type?: "icon";
  className?: string;
}

const SelectInputControler = ({
  label,
  description,
  placeholder,
  items,
  field,
  loading,
  isRequired = true,
  disabled,
  type,
  className,
  ...restProps
}: SelectInputControllerProps) => {
  return (
    <FormItem className={cn("w-full relative", className)}>
      <FormLabel className="font-bold text-sm sm:text-base">{label}</FormLabel>
      <Select
        defaultValue={field.value}
        onValueChange={field.onChange}
        value={field.value}
        disabled={disabled}
        {...restProps}
      >
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
        </FormControl>
        <SelectContent className="bg-white max-h-[20rem]">
          {loading && <SelectItem value="loading">Loading...</SelectItem>}
          {type === "icon"
            ? items.map((item, key) => (
                <SelectItem
                  key={key}
                  value={item.value}
                  className="hover:border cursor-pointer rounded-md"
                >
                  <Image
                    width={30}
                    height={30}
                    src={item.iconPath}
                    alt={item.label}
                  />
                </SelectItem>
              ))
            : items.map((item, key) => (
                <SelectItem
                  key={key}
                  value={item.value}
                  className="hover:border cursor-pointer rounded-md"
                >
                  {item.label}
                </SelectItem>
              ))}
        </SelectContent>
      </Select>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
};

export default SelectInputControler;
