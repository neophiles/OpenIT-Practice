import { useState } from "react";
import {
  FormControl, FormLabel, Input, FormErrorMessage,
  Container, Flex, VStack, HStack,
  Button, Link,
  Text, Heading
} from "@chakra-ui/react";
import AlertTemplate from "../components/AlertTemplate";
import { useAuth } from "../context/AuthProvider";
import { login } from "../api/auth";  
import api from "../api/axios"; 


function Login() {
  const { handleLogin } = useAuth();

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: false,
    password: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const [alertInfo, setAlertInfo] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: value.trim() === "",
    }));
  };

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasEmptyFields = Object.values(loginData).some(v => v.trim() === "");
    if (hasEmptyFields) {
      setAlertInfo({ status: "error", message: "Please fill in all fields!" });
      return;
    }

    try {
      const res = await login({ username: loginData.username, password: loginData.password });
      const accessToken = res?.access_token;
      if (!accessToken) throw new Error("No access token returned");

      const userRes = await api.get("/users/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const user = userRes.data;

      setAlertInfo({ status: "success", message: "Login successful!" });
      setTimeout(() => handleLogin(user, accessToken), 2000);
    } catch (err) {
      setAlertInfo({ status: "error", message: "Invalid credentials! Please try again." });
      console.error(err);
    }

};

  return (
    <>
      {alertInfo && (
          <AlertTemplate alertInfo={alertInfo} onClose={() => setAlertInfo(null)} />
      )}

      <Flex h="100vh" align="center" justify="center">
        <Container maxW="min(90%, 450px)" py="30px" border="1px solid" borderColor="gray.300" borderRadius="5px">
          <form onSubmit={handleSubmit}>
            <VStack spacing="20px">
              <Heading size="lg">Welcome Back!</Heading>

              <FormControl isInvalid={errors.username}>
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  name="username"
                  value={loginData.username}
                  placeholder="johndoe"
                  onChange={handleChange}
                  variant="filled"
                />
                {errors.username && (
                  <FormErrorMessage>Username is required.</FormErrorMessage>
                )}
              </FormControl>

              <FormControl isInvalid={errors.password}>
                <FormLabel>Password</FormLabel>
                <HStack>
                  <Input
                    type={!showPassword ? "password" : "text"}
                    name="password"
                    value={loginData.password}
                    onChange={handleChange}
                    variant="filled"
                  />
                  <Button onClick={() => setShowPassword(prev => !prev)} w="80px">
                    {!showPassword ? "Show" : "Hide"}
                  </Button>
                </HStack>
                {errors.password && (
                  <FormErrorMessage>Password is required.</FormErrorMessage>
                )}
              </FormControl>

              <Button type="submit" colorScheme="brand" w="100%">
                Log In
              </Button>
              
              <Text>
                Don't have an account? {" "}
                <Link href="/register" color="brand.600">
                  Register
                </Link>
              </Text>
            </VStack>
          </form>
        </Container>
      </Flex>
    </>
  );
}

export default Login;
