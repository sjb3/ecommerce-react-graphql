import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { checkUserIsAdmin } from "../../Utils";
import { FaUserLock } from "react-icons/fa";
import "./styles.scss";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

export const AdminToolBar = (props) => {
  const { currentUser } = useSelector(mapState);
  const isAdmin = checkUserIsAdmin(currentUser);

  return (
    <div className="adminToolBar">
      {isAdmin && (
        <ul>
          <li>
            <Link to="/admin">
              <FaUserLock />
              {"  "}Admin
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};
