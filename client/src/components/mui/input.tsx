import React from 'react';

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    isReversed?: boolean;
    label?: string;
}

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
    ({ isReversed, label, ...props }, ref) => (
        <div
            className={`flex p-2 relative ${isReversed ? 'flex-row-reverse' : 'flex-row'}`}
            ref={ref}
        >
            {label && (
                <div className="sm:mx-2 mx-1 flex items-center justify-center text-blue-700 font-bold">
                    <span>{label}</span>
                </div>
            )}
            <input
                min={0}
                type="number"
                style={{
                    WebkitAppearance: 'none',
                    MozAppearance: 'textfield',
                }}
                className={`bg-transparent py-2 sm:px-2 border-none outline-none transition-colors duration-300 ease-in-out ${isReversed ? 'text-right' : 'text-left ml-1'} appearance-none w-full`}
        {...props}
            />
        </div>
    )
);

CustomInput.displayName = 'CustomInput';

interface InputAdornmentsProps {
    Label: string;
    Value: number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    isReversed?: boolean;
}

// InputAdornments component definition
const InputAdornments: React.FC<InputAdornmentsProps> = ({ Label, Value, onChange, isReversed = false, ...props }) => {
    return (
        <div className="w-full">
            <CustomInput
                label={Label}
                value={Value}
                onChange={onChange}
                isReversed={isReversed}
                {...props}
            />
        </div>
    );
};

export default InputAdornments;
