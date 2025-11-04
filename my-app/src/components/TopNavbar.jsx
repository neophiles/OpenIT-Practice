import { useState } from "react";
import { Flex, Heading, Spacer, HStack, Box, Text, Button, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import AlertTemplate from "./AlertTemplate";

function TopNavbar({ handleLogout, currentUser }) {
  const {colorMode, toggleColorMode} = useColorMode();

  const bg = {
    navbar: useColorModeValue("white", "gray.800"),
    profile: useColorModeValue("gray.200", "whiteAlpha.300"),
  }

  const [alertInfo, setAlertInfo] = useState(null);

  return (
    <>
      {alertInfo && (
        <AlertTemplate alertInfo={alertInfo} onClose={() => setAlertInfo(null)} />
      )}

      <Flex as="header" bg={bg.navbar} px="30px" py="20px" align="center" position="sticky" top="0" zIndex="100">
        <Heading as="h1" size="md">Canvas 2.0</Heading>
        <Spacer />
        <HStack spacing="16px" align="center">
          <Button onClick={toggleColorMode} bg="none" p="8px">
            {colorMode === 'light' ? <SunIcon color="yellow.500" /> : <MoonIcon color="yellow.500" />}
          </Button>
          <Box bg={bg.profile} py="8px" px="16px" borderRadius="5px">
            {currentUser.username.charAt(0)}
          </Box>
          <Text>
            {currentUser.email}
          </Text>
          <Button
            onClick={() => {
              setAlertInfo({status: "info", message: "Logging out. Goodbye!"});
              setTimeout(() => {
                handleLogout();
              }, 2000);
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