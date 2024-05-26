import {
  Avatar,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import InputC from "../../components/InputC/InputC";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import "./Login.css";
import {
  KeyOutlined,
  MailOutline,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginCall } from "../../services/apiCalls";
import { decodeToken } from "react-jwt";
import { login } from "../../app/slices/userSlice";
export const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const inputHandler = (e) => {
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const loginMe = async () => {
    try {
      const answer = await loginCall(credentials);
      if (answer.data.token) {
        const uDecodificado = decodeToken(answer.data.token);

        const passport = {
          token: answer.data.token,
          decodificado: uDecodificado,
        };

        dispatch(login(passport));

        console.log(passport);
        sessionStorage.setItem("passport", JSON.stringify(passport));

        setTimeout(() => {
          navigate("/profile");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="register-container">
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Iniiciar Sesión
        </Typography>
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
          variant="outlined"
          onChange={inputHandler}
        />

        <Grid item xs={10} md={12}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="outlined-adornment-password">
              Contraseña
            </InputLabel>

            <OutlinedInput
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
          fullWidth
          sx={{
            color: "white",
            textTransform: "none",
            textShadow: "2px 2px 2px grey",
          }}
          onClick={loginMe}
        >
          Iniciar Sesión
        </Button>
        <Button
          variant="contained"
          startIcon={<GoogleIcon />}
          // onClick={goolgeSingIn}
          type="button"
          fullWidth
          sx={{
            color: "white",
            textTransform: "none",
            textShadow: "2px 2px 2px grey",
          }}
        >
          Ingresa con google
        </Button>
        <Typography
          color={"secondary.primary"}
          variant={"h6"}
          mt={1}
          align="center"
        >
          ¿Aun no tienes cuenta?
        </Typography>
        <Button
          variant="contained"
          fullWidth
          onClick={() => navigate("/register")}
          type="button"
          sx={{
            color: "white",
            textTransform: "none",
            textShadow: "2px 2px 2px grey",
          }}
        >
          Registrate
        </Button>
      </div>
    </>
  );
};
