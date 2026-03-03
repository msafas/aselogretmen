import React from 'react';
import { getButtonClasses, ButtonVariant, ButtonSize, ButtonShape, ButtonState } from '../../theme/buttonTheme';

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  variant?: ButtonVariant;
  buttonType?: 'base' | 'ghost' | 'outline';
  size?: ButtonSize;
  shape?: ButtonShape;
  state?: ButtonState;
  className?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  buttonType = 'base',
  size,
  shape,
  state,
  className = '',
  children,
  ...props
}) => {
  const buttonClasses = getButtonClasses(variant, buttonType, size, shape, state);
  
  return (
    <button
      className={`${buttonClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button; 