import React from "react";

interface ButtonInterface {
  disabled?: boolean;
  onClick?: () => void;
}

const Button: React.FunctionComponent<ButtonInterface> = ({
  disabled,
  onClick,
  children,
}) => {
  return (
    <button disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
