import React from 'react';import classNames from 'classnames';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{variant?:'default'|'outline';}
export const Button:React.FC<ButtonProps>=({variant='default',className,...props})=>{
  const base='px-4 py-2 rounded-lg transition-colors disabled:opacity-50';
  const styles={default:'bg-blue-600 hover:bg-blue-700 text-white',outline:'border border-gray-300 hover:bg-gray-50'}[variant];
  return <button className={classNames(base,styles,className)} {...props}/>;
};
