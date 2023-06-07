import { TextField, Box } from "@mui/material";
import { useId } from "react";

type InputProps = {
  label: string;
  type?: string;
  error?: boolean;
  errorMessage?: string;
  variant?: "standard" | "filled" | "outlined";
  fullwidth?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
} & React.ComponentProps<typeof TextField>;

export function Input({
  label,
  error,
  errorMessage,
  variant = "outlined",
  type = "text",
  fullwidth,
  onChange,
  value,
  ...props
}: InputProps) {
  const id = useId();
  return (
    <Box mb={3}>
      <TextField
        type={type}
        id={id}
        variant={variant}
        label={label}
        fullWidth={fullwidth}
        error={error}
        helperText={error ? errorMessage : ""}
        onChange={onChange}
        value={value}
        {...props}
      />
    </Box>
  );
}
