import React, { ButtonHTMLAttributes, FC } from 'react';

type TButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<TButtonProps> = (props) => {
  const { children } = props;
  const classType = 'btn btn-primary';
  return <button {...props}>{children}</button>;
};
