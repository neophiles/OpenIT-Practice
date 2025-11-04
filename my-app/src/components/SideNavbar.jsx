import { Flex, Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';

function SideNavbar() {
  const navigate = useNavigate();
  return (
    <Flex as="aside" direction="column" w="100%" h="calc(100vh - 80px)" p="0" align="center" position="sticky" top="80px">
        <Button onClick={() => navigate("/profile")} w="100%" h="50px" p="0" bg="none">
          Profile
        </Button>
        <Button onClick={() => navigate("/")} w="100%" h="50px" p="0" bg="none">
          Dashboard
        </Button>
        <Button onClick={() => navigate("/calendar")} w="100%" h="50px" p="0" bg="none">
          Calendar
        </Button>
        <Button onClick={() => navigate("/inbox")} w="100%" h="50px" p="0" bg="none">
          Inbox
        </Button>
    </Flex>
  )
}

export default SideNavbar;
