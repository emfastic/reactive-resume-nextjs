import { updateProfile } from "@/server";
import { ModalProps } from "@/types/component";
import { PhoneIcon } from "@chakra-ui/icons";
import {
  Button,
  Center,
  Divider,
  Flex,
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
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { auth } from "@/server";
import { signOut } from "firebase/auth";

export default function ProfileModal({
  isModalOpen,
  onModalClose,
  user,
}: ModalProps) {

  const toast = useToast()

const firstName = useRef<any>(null)
const lastName = useRef<any>(null)
const phoneNumber = useRef<any>(null)
const email = useRef<any>(null)
const website = useRef<any>(null)

function handleSubmit() {
  let strippedPhoneNumber = phoneNumber.current.value.replace(/\D/g, "");

  updateProfile(
    firstName.current.value,
    lastName.current.value,
    strippedPhoneNumber,
    email.current.value,
    website.current.value
  );

  toast({
    title: 'Profile Updated!',
    status: 'success',
    duration: 3000,
    isClosable: true,
  })

    onModalClose()
  }

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
                defaultValue={user ? user.firstName : ""}
                ref={firstName}
              />
              <Input
                placeholder="Last name"
                defaultValue={user ? user.lastName : ""}
                ref={lastName}
              />
              <Input
                placeholder="Email address"
                defaultValue={user ? user.email : ""}
                ref={email}
              />
              <InputGroup>
                <InputLeftElement pointerEvents={"none"}>
                  <PhoneIcon color="gray.300" />
                </InputLeftElement>
                <Input
                  placeholder="Phone number"
                  defaultValue={user ? user.phoneNumber : ""}
                  ref={phoneNumber}
                />
              </InputGroup>
              <Input placeholder="Website" defaultValue={user ? user.website : ""} ref={website}/>
            </VStack>
          </Center>
        </ModalBody>

        <ModalFooter>
          <Flex justify="space-between" alignItems='left'>
          <Button onClick={() => {signOut(auth)}}>Log Out</Button>
          <Button colorScheme="blue" onClick={handleSubmit}>Save</Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
