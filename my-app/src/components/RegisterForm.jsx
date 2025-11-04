import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Box,
  VStack
} from '@chakra-ui/react'

function RegisterForm() {
  return (
    <FormControl>
      <VStack spacing="20px">
        <Box w="100%">
          <FormLabel>First Name</FormLabel>
          <Input type="text" />
        </Box>
        <Box w="100%">
          <FormLabel>Middle Name</FormLabel>
          <Input type="text" />
        </Box>  
        <Box w="100%">
          <FormLabel>Last Name</FormLabel>
          <Input type="text" />
        </Box>  
        <Box w="100%">
          <FormLabel>Email address</FormLabel>
          <Input type='email' />
          <FormHelperText>We'll never share your email.</FormHelperText>
        </Box>
      </VStack>
    </FormControl>
  )
}

export default RegisterForm;
