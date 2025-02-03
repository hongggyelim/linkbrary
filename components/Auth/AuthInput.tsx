import Image from "next/image";
import React, { forwardRef, InputHTMLAttributes, useState } from "react";

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  text: string;
  name: string;
  error?: string;
  type: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ text, name, error, type, value, onChange, ...props }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const toggleClick = () => {
      setIsPasswordVisible((prev) => !prev);
    };

    return (
      <div className="mb-6">
        <label htmlFor={name} className="text-[14px] block mb-[12px]">
          {text}
        </label>
        <div>
          <div className="relative">
            <input
              {...props}
              ref={ref}
              id={name}
              name={name}
              value={value}
              onChange={onChange}
              type={isPasswordVisible && type === "password" ? "text" : type}
              className={`w-full h-[60px] rounded-lg border px-[15px] py-[18px] pr-[40px] outline-orange100 ${
                error ? "border-red-500" : "border-yellow300"
              }`}
            />
            {type === "password" && (
              <Image
                src={
                  isPasswordVisible
                    ? "/icons/eyes_open.svg"
                    : "/icons/eyes_close.svg"
                }
                width={16}
                height={16}
                alt={isPasswordVisible ? "비밀번호 숨기기" : "비밀번호 보기"}
                onClick={toggleClick}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
              />
            )}
          </div>
          {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
        </div>
      </div>
    );
  }
);

AuthInput.displayName = "AuthInput";
export default AuthInput;
