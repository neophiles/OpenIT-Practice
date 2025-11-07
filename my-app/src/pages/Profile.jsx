import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import {
  Box, VStack, HStack,
  Heading,
  FormControl, FormLabel,
  InputGroup, Input, InputRightElement,
  Button, Radio, RadioGroup,
  useDisclosure,
  isChakraTheme,
  Spacer,
} from "@chakra-ui/react";
import ModalTemplate from "../components/ModalTemplate";
import ToastTemplate from "../components/ToastTemplate";
import { userUpdate } from "../api/users";

function Profile() {
  const { token, currentUser, setCurrentUser } = useAuth();

  const [isChanging, setChanging] = useState({
    email: false,
    username: false,
    password: false,
    gender: false,
  });

  const [isChangingName, setChangingName] = useState(false);

  const [draftUser, setDraftUser] = useState(currentUser);
  const [pendingField, setPendingField] = useState(null);

  const [modalInfo, setModalInfo] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [toastInfo, setToastInfo] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDraftUser(prev => ({ ...prev, [name]: value }));
  };

  const handleConfirm = async () => {
    const updatedUser = { ...currentUser };

    if (pendingField === "name") {
      updatedUser.firstName = draftUser.firstName;
      updatedUser.middleName = draftUser.middleName;
      updatedUser.lastName = draftUser.lastName;
    } else {
      updatedUser[pendingField] = draftUser[pendingField];
    }

    try {
      const res =  await userUpdate(updatedUser);

      setCurrentUser(res);
      localStorage.setItem("currentUser", JSON.stringify(res));

      const users = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUsers = users.map(u => 
        u.username === currentUser.username ? res : u
      );

      localStorage.setItem("users", JSON.stringify(updatedUsers));

      setToastInfo({
        title: `${pendingField.charAt(0).toUpperCase() + pendingField.slice(1)} Updated!`,
        description: `You successfully changed your ${
          pendingField === "name" ? "Full Name" : pendingField
        }.`
      });
    } catch (err) {
      console.error(err);
    } finally {
      setChanging(prev => ({ ...prev, [pendingField]: false }));
      setPendingField(null);
      setChangingName(false);
      onClose();
    }
  };

  const handleCancel = (e) => {
    setDraftUser(currentUser);
    setChanging(prev => ({ ...prev, [e]: false }));
  };

  return (
    <>
      {modalInfo && isOpen && (
        <ModalTemplate
          modalInfo={modalInfo}
          isOpen={isOpen}
          onClose={() => {
            setPendingField(null);
            onClose();
          }}
          onClick={() => {
            handleConfirm();
          }}
        />
      )}

      {toastInfo && <ToastTemplate toastInfo={toastInfo} />}

      <Box px="32px" py="16px" display="flex" flexDirection="column" gap="30px">
        <Heading size="md">Profile</Heading>
        <Box>
          <VStack spacing="20px" w="600px">
            <FormControl>
              <FormLabel>Username</FormLabel>
              <InputGroup>
                <Input
                  type="text"
                  name="username"
                  value={isChanging.username ? draftUser.username : currentUser.username}
                  onChange={isChanging.username ? handleChange : undefined}
                  variant="filled"
                  isDisabled={!isChanging.username}
                />
                <InputRightElement width='auto' pr="5px">
                  {!isChanging.username ? (
                    <Button
                      h='1.75rem'
                      size='sm'
                      onClick={() => {
                        setChanging(prev => ({
                          ...prev,
                          username: true,
                        }));
                      }}
                    >
                      Change
                    </Button>
                  ) : (
                    <HStack>
                      <Button
                        h='1.75rem'
                        size='sm'
                        onClick={() => {
                          setPendingField("username");
                          setModalInfo({title: "New Username Confirm", message: "Are you sure you want to change your username?", buttonText: "Yes"});
                          onOpen();
                        }}
                      >
                        Confirm
                      </Button>
                      <Button
                        h='1.75rem'
                        size='sm'
                        onClick={() => handleCancel("username")}
                      >
                        Cancel
                      </Button>
                    </HStack>
                  )}
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <FormControl>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input 
                  type="password"
                  name="password"
                  value={isChanging.password ? draftUser.password : currentUser.password}
                  onChange={isChanging.password ? handleChange : undefined}
                  variant="filled"
                  isDisabled={!isChanging.password}
                />
                <InputRightElement width='auto' pr="5px">
                  {!isChanging.password ? (
                    <Button
                      h='1.75rem'
                      size='sm'
                      onClick={() => {
                        setChanging(prev => ({
                          ...prev,
                          password: true,
                        }));
                      }}
                    >
                      Change
                    </Button>
                  ) : (
                    <HStack>
                      <Button
                        h='1.75rem'
                        size='sm'
                        onClick={() => {
                          setPendingField("password"); 
                          setModalInfo({title: "New Password Confirm", message: "Are you sure you want to change your password?", buttonText: "Yes"});
                          onOpen();
                        }}
                      >
                        Confirm
                      </Button>
                      <Button
                        h='1.75rem'
                        size='sm'
                        onClick={() => handleCancel("password")}
                      >
                        Cancel
                      </Button>
                    </HStack>
                  )}
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <FormControl>
              <FormLabel>Email</FormLabel>
              <InputGroup>
                <Input 
                  type="email"
                  name="email"
                  value={isChanging.email ? draftUser.email : currentUser.email}
                  onChange={isChanging.email ? handleChange : undefined}
                  variant="filled"
                  isDisabled={!isChanging.email}
                />
                <InputRightElement width='auto' pr="5px">
                  {!isChanging.email ? (
                    <Button
                      h='1.75rem'
                      size='sm'
                      onClick={() => {
                        setChanging(prev => ({
                          ...prev,
                          email: true,
                        }));
                      }}
                    >
                      Change
                    </Button>
                  ) : (
                    <HStack>
                      <Button
                        h='1.75rem'
                        size='sm'
                        onClick={() => {
                          setPendingField("email");
                          setModalInfo({title: "New Email Confirm", message: "Are you sure you want to change your email?", buttonText: "Yes"});
                          onOpen();
                        }}
                      >
                        Confirm
                      </Button>
                      <Button
                        h='1.75rem'
                        size='sm'
                        onClick={() => handleCancel("email")}
                      >
                        Cancel
                      </Button>
                    </HStack>
                  )}
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <HStack spacing="20px" w="100%">
              <FormControl>
                <FormLabel>First Name</FormLabel>
                <Input
                  name="firstName"
                  value={isChangingName ? draftUser.firstName : currentUser.firstName}
                  onChange={isChangingName ? handleChange : undefined}
                  isDisabled={!isChangingName}
                  variant="filled"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Middle Name</FormLabel>
                <Input
                  name="middleName"
                  value={isChangingName ? draftUser.middleName : currentUser.middleName}
                  onChange={isChangingName ? handleChange : undefined}
                  isDisabled={!isChangingName}
                  variant="filled"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Last Name</FormLabel>
                <Input
                  name="lastName"
                  value={isChangingName ? draftUser.lastName : currentUser.lastName}
                  onChange={isChangingName ? handleChange : undefined}
                  isDisabled={!isChangingName}
                  variant="filled"
                />
              </FormControl>

              <VStack h="100%" justifyContent="end" alignItems="unset" pr="5px">
                {!isChangingName ? (
                  <Button size="sm" w="72px" onClick={() => setChangingName(true)}>
                    Change
                  </Button>
                ) : (
                  <>
                    <Button
                      size="sm"
                      w="72px"
                      onClick={() => {
                        setPendingField("name");
                        setModalInfo({
                          title: "Update Name",
                          message: "Are you sure you want to update your name?",
                          buttonText: "Yes",
                        });
                        onOpen();
                      }}
                    >
                      Confirm
                    </Button>
                    <Button 
                      size="sm"
                      w="72px"
                      onClick={() => {
                        setDraftUser(currentUser);
                        setChangingName(false);
                      }}
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </VStack>
            </HStack>

            <FormControl>
              <FormLabel>Gender</FormLabel>
              <RadioGroup
                value={isChanging.gender ? draftUser.gender : currentUser.gender}
                onChange={isChanging.gender ? (value) => setDraftUser(prev => ({ ...prev, gender: value })) : undefined}
                isDisabled={!isChanging.gender}
                w="100%"
                pr="5px"
              >
                <HStack spacing="20px">
                  <Radio value='male'>
                    Male
                  </Radio>
                  <Radio value='female'>
                    Female
                  </Radio>
                  <Radio value='rather not say'>
                    Rather not say
                  </Radio>
                  <Radio value='other'>
                    Other
                  </Radio>
                  
                  <Spacer />
                  {!isChanging.gender ? (
                    <Button size="sm" onClick={() => setChanging(prev => ({ ...prev, gender: true }))}>
                      Change
                    </Button>
                  ) : (
                    <HStack>
                      <Button
                        size="sm"
                        onClick={() => {
                          setPendingField("gender");
                          setModalInfo({ title: "Confirm Gender Update", message: "Are you sure you want to change your gender?", buttonText: "Yes" });
                          onOpen();
                        }}
                      >
                        Confirm
                      </Button>
                      <Button size="sm" onClick={() => handleCancel("gender")}>
                        Cancel
                      </Button>
                    </HStack>
                  )}
                </HStack>
              </RadioGroup>

              
            </FormControl>            
          </VStack>
        </Box>
      </Box>
    </>
  );
}

export default Profile;