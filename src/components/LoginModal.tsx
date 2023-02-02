import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Divider,
  Heading,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { LoginModalProps } from "@/types/component";
import GoogleButton from "react-google-button";

export default function LoginModal({
  onOpen,
  isOpen,
  onClose,
  text,
  handleSignIn,
}: LoginModalProps) {
  return (
    <>
      <Button onClick={onOpen}>{text}</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <Divider />
          <ModalHeader></ModalHeader>
          <ModalBody>
            <Heading
              size="lg"
              fontWeight={"semibold"}
              textAlign="center"
              padding={"100"}
            >
              Start building your resume.
            </Heading>
            <Flex alignItems={"center"} justifyContent="center" mb="10">
              <GoogleButton
                label="Continue with Google"
                onClick={handleSignIn}
              />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
