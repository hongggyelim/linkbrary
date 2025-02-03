import { bindClass } from "@/util/bindClass";
import { ChangeEvent } from "react";

const ModalInput = ({
  placeholder,
  name,
  value,
  onChange,
}: {
  placeholder: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <input
      type="text"
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      className={bindClass(
        "w-full rounded-lg border border-yellow300 py-[18px] px-[15px] mb-6 text-black300",
        "placeholder:text-base placeholder:text-yellow400",
        "focus:outline-1px focus:outline-orange100"
      )}
      placeholder={placeholder}
    ></input>
  );
};

export default ModalInput;
