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
      <h3>   <RiLockPasswordLine style={{ height: 22 }} />  Update Password</h3>
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
      <div className="save_change_btn_wrapper">
        <button
          className="btn"
          onClick={handleUpdatePassword}
          disabled={loading}
        >
          Update Password
        </button>
      </div>
    </div>
  );
};

export default UpdatePassword;