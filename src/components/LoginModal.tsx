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
  defineStyle,
  defineStyleConfig,
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
      <Button
        onClick={onOpen}
        size="lg"
        bg="#4DD0E1"
        _hover={{
          background: "#80DEEA",
        }}
        mr="5"
      >
        {text}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <Divider />
          <ModalHeader textAlign="center">Reactive Resume</ModalHeader>
          <Divider />
          <ModalBody>
            <Heading
              size="lg"
              fontWeight={"semibold"}
              textAlign="center"
              padding={["50", "100"]}
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
