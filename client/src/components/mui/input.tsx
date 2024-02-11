import * as React from 'react';
import { Box, styled } from '@mui/system';
import { Input as BaseInput, InputProps, inputClasses } from '@mui/base/Input';

const Input = React.forwardRef(function CustomInput(
    props: InputProps,
    ref: React.ForwardedRef<HTMLDivElement>,
) {
    const { slots, ...other } = props;
    return (
        <BaseInput
            slots={{
                root: InputRoot,
                input: InputElement,
                ...slots,
            }}
            {...other}
            ref={ref}
        />
    );
});

export default function InputAdornments(
    { Label, Value, onChange, ...props }: { Label: string; Value: number; onChange: any; }
) {
    return (
        <Box>
            <Input
                startAdornment={
                    <InputAdornment>
                        {Label}
                    </InputAdornment>
                }
                value={Value}
                onChange={onChange}
                {...props}
            />
        </Box>
    );
}


const InputRoot = styled('div')(
    () => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 400;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;


  &.${inputClasses.focused} {
    background: rgba(0, 0, 0, 0.05);
  }

  &:hover {
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);

const InputElement = styled('input')(
    () => `
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
  flex-grow: 1;
  background: inherit;
  border: none;
  border-radius: inherit;
  padding: 8px 12px;
  outline: 0;
`,
);

const InputAdornment = styled('div')`
  margin: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;