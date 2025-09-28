export enum ButtonVariants {
  primary = "primary",
  secondary = "secondary",
}

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  buttonText: string;
  variant: ButtonVariants | string; 
  onClickHandler: () => void;
  className?: string;  
  style?: React.CSSProperties;
  
}

const Button = ({ buttonText, variant, onClickHandler }: ButtonProps) => {
  function variantStyles() {
    switch(variant) {
      case ButtonVariants.primary:
        return 'bg-[#5D070D] text-white w-full';
      case ButtonVariants.secondary:
        return 'bg-white text-red-900 border border-green-600';
      default:
        return 'bg-green-600 text-white';
    }
  }

  const variantClass = variantStyles();

  return (
    <button 
      className={`${variantClass} px-[10px] py-[8px] rounded-md cursor-pointer`}
      onClick={onClickHandler}
    >
      {buttonText}
    </button>
  );
};

export default Button;
