import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button, Flex, Heading, Spinner, Text } from "@radix-ui/themes";

import {
  fetchUser,
  getUserStatus,
  selectUser,
} from "../../store/slices/userSlice";
import { loginUser, registerUser } from "./auth";

const AuthPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const userStatus = useSelector(getUserStatus);
  const [authSwitch, setAuthSwitch] = useState("login--tab");
  const [authInput, setAuthInput] = useState({});
  const [authStatus, setAuthStatus] = useState("");
  const [error, setError] = useState();

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setError({
      ...error,
      [name]: "",
    });

    setAuthInput({ ...authInput, [name]: value });
  };

  const handleAuthSubmit = async () => {
    if (authSwitch === "login--tab") {
      setAuthStatus("loading");
      const result = await loginUser(authInput);
      console.log(result);
      if (result) {
        setAuthStatus("success");
        dispatch(fetchUser());
        toast.success(`Login successful`);
        navigate("/");
        return;
      }
      setAuthStatus("failed");
      return;
    } else if (authSwitch === "register--tab") {
      setAuthStatus("loading");
      const result = await registerUser(authInput);
      //   console.log(result);
      if (result.status === (201 || 200)) {
        setAuthStatus("success");
        toast.success(`User registered successful`);
        const loggedIn = await loginUser(authInput);

        if (loggedIn) {
          navigate("/");
          return;
        }

        return;
      } else if (result.status === 400) {
        setAuthStatus("failed");
        setError(result.data);
        // {
        //   result.data["email"] && toast.error(`Email: ${result.data["email"]}`);
        // }
        // {
        //   result.data["password"] &&
        //     toast.error(`Password: ${result.data["password"]}`);
        // }
      }

      return;
    } else {
      return;
    }
  };

  if (userStatus === "loading") {
    return <Spinner />;
  } else if (userStatus === "failed") {
    <Heading>Internal Server Erro</Heading>;
  } else if (userStatus === "succeeded") {
    if (user.id) {
      return <Navigate to={"/"} />;
    } else {
    }
  } else if (userStatus === "idle") {
    return (
      <Flex justify={"center"} className="mt-[35px]">
        <Flex
          direction={"column"}
          gap={"5"}
          flexGrow={"1"}
          maxWidth="450px"
          p="5"
          pt="1"
          // height={"650px"}
          // className="border-1 border-slate-600 pb-10 rounded-md "
        >
          <Flex justify={"between"}>
            <Flex
              onClick={() => {
                setAuthSwitch("login--tab");
                setAuthInput({});
                setError({});
              }}
              justify={"center"}
              flexGrow={"1"}
              className={`${
                authSwitch === "login--tab"
                  ? "border-b-2"
                  : "border-b-2 border-slate-800"
              }  p-3 text-2xl cursor-pointer`}
            >
              Login
            </Flex>
            <Flex
              onClick={() => {
                setAuthSwitch("register--tab");
                setAuthInput({});
                setError({});
              }}
              justify={"center"}
              flexGrow={"1"}
              className={`${
                authSwitch === "register--tab"
                  ? "border-b-2"
                  : "border-b-2 border-slate-800"
              }  p-3 text-2xl cursor-pointer`}
            >
              Register
            </Flex>
          </Flex>

          {authSwitch === "login--tab" ? (
            <section>
              {/* Login Tab */}

              <Flex direction={"column"} gap={"5"} className="text-gray-500">
                <Flex direction={"column"} gap={"2"}>
                  <label htmlFor="">Email</label>
                  <input
                    name="email"
                    type="email"
                    placeholder="Enter your register email"
                    className="w-full outline-0 p-2 bg--dark rounded-md text-gray-400"
                    onChange={handleInputChange}
                  />
                  <Text className="h-1 p-0 mt-[-10px]" color="red">
                    {error?.email && error.email}
                  </Text>
                </Flex>
                <Flex direction={"column"} gap={"2"}>
                  <label htmlFor="">Password</label>
                  <input
                    name="password"
                    type="password"
                    autoComplete="off"
                    placeholder="Enter password"
                    className="w-full outline-0 p-2 bg--dark rounded-md text-gray-400"
                    onChange={handleInputChange}
                  />
                  <Text className="h-1 p-0 mt-[-10px]" color="red">
                    {error?.password && error.password}
                  </Text>
                </Flex>
                <Button
                  onClick={handleAuthSubmit}
                  color="ruby"
                  className="mt-3"
                  size="3"
                >
                  <span>Login</span>
                  <span className="w-1">
                    {" "}
                    {authStatus === "loading" && (
                      <Spinner className="text-black" />
                    )}
                  </span>
                </Button>
              </Flex>
            </section>
          ) : (
            <section>
              {/* Register Tab */}
              <Flex direction={"column"} gap={"5"} className="text-gray-500 ">
                <Flex direction={"column"} gap={"2"}>
                  <label htmlFor="">Email</label>
                  <input
                    name="email"
                    type="email"
                    autoCorrect="off"
                    placeholder="Enter your register email"
                    className="w-full outline-0 p-2 bg--dark rounded-md text-gray-400"
                    onChange={handleInputChange}
                  />
                  <Text className="h-1 p-0 mt-[-10px]" color="red">
                    {error?.email && error.email}
                  </Text>
                </Flex>

                <Flex direction={"column"} gap={"2"}>
                  <label htmlFor="">Password</label>
                  <input
                    name="password"
                    type="password"
                    autoCorrect="off"
                    placeholder="Enter password"
                    className="w-full outline-0 p-2 bg--dark rounded-md text-gray-400"
                    onChange={handleInputChange}
                  />
                  <Text className="h-1 p-0 mt-[-10px]" color="red">
                    {error?.password && error.password}
                  </Text>
                </Flex>

                <Flex gap="2">
                  <Flex direction={"column"} gap={"2"}>
                    <label htmlFor="first_name">First Name</label>
                    <input
                      id="first_name"
                      name="first_name"
                      type="text"
                      placeholder="Enter your First Name"
                      className="w-full outline-0 p-2 bg--dark rounded-md text-gray-400"
                      onChange={handleInputChange}
                    />
                    <Text className="h-1 p-0 mt-[-10px]" as="p" color="red">
                      {error?.first_name && error.first_name}
                    </Text>
                  </Flex>
                  <Flex direction={"column"} gap={"2"}>
                    <label htmlFor="last_name">Last Name</label>
                    <input
                      id="last_name"
                      name="last_name"
                      type="text"
                      placeholder="Enter your Last Name"
                      className="w-full outline-0 p-2 bg--dark rounded-md text-gray-400"
                      onChange={handleInputChange}
                    />
                    <Text className="h-1 p-0 mt-[-10px]" as="p" color="red">
                      {error?.last_name && error.last_name}
                    </Text>
                  </Flex>
                </Flex>

                <Flex direction={"column"} gap={"2"}>
                  <label htmlFor="phone">Phone</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Enter your Phone Number"
                    className="w-full outline-0 p-2 bg--dark rounded-md text-gray-400"
                    onChange={handleInputChange}
                  />
                  <Text className="h-1 p-0 mt-[-10px]" as="p" color="red">
                    {error?.phone && error.phone}
                  </Text>
                </Flex>
                <Button
                  onClick={handleAuthSubmit}
                  color="ruby"
                  className="mt-3"
                  size="3"
                >
                  <span>Register</span>
                  <span className="w-1">
                    {" "}
                    {authStatus === "loading" && (
                      <Spinner className="text-black" />
                    )}
                  </span>
                </Button>
              </Flex>
            </section>
          )}
        </Flex>
      </Flex>
    );
  }
  return <Spinner />;
};

export default AuthPage;
