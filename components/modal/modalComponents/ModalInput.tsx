import { bindClass } from "@/util/bindClass";
import { ChangeEvent, KeyboardEvent, useEffect, useRef } from "react";

const ModalInput = ({
  placeholder,
  name,
  value,
  onChange,
  onEnter,
}: {
  placeholder: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onEnter?: () => void;
}) => {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onEnter) {
      onEnter();
    }
  };
  return (
    <input
      ref={ref}
      type="text"
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      onKeyDown={handleKeyDown}
      className={bindClass(
        "w-full rounded-lg border border-orange100 py-[18px] px-[15px] mb-6 text-black300",
        "placeholder:text-base placeholder:text-orange100",
        "focus:outline-1px focus:outline-orange100"
      )}
      placeholder={placeholder}
    ></input>
  );
};

export default ModalInput;
