import {
  Button,
  Modal, ModalOverlay, ModalContent,
  ModalHeader, ModalFooter, ModalBody,
  ModalCloseButton,
  HStack,
} from '@chakra-ui/react'

function ModalTemplate({ modalInfo, isOpen, onClose, onClick }) {

  if (!modalInfo) return;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {modalInfo.title}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {modalInfo.message}
        </ModalBody>

        <ModalFooter>
          <HStack spacing="10px">
            <Button colorScheme='brand' onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='brand' onClick={onClick}>
              {modalInfo.buttonText}
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalTemplate;