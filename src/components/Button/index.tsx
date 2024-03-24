import React, { PropsWithChildren } from "react";
import { Callback } from "src/utils";

const Button: React.FC<PropsWithChildren<Props>> = ({
  onClick,
  styleClass,
  isLoading = false,
  children,
  isDisable = false,
}) => {
  return (
    <>
      <button
        className={`px-5 py-2 bg-red-800 text-white rounded-lg shadow-lg hover:bg-primaryHover hover:-translate-y-[1px] hover:shadow-2xl ${styleClass}`}
        onClick={onClick}
        style={{ backgroundColor: isDisable ? "grey" : "#811315" }}
        disabled={isLoading || isDisable}
      >
        {isLoading ? (
          <div className="w-9 h-9 border-8 rounded-full border-t-inherit animate-spin border-slate-300"></div>
        ) : (
          children
        )}
      </button>
    </>
  );
};

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  onClick?: Callback;
  styleClass?: string;
  isLoading?: boolean;
  isDisable?: boolean;
};

export default Button;
