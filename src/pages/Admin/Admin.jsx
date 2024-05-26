// import TableC from "../../components/TableC/TableC";
import "./Admin.css";

import ListC from "../../components/ListC/ListC";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { bringAllUsersCall, deleteUserById } from "../../services/apiCalls";
import { getUserData } from "../../app/slices/userSlice";
export const Admin = () => {
  const [users, setUsers] = useState([]);
  const [areYouDeletingMe, setAreYouDeletingMe] = useState(null);

  const userReduxData = useSelector(getUserData);
  const token = userReduxData.token;

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await bringAllUsersCall(token);
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    const res = await deleteUserById(id, token);
    console.log(res);
  };

  // Función que inicia el borrado del usuario y muestra u oculta el botón de confirmación
  const deleteUserStepOne = (id) => {
    if (areYouDeletingMe === id) {
      setAreYouDeletingMe(null);
    } else {
      setAreYouDeletingMe(id);
    }
  };
  return (
    <>
      <div className="profile-container">
        <div className="banner">
          <ListC />
        </div>
        <div className="pagination-info">
          {users.length > 0 ? (
            <ul>
              {users.map((user) => {
                return (
                  <li key={user._id} className="flex-row">
                    {user.name} {user.email} {user.role}
                    <div
                      className="delete-button"
                      onClick={() => deleteUserStepOne(user._id)}
                    ></div>
                    <div
                      className={
                        areYouDeletingMe === user._id
                          ? "delete-button confirm-delete "
                          : "delete-button confirm-delete display-none"
                      }
                      onClick={() => deleteUser(user._id)}
                    ></div>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>
      </div>
    </>
  );
};
