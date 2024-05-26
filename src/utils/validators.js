export const inputValidator = (inputValue, inputName) => {
  if (inputValue === "") {
    return "este campo es obligatorio";
  }
  if (
    inputName === "password" &&
    (inputValue.length <= 6 || inputValue.length >= 12)
  ) {
    return "la contraseña debe tener de 6 a 12 caracteres";
  }
  if (
    inputName === "email" &&
    (!inputValue.includes("@") || !inputValue.includes("."))
  ) {
    return "introduce un email válido";
  }

  return "";
};
