import Link from "next/link";
import React from "react";

interface DropdownItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface DropdownProps {
  items: DropdownItem[];
}

const Dropdown = ({ items }: DropdownProps) => {
  const buttonStyle =
    "block w-full py-2 text-sm hover:bg-gray200 hover:text-purple100";

  return (
    <div className="absolute top-[17px] right-0 flex flex-col gap-[2px] min-w-[100px] bg-white shadow-lg rounded">
      {items.map((item) =>
        // href가 있으면 Link로 렌더링
        item.href ? (
          <Link
            key={item.label}
            href={item.href}
            onClick={item.onClick}
            className={`${buttonStyle} text-center `}
          >
            {item.label}
          </Link>
        ) : (
          // href가 없으면 버튼으로 렌더링
          <button
            key={item.label}
            onClick={item.onClick}
            className={buttonStyle}
          >
            {item.label}
          </button>
        )
      )}
    </div>
  );
};

export default Dropdown;
