import { updateProfile } from "@/server";
import { ModalProps } from "@/types/component";
import { PhoneIcon } from "@chakra-ui/icons";
import {
  Button,
  Center,
  Divider,
  FormControl,
  FormErrorMessage,
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
import { Field, Form, Formik } from "formik";

export default function ProfileModal({
  isModalOpen,
  onModalClose,
  user,
}: ModalProps) {

  const toast = useToast()

const firstName = useRef<any>(null)

function handleSubmit(values: any) {
  values.phoneNumber = values.phoneNumber.replace(/\D/g, "");

  updateProfile(
    values
  );

  toast({
    title: 'Profile Updated!',
    status: 'success',
    duration: 3000,
    isClosable: true,
  })

    onModalClose()
  }

const validate = (values: any) => {
  const errors: any = {}

  if (!values.firstName) {
    errors.firstName = 'First name required'
  }
  if (!values.lastName) {
    errors.lastName = 'Last name required'
  }
  if (!values.email) {
    errors.email = 'Email required'
  }
  if (!values.phoneNumber) {
    errors.phoneNumber = 'Phone number required'
  }

  return errors
}



  return (
    <Modal isOpen={isModalOpen} onClose={onModalClose}>
      <ModalOverlay />
      <ModalContent>
        <Formik
        onSubmit={handleSubmit}
        validate={validate}
        initialValues={{
          firstName: user!.firstName ? user!.firstName : '',
          lastName: user!.lastName ? user!.lastName : '',
          email: user!.email ? user!.email : '',
          phoneNumber: user!.phoneNumber ? user!.phoneNumber : '',
          website: user!.website ? user!.website : ''
        }}
        >
          {({ isSubmitting, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
        <ModalHeader>Profile</ModalHeader>
        {user!.firstName && user!.lastName && user!.email && user!.phoneNumber ? <ModalCloseButton /> : <></>}
        <Divider />
        <ModalBody>
          <Center>
            <VStack maxW="300" mt="4">
            <Field name='firstName'>
                {({ field, form }: any) => (
                <FormControl isInvalid={form.errors.firstName && form.submitCount > 0}>
              <Input
                placeholder="First name"
                {...field}
                ref={firstName}
              />
              <FormErrorMessage>{form.errors.firstName}</FormErrorMessage>
              </FormControl>)}
              </Field>
              <Field name='lastName'>
                {({ field, form }: any) => (
                <FormControl isInvalid={form.errors.lastName && form.submitCount > 0}>
              <Input
                placeholder="Last name"
                {...field}
              />
              <FormErrorMessage>{form.errors.lastName}</FormErrorMessage>
              </FormControl>)}
              </Field>
              <Field name='email'>
                {({ field, form }: any) => (
                <FormControl isInvalid={form.errors.email && form.submitCount > 0}>
              <Input
                placeholder="Email address"
                {...field}
              />
              <FormErrorMessage>{form.errors.email}</FormErrorMessage>
              </FormControl>)}
              </Field>
              <Field name='phoneNumber'>
                {({ field, form }: any) => (
                <FormControl isInvalid={form.errors.phoneNumber && form.submitCount > 0}>
              <InputGroup>
                <InputLeftElement pointerEvents={"none"}>
                  <PhoneIcon color="gray.300" />
                </InputLeftElement>
                <Input
                  placeholder="Phone number"
                  {...field}
                />
              </InputGroup>
              <FormErrorMessage>{form.errors.phoneNumber}</FormErrorMessage>
              </FormControl>)}
              </Field>
              <Field name='website'>
              {({ field, form }: any) => (
              <FormControl isInvalid={form.errors.website && form.submitCount > 0}>
              <Input placeholder="Website" {...field}/>
              <FormErrorMessage>{form.errors.website}</FormErrorMessage>
              </FormControl>)}
              </Field>
            </VStack>
          </Center>
        </ModalBody>

        <ModalFooter justifyContent={'space-between'} alignItems='left'>
          <Button onClick={() => {signOut(auth)}}>Log Out</Button>
          <Button colorScheme="blue" type='submit' isLoading={isSubmitting}>Save</Button>
        </ModalFooter>
        </Form>
        )}
        </Formik>
      </ModalContent>
    </Modal>
  );
}
