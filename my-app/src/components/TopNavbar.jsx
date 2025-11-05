import { useState } from "react";
import {
  Box, Flex, HStack, Spacer,
  Heading, Text, Button,
  useColorMode, useColorModeValue,
  useDisclosure
} from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import AlertTemplate from "./AlertTemplate";
import ModalTemplate from "./ModalTemplate";
import { useAuth } from "../context/AuthProvider";

function TopNavbar() {
  const { handleLogout, currentUser } = useAuth();

  const {colorMode, toggleColorMode} = useColorMode();

  const bg = {
    navbar: useColorModeValue("white", "gray.800"),
    profile: useColorModeValue("gray.200", "whiteAlpha.300"),
  }

  const [modalInfo, setModalInfo] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [alertInfo, setAlertInfo] = useState(null);
  
  const onClick = () => {
    setAlertInfo({status: "info", message: "Logging out. Goodbye!"});
    onOpen()
    setTimeout(() => {
      handleLogout();
    }, 2000);
  }
  
  return (
    <>
      {alertInfo && (
        <AlertTemplate alertInfo={alertInfo} onClose={() => setAlertInfo(null)} />
      )}

      {modalInfo && isOpen && (
        <ModalTemplate modalInfo={modalInfo} isOpen={isOpen} onClose={onClose} onClick={onClick} />
      )}

      <Flex as="header" bg={bg.navbar} px="30px" py="20px" align="center" position="sticky" top="0" zIndex="100">
        <Heading as="h1" size="md">Canvas 2.0</Heading>
        <Spacer />
        <HStack spacing="16px" align="center">
          <Button onClick={toggleColorMode} bg="none" p="8px">
            {colorMode === 'light' ? <SunIcon color="yellow.500" /> : <MoonIcon color="yellow.500" />}
          </Button>
          <Box bg={bg.profile} py="8px" px="16px" borderRadius="5px">
            {currentUser?.username?.charAt(0) || "G"}
          </Box>
          <Text>
            {currentUser?.email || "guest@example.com"}
          </Text>
          <Button
            onClick={() => {
              setModalInfo({title: "Logout Confirm", message: "Are you sure you want to log out?", buttonText: "Logout"});
              onOpen();
            }}
            colorScheme="brand"
          >
            Log out
          </Button>
        </HStack>
      </Flex>
    </>
  )
}

export default TopNavbar;