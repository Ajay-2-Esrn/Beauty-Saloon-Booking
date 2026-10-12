import { useState } from "react";
import axios from 'axios'
import "./loginPage.css";
import { useNavigate } from "react-router-dom";

function LoginPage() {

    const [activeForm, setActiveForm] = useState("userLogin");
    const navigate = useNavigate()


    // User Login
    const [userUsername, setUserUsername] = useState("");
    const [userPassword, setUserPassword] = useState("");

    // User Register
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    // Admin Login
    const [adminUsername, setAdminUsername] = useState("");
    const [adminPassword, setAdminPassword] = useState("");


    function userLogin(event) {
        event.preventDefault();
        axios.post('http://localhost:3000/userLogin', {
            userUsername: userUsername,
            userPassword: userPassword
        })
            .then((res) => {
                alert("User Login Success")
                navigate("/userDashboard", {
                    state: {
                        loginName: res.data.name,
                        loginPhone:res.data.phone
                    }
                })
            })
            .catch((error) => {
                console.log("Admin Login Error:", error.response?.data);
                alert("Login Failed")
            })
    }

    function registerUser() {
        axios.post('http://localhost:3000/registerUser', {
            regName: name,
            regPhone: phone,
            regUsername: registerUsername,
            regPassword: registerPassword
        })
            .then((res) => {
                alert("User Registered")
            })
            .catch((error) => {
                console.log("Register Failed", error)
                alert("regFailed")
            })
    }



    function adminLogin(event) {
        event.preventDefault();

        axios.post('http://localhost:3000/adminLogin', {
            adminUsername: adminUsername,
            adminPassword: adminPassword
        })
            .then((res) => {
                alert(res.data.message);
                navigate('/adminDashboard');
            })
            .catch((error) => {
                console.log("Admin Login Error:", error.response?.data);
                alert(
                    error.response?.data?.message ||
                    "Admin Login Failed"
                );
            });
    }

    return (
        <div className="login-page">

            <div className="login-container">

                {/* Logo / Heading */}

                <div className="login-header">

                    <div className="salon-logo">
                        ✂️
                    </div>

                    <h1>Beauty Salon</h1>

                    <p>Beauty & Care Booking</p>

                </div>


                {/* Tabs */}

                <div className="login-tabs">

                    <button
                        className={
                            activeForm === "userLogin"
                                ? "tab-btn active"
                                : "tab-btn"
                        }
                        onClick={() => setActiveForm("userLogin")}
                    >
                        User Login
                    </button>


                    <button
                        className={
                            activeForm === "register"
                                ? "tab-btn active"
                                : "tab-btn"
                        }
                        onClick={() => setActiveForm("register")}
                    >
                        Register
                    </button>


                    <button
                        className={
                            activeForm === "adminLogin"
                                ? "tab-btn active"
                                : "tab-btn"
                        }
                        onClick={() => setActiveForm("adminLogin")}
                    >
                        Admin
                    </button>

                </div>


                {/* User Login */}

                {activeForm === "userLogin" && (

                    <form
                        className="login-form"
                        onSubmit={userLogin}
                    >

                        <h2>Welcome Back 👋</h2>

                        <p className="form-description">
                            Login to book your beauty appointment
                        </p>


                        <div className="form-group">

                            <label>Username</label>

                            <input
                                type="text"
                                placeholder="Enter your username"
                                value={userUsername}
                                onChange={(e) =>
                                    setUserUsername(e.target.value)
                                }
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label>Password</label>

                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={userPassword}
                                onChange={(e) =>
                                    setUserPassword(e.target.value)
                                }
                                required
                            />

                        </div>


                        <button
                            type="submit"
                            className="submit-btn"
                        >
                            Login
                        </button>

                    </form>
                )}


                {/* Register */}

                {activeForm === "register" && (

                    <form
                        className="login-form"
                        onSubmit={registerUser}
                    >

                        <h2>Create Account ✨</h2>

                        <p className="form-description">
                            Register to book your salon appointments
                        </p>


                        <div className="form-group">

                            <label>Name</label>

                            <input
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label>Phone Number</label>

                            <input
                                type="tel"
                                placeholder="Enter your phone number"
                                value={phone}
                                onChange={(e) =>
                                    setPhone(e.target.value)
                                }
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label>Username</label>

                            <input
                                type="text"
                                placeholder="Create a username"
                                value={registerUsername}
                                onChange={(e) =>
                                    setRegisterUsername(e.target.value)
                                }
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label>Password</label>

                            <input
                                type="password"
                                placeholder="Create a password"
                                value={registerPassword}
                                onChange={(e) =>
                                    setRegisterPassword(e.target.value)
                                }
                                required
                            />

                        </div>


                        <button
                            type="submit"
                            className="submit-btn"
                        >
                            Create Account
                        </button>

                    </form>
                )}


                {/* Admin Login */}

                {activeForm === "adminLogin" && (

                    <form
                        className="login-form"
                        onSubmit={adminLogin}
                    >

                        <h2>Admin Login 🔐</h2>

                        <p className="form-description">
                            Manage your beauty salon
                        </p>


                        <div className="form-group">

                            <label>Username</label>

                            <input
                                type="text"
                                placeholder="Enter admin username"
                                value={adminUsername}
                                onChange={(e) =>
                                    setAdminUsername(e.target.value)
                                }
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label>Password</label>

                            <input
                                type="password"
                                placeholder="Enter admin password"
                                value={adminPassword}
                                onChange={(e) =>
                                    setAdminPassword(e.target.value)
                                }
                                required
                            />

                        </div>


                        <button
                            type="submit"
                            className="submit-btn"
                        >
                            Admin Login
                        </button>

                    </form>
                )}

            </div>

        </div>
    );
}

export default LoginPage;