import { ModalProps } from "@/types/component";
import { PhoneIcon } from "@chakra-ui/icons";
import {
  Button,
  Center,
  Divider,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react";
import React from "react";

export default function ProfileModal({
  isModalOpen,
  onModalClose,
  user,
}: ModalProps) {
  return (
    <Modal isOpen={isModalOpen} onClose={onModalClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Profile</ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody>
          <Center>
            <VStack maxW="300" mt="4">
              <Input
                placeholder="First name"
                value={user ? user.firstName : ""}
              />
              <Input
                placeholder="Last name"
                value={user ? user.lastName : ""}
              />
              <Input
                placeholder="Email address"
                value={user ? user.email : ""}
              />
              <InputGroup>
                <InputLeftElement pointerEvents={"none"}>
                  <PhoneIcon color="gray.300" />
                </InputLeftElement>
                <Input
                  placeholder="Phone number"
                  value={user ? user.phoneNumber : ""}
                />
              </InputGroup>
              <Input placeholder="Website" value={user ? user.website : ""} />
            </VStack>
          </Center>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue">Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
