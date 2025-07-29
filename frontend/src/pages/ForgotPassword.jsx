import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearAllUserErrors, forgotPassword } from "../store/slices/userSlice";
import { toast } from "react-toastify";

import { MdOutlineMailOutline } from "react-icons/md";

import "./loader.css"

import { MdOutlineMarkEmailUnread } from "react-icons/md"
import jobsearch from "../assets/jobsearch.bmp"
const ForgotPassword = () => {

    const [email, setEmail] = useState("");


    const { loading, message, error } = useSelector(
        (state) => state.user
    );

    const dispatch = useDispatch();
    const navigateTo = useNavigate();

    const handleForgotPassword = (e) => {
        e.preventDefault();

        if (!email) {
            toast.error("Email is required!")
            return
        }
     

        dispatch(forgotPassword(email));
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearAllUserErrors());
        }
        if (message) {
            navigateTo("/reset/password");
        }
    }, [ error, loading,message]);

    return (
        <>
            <section className="authPage">
                <div className="container login-container">
                    <div className="header">
                        <p style={{ fontSize: 14, color: "red", display: "flex", alignItems: "center", justifyContent: "center" }}><MdOutlineMarkEmailUnread />
                            After clicking submit you will get a token in your email, Plz Copy that token !
                        </p>
                    </div>

                    <form onSubmit={handleForgotPassword}>

                        <div className="inputTag">
                            <label>Email</label>
                            <div>
                                <input
                                    type="email"
                                    placeholder="xyz@gmail.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <MdOutlineMailOutline />
                            </div>
                        </div>

                        <button type="submit" disabled={loading}>
                            {!loading ? <div style={{ display: "flex", justifyContent: "center" }}><div className="loader"></div></div> : "Submit"}

                        </button>
                        <p style={{ color: "grey", fontStyle: "italic", fontSize: 14 }}>Go back to :   
                            <Link style={{ background: "none", border: "none", fontSize: 14, display: "inline" }} to={"/login"}> Login</Link>
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

export default ForgotPassword;