import { updateExperience, updateKeyedObjectSection } from "@/server";
import { DrawerProps, Interest } from "@/types/component";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useRef } from "react";

export default function InterestDrawer({
  isOpen,
  onClose,
  formData,
  isEdit,
  setEdit,
}: DrawerProps) {
  const interest = useRef<any>(null);

  const successToast = useToast();

  function clearData(values: Interest) {
    values.interest = "";
  }

  function handleSubmit(values: Interest) {
    if (isEdit) {
      updateExperience("interests", formData.key, values);
      closeDrawer();
      successToast({
        title: "Successfully updated interest!",
        status: "success",
        duration: 3000,
      });
    } else {
      updateKeyedObjectSection([values], "interests");
      clearData(values);
      successToast({
        title: "Successfully added interest!",
        status: "success",
        duration: 3000,
      });
    }
  }

  function closeDrawer() {
    setEdit(false);
    onClose();
  }

  const validate = (values: any) => {
    const errors: any = {};

    if (!values.interest) {
      errors.interest = "Interest required";
    }

    return errors;
  };

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      initialFocusRef={interest}
      onClose={closeDrawer}
      size="md"
    >
      <DrawerOverlay />
      <DrawerContent>
        <Formik
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values);
            setSubmitting(false);
          }}
          onReset={clearData}
          initialValues={{
            interest: isEdit ? formData.interest : "",
          }}
          validate={validate}
        >
          {({ isSubmitting, handleSubmit, handleReset }) => (
            <Form onSubmit={handleSubmit} onReset={handleReset}>
              <DrawerCloseButton />
              <DrawerHeader borderBottomWidth="1px">Add Interest</DrawerHeader>

              <DrawerBody>
                <Stack spacing="24px">
                  <Box>
                    <Field name="interest">
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={
                            form.errors.interest && form.submitCount > 0
                          }
                        >
                          <FormLabel htmlFor="interest">Interest</FormLabel>
                          <Input
                            ref={interest}
                            {...field}
                            id="interest"
                            placeholder="Your interest here"
                          />
                          <FormErrorMessage>
                            {form.errors.interest}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Box>
                </Stack>
              </DrawerBody>

              <DrawerFooter
                borderTopWidth="1px"
                justifyContent={"space-between"}
                alignItems="left"
              >
                <Button variant="outline" mr={3} type="reset">
                  Clear
                </Button>
                <Button
                  _hover={{
                    background: "#80DEEA",
                  }}
                  bg="#4DD0E1"
                  type="submit"
                  isLoading={isSubmitting}
                >
                  {isEdit ? "Edit" : "Submit"}
                </Button>
              </DrawerFooter>
            </Form>
          )}
        </Formik>
      </DrawerContent>
    </Drawer>
  );
}
