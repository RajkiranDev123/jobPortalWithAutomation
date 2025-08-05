import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  clearAllUpdateProfileErrors,
  updatePassword,
} from "../store/slices/updateProfileSlice";
import { getUser } from "../store/slices/userSlice";
import { FaRegEyeSlash, FaEye } from "react-icons/fa";
import { toast } from "react-toastify";
import { RiLockPasswordLine } from "react-icons/ri";
import "../pages/loader.css"

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);


  const { loading, error, isUpdated } = useSelector(
    (state) => state.updateProfile
  );

  const dispatch = useDispatch();

  const handleUpdatePassword = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("All fields are required!")
      return
    }
    if (newPassword !== confirmPassword) {
      toast.error("New & Confirm Password don't match!")
      return
    }
    const formData = new FormData();
    formData.append("oldPassword", oldPassword);
    formData.append("newPassword", newPassword);
    formData.append("confirmPassword", confirmPassword);
    dispatch(updatePassword(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUpdateProfileErrors());
    }
    if (isUpdated) {
      toast.success("Password Updated");
      dispatch(getUser(true));
      dispatch(clearAllUpdateProfileErrors());
    }
  }, [dispatch, loading, error, isUpdated]);

  return (
    <div className="account_components update_password_component">
      <p style={{
        color: "#0E3386", display: "flex", alignItems: "center"
        , borderRadius: 3, paddingLeft: 3, borderBottom: "2px ridge grey",
        boxShadow: "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset"
      }}>   <RiLockPasswordLine style={{ height: 22 }} />  Update Password</p>
      <div>
        <label>Current Password</label>
        <input
          type={showPassword1 ? "text" : "password"}
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        {showPassword1 ? (
          <FaRegEyeSlash
            className="eye_icon"
            onClick={() => setShowPassword1(!showPassword1)}
          />
        ) : (
          <FaEye
            className="eye_icon"
            onClick={() => setShowPassword1(!showPassword1)}
          />
        )}
      </div>
      <div>
        <label>New Password</label>
        <input
          type={showPassword2 ? "text" : "password"}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        {showPassword2 ? (
          <FaRegEyeSlash
            className="eye_icon"
            onClick={() => setShowPassword2(!showPassword2)}
          />
        ) : (
          <FaEye
            className="eye_icon"
            onClick={() => setShowPassword2(!showPassword2)}
          />
        )}
      </div>
      <div>
        <label>Confirm Password</label>
        <input
          type={showPassword3 ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {showPassword3 ? (
          <FaRegEyeSlash
            className="eye_icon"
            onClick={() => setShowPassword3(!showPassword3)}
          />
        ) : (
          <FaEye
            className="eye_icon"
            onClick={() => setShowPassword3(!showPassword3)}
          />
        )}
      </div>

      {/*  */}
      <button style={{ display: "flex", justifyContent: "center", background: "#2A5792", color: "white", border: "none", borderRadius: 4 }}

        onClick={handleUpdatePassword}

      >
        {" "}
        {isUpdated ? <div style={{ display: "flex", justifyContent: "center" }}><div className="loader"></div></div> : "Update Password"}
      </button>
      {/*  */}
    </div>
  );
};

export default UpdatePassword;