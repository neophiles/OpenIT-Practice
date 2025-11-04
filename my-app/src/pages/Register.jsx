import { useState } from "react";
import {
  Container, Flex, VStack, HStack,
  FormControl, FormLabel, FormHelperText, Input, FormErrorMessage,
  Button, Link,
  Heading, Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: false,
    username: false,
    password: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: value.trim() === "",
    }));
  };

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const handleSubmit = (e) => {
    e.preventDefault();

    const hasEmptyFields = Object.values(userData).some((v) => v.trim() === "");
    if (hasEmptyFields) {
      alert("Please fill in all fields.");
      return;
    }

    const userExists = users.some(
      (u) => u.email === userData.email || u.username === userData.username
    );

    if (userExists) {
      alert("User already exists. Please log in instead.");
      return;
    }

    users.push(userData);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registered successfully!");
    navigate("/login");
  };

  return (
    <Flex h="100vh" align="center" justify="center">
      <Container maxW="min(90%, 450px)" py="30px" border="1px solid" borderColor="gray.300" borderRadius="5px">
        <form onSubmit={handleSubmit}>
          <VStack spacing="20px">
            <Heading size="lg">Join In!</Heading>

            <FormControl isInvalid={errors.email}>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="email"
                value={userData.email}
                placeholder="johndoe@gmail.com"
                onChange={handleChange}
                variant="filled"
              />
              {!errors.email ? (
                <FormHelperText>We'll never share your email.</FormHelperText>
              ) : (
                <FormErrorMessage>Email is required.</FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={errors.username}>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                name="username"
                value={userData.username}
                placeholder="johndoe"
                onChange={handleChange}
                variant="filled"
              />
              {!errors.username ? (
                <FormHelperText>What would you like us to call you?</FormHelperText>
              ) : (
                <FormErrorMessage>Username is required.</FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={errors.password}>
              <FormLabel>Password</FormLabel>
              <HStack>
                <Input
                  type={!showPassword ? "password" : "text"}
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                  variant="filled"
                />
                <Button onClick={() => setShowPassword(prev => !prev)} w="80px">
                  {!showPassword ? "Show" : "Hide"}
                </Button>
              </HStack>
              {!errors.password ? (
                <FormHelperText>Enter your password.</FormHelperText>
              ) : (
                <FormErrorMessage>Password is required.</FormErrorMessage>
              )}
            </FormControl>

            <Button type="submit" colorScheme="brand" w="100%">
              Register
            </Button>

            <Text>
              Already have an account? {" "}
              <Link href="/login" color="brand.600">
                Log in
              </Link>
            </Text>
          </VStack>
        </form>
      </Container>
    </Flex>
  );
}

export default Register;
