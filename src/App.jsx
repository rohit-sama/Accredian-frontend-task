import React, { useEffect, useState } from "react";
import Axios from "axios";
import back from "./assets/back.jpeg";

function App() {
  const [showLogin, setShowLogin] = useState(true); // State to manage which section to display

  const [usernameReg, setUernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [confirmpasswordReg, confirmsetPasswordReg] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState(false);

  Axios.defaults.withCredentials = true;
  const register = () => {
    if (passwordReg !== confirmpasswordReg) {
      alert("Password does not match");
      return;
    }
    Axios.post("http://localhost:3000/register", {
      username: usernameReg,
      password: passwordReg,
    }).then((response) => {
      console.log(response);
    });
  };
  const toggleForm = () => {
    setShowLogin((prevShowLogin) => !prevShowLogin); // Toggle between login and registration sections
  };

  const login = () => {
    Axios.post("http://localhost:3000/login", {
      username: username,
      password: password,
    }).then((response) => {
      if (!response.data.auth) {
        setLoginStatus(false);
        console.log(response.data);
      } else {
        console.log(response.data);
        localStorage.setItem("token", response.data.token);
        setLoginStatus(true);
      }
    });
  };

  const userAuthenticeted = () => {
    Axios.get("http://localhost:3000/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((response) => {
        console.log(response);
        if (response.data.auth) {
          setLoginStatus(true);
        }
      })
      .catch((error) => {
        console.error("Error checking authentication:", error);
        setLoginStatus(false);
      });
  };

  const logout = () => {
    Axios.get("http://localhost:3000/logout")
      .then((response) => {
        // Clear local storage or perform other necessary actions upon successful logout
        localStorage.removeItem("token");
        setLoginStatus(false); // Update login status to indicate logged out
      })
      .catch((error) => {
        console.error("Error logging out:", error);
        // Handle any errors that occur during logout process
      });
  };

  useEffect(() => {
    userAuthenticeted();
  }, []);

  return (
    <div className="flex flex-col bg-[url('./assets/back.jpeg')] bg-no-repeat bg-cover text-white justify-center h-[100vh] items-center ">
      {!loginStatus ? (
        <div>
          <div
            className="text-center border border-gray-300 bg-transparent backdrop-blur-xl m-5 p-10 flex flex-col  justify-center items-center "
            style={{ display: showLogin ? "block" : "none" }}
          >
            <h1 className="text-5xl mb-10">Sign Up</h1>
            <label className="text-xl m-2">Username</label>
            <input
              className=" text-black pl-3 m-2"
              type="text"
              onChange={(e) => {
                setUernameReg(e.target.value);
              }}
            />
            <br />
            <label className="text-xl m-2 mr-3">Password</label>
            <input
              className=" text-black pl-3 m-2"
              type="password"
              onChange={(e) => {
                setPasswordReg(e.target.value);
              }}
            />
            <br />
            <label className="text-xl m-2">Confirm-pass</label>
            <input
              className=" text-black pl-3 m-2 mr-10"
              type="password"
              onChange={(e) => {
                confirmsetPasswordReg(e.target.value);
              }}
            />{" "}
            <br />
            <button
              className="border border-gray-200 p-2 m-5"
              onClick={register}
            >
              Register
            </button>
          </div>

          <div
            className="text-center border bg-transparent backdrop-blur-xl border-gray-300 m-5 p-10  flex flex-col  justify-center items-center "
            style={{ display: showLogin ? "none" : "block" }}
          >
            <h1 className="text-5xl mb-10">Sign In</h1>
            <label className="text-xl m-2">Username</label>
            <input
              className=" text-black pl-3 m-2 text-center"
              type="text"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />{" "}
            <br />
            <label className="text-xl m-2">Password</label>
            <input
              className=" text-black pl-3 m-2 text-center"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <div>
              <button
                className="border border-gray-200 p-2 m-5"
                onClick={login}
              >
                Login
              </button>
            </div>
          </div>

          <div className="m-4">
            {showLogin ? (
              <div className="flex gap-1">
                {" "}
                <p>Already Registered?</p>{" "}
                <button
                  onClick={toggleForm}
                  className="underline underline-offset-4 text-blue-300"
                >
                  click here
                </button>{" "}
              </div>
            ) : (
              <div className="flex gap-1">
                {" "}
                <p>Havent Registered?</p>{" "}
                <button
                  onClick={toggleForm}
                  className="underline underline-offset-4 text-blue-300"
                >
                  click here
                </button>{" "}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center border border-gray-300 p-10 flex flex-col justify-center items-center">
          <p className="text-2xl">You are already logged in</p>
          <button
            className="border-2 border-gray-200 p-2 m-2"
            onClick={userAuthenticeted}
          >
            Check if authenticated
          </button>
          <button className="border-2 border-gray-200 p-2 " onClick={logout}>
            signout
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
