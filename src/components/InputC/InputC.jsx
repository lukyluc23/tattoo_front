import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function InputC({
  inputProps,
  className,
  name,
  label,
  variant,
  onChange,
  color,
  placeholder,
  fullWidth,
  value,
  isDisabled,
}) {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        InputProps={inputProps}
        className={className}
        name={name}
        label={label}
        variant={variant}
        onChange={(e) => onChange(e)}
        color={color}
        fullWidth={fullWidth}
        placeholder={placeholder}
        value={value}
        isDisabled={isDisabled}
      />
    </Box>
  );
}
