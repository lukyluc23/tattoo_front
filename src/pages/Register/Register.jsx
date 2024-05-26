import {
  Avatar,
  Button,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Link,
  Typography,
} from "@mui/material";
import InputC from "../../components/InputC/InputC";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import "./Register.css";
import {
  AccountCircle,
  KeyOutlined,
  MailOutline,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerNewUserCall } from "../../services/apiCalls";
// import { inputValidator } from "../../utils/validators";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const [credentials, setCredentials] = useState({
    firstName: "",
    email: "",
    password: "",
  });

  const [msg, setMsg] = useState("");

  const inputHandler = (e) => {
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const registerMe = async () => {
    const answer = await registerNewUserCall(credentials);
    console.log(answer);
    setMsg(answer.data.message);

    if (answer.data.email) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };
  return (
    <>
      <div className="register-container">
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Crear Cuenta
        </Typography>
        <InputC
          inputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          className="register-input"
          name="name"
          label="Nombre"
          variant="standard"
          onChange={(e) => inputHandler(e)}
          color="primary"
        />

        <InputC
          inputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MailOutline />
              </InputAdornment>
            ),
          }}
          className="register-input"
          name="email"
          label="Email"
          variant="standard"
          onChange={(e) => inputHandler(e)}
        />

        <Grid item xs={10} md={12}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="outlined-adornment-password">
              Contraseña
            </InputLabel>

            <Input
              className="register-input"
              name="password"
              onChange={(e) => inputHandler(e)}
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              startAdornment={
                <InputAdornment position="start">
                  <KeyOutlined />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? (
                      <VisibilityOff color="primary" />
                    ) : (
                      <Visibility color="primary" />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              label="Contraseña"
            />
          </FormControl>
        </Grid>

        <Button
          className="register-button"
          variant="contained"
          type="subm it"
          sx={{
            color: "white",
            textTransform: "none",
            textShadow: "2px 2px 2px grey",
          }}
          onClick={registerMe}
        >
          Registrarme
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/login" variant="body2">
              Ya tienes una cuenta? Iniciar Sesión
            </Link>
          </Grid>
        </Grid>
      </div>
      <div>{msg}</div>
    </>
  );
};
export default Register;
