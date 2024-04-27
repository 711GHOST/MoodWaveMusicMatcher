import { Icon } from "@iconify/react";
import { useCookies } from "react-cookie";
import TextInput from "../components/shared/TextInput";
import PasswordInput from "../components/shared/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { makeUnauthenticatedPOSTRequest } from "../utils/serverHelpers";

const SignUpComponent = () => {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [cookie, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const signUp = async () => {
    if (email !== confirmEmail) {
      alert(
        "Email and Confirm Email do not match. Please enter the same email in both fields."
      );
      return;
    }
    const data = { email, password, userName, firstName, lastName };
    const response = await makeUnauthenticatedPOSTRequest(
      "/auth/register",
      data
    );
    if (response && !response.error) {
      const token = response.token;
      const date = new Date();
      date.setDate(date.getDate() + 30);

      setCookie("token", token, { path: "/", expires: date});

      alert("User created successfully. Please login to continue.");
      navigate("/home");
    } else {
      alert("Error creating user. Please try again later.");
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="logo p-5 border-b border-solid border-gray-300 w-full flex justify-center">
        <Icon icon="logos:spotify" width="145" />
      </div>
      <div className="inputRegion w-1/3 py-10 flex items-center justify-center flex-col">
        {/* I will have all the login and signup details here */}
        <div className="font-bold mb-6 text-2xl">
          Sign up for free to start listening.
        </div>
        <TextInput
          label="Email address"
          placeholder="Enter your email"
          className="my-6"
          value={email}
          setValue={setEmail}
        />
        <TextInput
          label="Confirm Email address"
          placeholder="Enter your email again"
          className="mb-6"
          value={confirmEmail}
          setValue={setConfirmEmail}
        />
        <TextInput
          label="Username"
          placeholder="Enter a username"
          className="mb-6"
          value={userName}
          setValue={setuserName}
        />
        <PasswordInput
          label="Create Password"
          placeholder="Create a password"
          value={password}
          setValue={setpassword}
        />
        <div className="w-full flex justify-between items-center space-x-8">
          <TextInput
            label="First Name"
            placeholder="Enter your first name"
            className="my-6"
            value={firstName}
            setValue={setfirstName}
          />
          <TextInput
            label="Last Name"
            placeholder="Enter your last name"
            className="my-6"
            value={lastName}
            setValue={setlastName}
          />
        </div>
        <div className="w-full flex items-center justify-center my-8">
          <button
            className="bg-green-400 font-semibold p-3 px-10 rounded-full"
            onClick={(e) => {
              e.preventDefault();
              signUp();
            }}
          >
            Sign Up
          </button>
        </div>
        <div className="w-full border-b border-solid border-gray-300"></div>
        <div className="my-6 font-semibold text-lg">
          Already have an account?
        </div>
        <div className="border border-gray-500 text-gray-500 w-full flex items-center justify-center py-4 rounded-full font-bold">
          <Link to="/login">LOG IN INSTEAD</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpComponent;
