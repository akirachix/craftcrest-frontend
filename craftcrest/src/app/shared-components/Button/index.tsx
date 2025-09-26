enum ButtonVariants {
    primary = "primary",
    secondary = "secondary",
}

interface ButtonProps {
    buttonText: string, 
    variant: string, 
    onClickHandler: () => void;
}

const Button = ({buttonText, variant, onClickHandler}: ButtonProps) => {

    function variantStyles() {
        switch(variant) {
            case "primary":
                return 'bg-[#5D070D] text-white';
            case "secondary":
                return 'bg-white text-red-900 border border-green-600';
            default:
                return 'bg-green-600 text-white';
        }
    }

    const variantClass = variantStyles();

    return (
        <button 
            className={`${variantClass} px-[16px] py-[8px] rounded-md cursor-pointer`}
            onClick={onClickHandler}
        >
            {buttonText}
        </button>
    );
};

export default Button;