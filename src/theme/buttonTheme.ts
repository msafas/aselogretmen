import useTheme from '../contexts/useTheme';

type ThemeType = 'light' | 'dark';

type ButtonVariantType = {
  base: string;
  ghost: string;
  outline: string;
};

type ThemeVariants = {
  [key in ThemeType]: {
    primary: ButtonVariantType;
    success: ButtonVariantType;
    error: ButtonVariantType;
    warning: ButtonVariantType;
    info: ButtonVariantType;
  };
};

type ButtonThemeType = {
  light: ThemeVariants['light'];
  dark: ThemeVariants['dark'];
  size: {
    sm: string;
    md: string;
    lg: string;
  };
  shape: {
    square: string;
    circle: string;
  };
  state: {
    disabled: string;
    loading: string;
  };
};

export const buttonTheme: ButtonThemeType = {
  light: {
    primary: {
      base: 'btn bg-[#ff8800] hover:bg-[#e67a00] text-white border-none',
      ghost: 'btn btn-ghost text-[#ff8800] hover:bg-[#ff8800] hover:text-white',
      outline: 'btn btn-outline border-[#ff8800] text-[#ff8800] hover:bg-[#ff8800] hover:text-white',
    },
    success: {
      base: 'btn-success',
      ghost: 'btn-ghost btn-success',
      outline: 'btn-outline btn-success',
    },
    error: {
      base: 'btn-error',
      ghost: 'btn-ghost btn-error',
      outline: 'btn-outline btn-error',
    },
    warning: {
      base: 'btn-warning',
      ghost: 'btn-ghost btn-warning',
      outline: 'btn-outline btn-warning',
    },
    info: {
      base: 'btn-info',
      ghost: 'btn-ghost btn-info',
      outline: 'btn-outline btn-info',
    },
  },
  dark: {
    primary: {
      base: 'btn bg-[#ff8800] hover:bg-[#e67a00] text-white border-none dark:bg-[#ff8800] dark:hover:bg-[#e67a00]',
      ghost: 'btn btn-ghost text-[#ff8800] hover:bg-[#ff8800] hover:text-white dark:text-[#ff8800] dark:hover:bg-[#ff8800] dark:hover:text-white',
      outline: 'btn btn-outline border-[#ff8800] text-[#ff8800] hover:bg-[#ff8800] hover:text-white dark:border-[#ff8800] dark:text-[#ff8800] dark:hover:bg-[#ff8800] dark:hover:text-white',
    },
    success: {
      base: 'btn-success dark:btn-success',
      ghost: 'btn-ghost btn-success dark:btn-ghost dark:btn-success',
      outline: 'btn-outline btn-success dark:btn-outline dark:btn-success',
    },
    error: {
      base: 'btn-error dark:btn-error',
      ghost: 'btn-ghost btn-error dark:btn-ghost dark:btn-error',
      outline: 'btn-outline btn-error dark:btn-outline dark:btn-error',
    },
    warning: {
      base: 'btn-warning dark:btn-warning',
      ghost: 'btn-ghost btn-warning dark:btn-ghost dark:btn-warning',
      outline: 'btn-outline btn-warning dark:btn-outline dark:btn-warning',
    },
    info: {
      base: 'btn-info dark:btn-info',
      ghost: 'btn-ghost btn-info dark:btn-ghost dark:btn-info',
      outline: 'btn-outline btn-info dark:btn-outline dark:btn-info',
    },
  },
  // Size variants
  size: {
    sm: 'btn-sm',
    md: 'btn-md',
    lg: 'btn-lg',
  },
  // Shape variants
  shape: {
    square: 'btn-square',
    circle: 'btn-circle',
  },
  // State variants
  state: {
    disabled: 'btn-disabled',
    loading: 'btn-loading',
  },
} as const;

// Type definitions for better type safety
export type ButtonVariant = keyof typeof buttonTheme.light;
export type ButtonSize = keyof typeof buttonTheme.size;
export type ButtonShape = keyof typeof buttonTheme.shape;
export type ButtonState = keyof typeof buttonTheme.state;
export type ButtonType = 'base' | 'ghost' | 'outline';

// Helper function to generate button classes
export const getButtonClasses = (
  variant: ButtonVariant = 'primary',
  type: ButtonType = 'base',
  size?: ButtonSize,
  shape?: ButtonShape,
  state?: ButtonState
): string => {
  const { theme } = useTheme();
  const currentTheme = theme as ThemeType;
  const classes = [buttonTheme[currentTheme][variant][type]];
  
  if (size) classes.push(buttonTheme.size[size]);
  if (shape) classes.push(buttonTheme.shape[shape]);
  if (state) classes.push(buttonTheme.state[state]);
  
  return classes.join(' ');
}; 