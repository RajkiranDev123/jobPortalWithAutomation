import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearAllUserErrors, resetPassword, clearMessage } from "../store/slices/userSlice";
import { toast } from "react-toastify";

import "./loader.css"

import { RiUserSettingsLine } from "react-icons/ri";
import jobsearch from "../assets/jobsearch.bmp"
const ResetPassword = () => {

    const [token, setToken] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const { loading, error, message } = useSelector(
        (state) => state.user
    );

    const dispatch = useDispatch();


    const handleResetPassword = (e) => {
        e.preventDefault();

        if (!token || !newPassword || !confirmNewPassword) {
            toast.error("All fields are  required!")
            return
        }
        if (newPassword !== confirmNewPassword) {
            toast.error("New and Confirm Password dont match!")
            return
        }


        dispatch(resetPassword(token, { newPassword, confirmNewPassword }));
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearAllUserErrors());
        }
        if (message) {
            toast.success(message);
            dispatch(clearMessage());
        }
    }, [error, loading, message]);

    return (
        <>
            <section className="authPage">
                <div className="container login-container">
                    <div className="header">
                        <h3 style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>&nbsp;<RiUserSettingsLine />
                            Reset your password now!
                        </h3>
                    </div>

                    <form onSubmit={handleResetPassword}>

                        <div className="inputTag">
                            <label>Paste your token here!</label>
                            <div>
                                <input
                                    type="password"
                                    placeholder="Token"
                                    value={token}
                                    onChange={(e) => setToken(e.target.value)}
                                />

                            </div>
                        </div>

                        <div className="inputTag">
                            <label>New Password</label>
                            <div>
                                <input
                                    type="password"
                                    placeholder="New Password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />

                            </div>
                        </div>

                        <div className="inputTag">
                            <label>Confirm New Password</label>
                            <div>
                                <input
                                    type="password"
                                    placeholder="Confirm New Password"
                                    value={confirmNewPassword}
                                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                                />

                            </div>
                        </div>

                        <button type="submit" disabled={loading}>
                            {loading ? <div style={{ display: "flex", justifyContent: "center" }}><div className="loader"></div></div> : "Submit"}

                        </button>
                        <p style={{ color: "grey", fontStyle: "italic", fontSize: 14 }}>Go back to  &nbsp;
                            <Link style={{ background: "none", border: "none", fontSize: 14, display: "inline" }} to={"/login"}>Login</Link>
                        </p>
                    </form>
                </div>

                {/* rs */}

                <div style={{
                    borderLeft: "2px solid grey", opacity: 0.8, width: "60%",

                    background: "linear-gradient(159deg, rgba(8,146,208,1) 0%, rgba(75,0,130,1) 100%)",
                    display: "flex", justifyContent: "center", alignItems: "center"
                }}>
                    <p style={{ color: "white", display: "block", padding: 2 }}>console.log("hi, devs!")</p>&nbsp;
                    <img style={{ width: "60%", height: "60%", borderRadius: 210 }} src={jobsearch} alt="js" />
                </div>

                {/*  */}
            </section>
        </>
    );
};

export default ResetPassword;