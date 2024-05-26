import {
  Avatar,
  Box,
  Button,
  InputAdornment,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import "./Profile.css";
import InputC from "../../components/InputC/InputC";
import { AccountCircle, Category, MailOutline } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { inputValidator } from "../../utils/validators";
import { amIAdmin, getUserData } from "../../app/slices/userSlice";
import { bringProfile, updateProfile } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",

    boxShadow: 24,

    p: 4,
  };
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [profileData, setProfileData] = useState({
    firstName: "",
    email: "",
    role: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  // const [errorMessage, setErrorMessage] = useState("");

  //   const useDispatch = useDispatch();

  const myPassport = useSelector(getUserData);
  const token = myPassport.token;

  const inputHandler = (e) => {
    setProfileData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const myProfileData = await bringProfile(token);
      console.log(myProfileData);
      setProfileData(myProfileData);
    };
    fetchProfile();
  }, []);

  const updateProfileHandler = () => {
    if (
      !inputValidator(profileData.name, "firstName") ||
      !inputValidator(profileData.email, "email")
    ) {
      console.log("nombre o email no válidos");
      // setErrorMessage("No se pueden actualizar los datos");
      return;
    }
    try {
      updateProfile(profileData, token);
    } catch (err) {
      console.log(err);
    }
  };
  const handleUpdate = async () => {
    try {
      await updateProfile(profileData, token);
      console.log("usuario actualizado");
      setTimeout(() => {}, 3000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="profile-container">
        <div className="inputs-container">
          <div className="title">
            <Typography component="h1" variant="h5">
              Mi Perfil.
            </Typography>
            <Stack direction="row" spacing={2}>
              <Avatar sx={{ bgcolor: deepPurple[500] }}>PF</Avatar>
            </Stack>
          </div>

          <InputC
            inputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            className="register-input"
            name="firstName"
            label="Nombre"
            variant="standard"
            onChange={inputHandler}
            color="primary"
            value={profileData.firstName}
            isDisabled={!isEditing}
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
            onChange={inputHandler}
            value={profileData.email}
            isDisabled={!isEditing}
          />
          <InputC
            inputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Category />
                </InputAdornment>
              ),
            }}
            className="register-input"
            name="Role"
            label="Role"
            variant="standard"
            onChange={inputHandler}
            value={profileData.role.name}
            isDisabled="disabled"
          />
          <Button
            className="register-button"
            variant="contained"
            type="subm it"
            sx={{
              color: "white",
              textTransform: "none",
              textShadow: "2px 2px 2px grey",
            }}
            onClick={handleOpen}
          >
            Modificar
          </Button>

          {amIAdmin ? (
            <Button variant="contained" onClick={() => navigate("/admin")}>
              Dashboard
            </Button>
          ) : (
            <p></p>
          )}
          <div className="button-container">
            {isEditing ? (
              <div className="button-container">
                <button onClick={() => updateProfileHandler()}>Guardar</button>
                <button onClick={() => setIsEditing(false)}>Cancelar</button>
              </div>
            ) : (
              <>
                {" "}
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <InputC
                      inputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircle />
                          </InputAdornment>
                        ),
                      }}
                      className="register-input"
                      name="firstName"
                      label="Nombre"
                      variant="standard"
                      onChange={inputHandler}
                      color="primary"
                      value={profileData.firstName}
                      isDisabled={!isEditing}
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
                      onChange={inputHandler}
                      value={profileData.email}
                      isDisabled={!isEditing}
                    />
                    <InputC
                      inputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Category />
                          </InputAdornment>
                        ),
                      }}
                      className="register-input"
                      name="Role"
                      label="Role"
                      variant="standard"
                      onChange={inputHandler}
                      value={profileData.role.name}
                      isDisabled="disabled"
                      color="warning"
                    />
                    <div className="button-container">
                      <Button variant="contained" onClick={handleClose}>
                        Cancelar
                      </Button>
                      <Button variant="contained" onClick={handleUpdate}>
                        Guardar cambios
                      </Button>
                    </div>
                  </Box>
                </Modal>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
