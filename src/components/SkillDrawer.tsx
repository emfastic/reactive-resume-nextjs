import { updateKeyedObjectSection, updateExperience } from "@/server";
import { DrawerProps, Skill } from "@/types/component";
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
  Select,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Field, Formik, Form } from "formik";
import React from "react";
import { useRef } from "react";

export default function SkillDrawer({
  isOpen,
  onClose,
  formData,
  setEdit,
  isEdit,
}: DrawerProps) {

  const skillType = useRef<any>(null);

  const successToast = useToast()

  function clearData(values: Skill) {
    values.skill = ''
    values.skillType = ''
  }

  function closeDrawer() {
    setEdit(false);
    onClose();
  }

  function handleSubmit(values: Skill) {
    if (isEdit) {
      updateExperience("skills", formData.key, values);
      closeDrawer()
      successToast({
        title: "Successfully edited skill!",
        status: "success",
        duration: 3000
      })
    } else {
      updateKeyedObjectSection(
        [
          values,
        ],
        "skills"
      );
      clearData(values)
      successToast({
        title: "Successfully added skill!",
        status: "success",
        duration: 3000
      })
    }
  }

  const validate = (values: any) => {
    const errors: any = {}

    if (!values.skill) {
      errors.skill = 'Skill required'
    }
    if (!values.skillType) {
      errors.skillType = 'Skill type required'
    }

    return errors
  }

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      initialFocusRef={skillType}
      onClose={closeDrawer}
      size="md"
    >
      <DrawerOverlay />
      <DrawerContent>
        <Formik
        onSubmit={handleSubmit}
        onReset={clearData}
        initialValues={{
          skillType: isEdit ? formData.skillType : "",
          skill: isEdit ? formData.skill : ""
        }}
        validate={validate}
        >
          {({ isSubmitting, handleSubmit, handleReset }) => (
            <Form onSubmit={handleSubmit} onReset={handleReset}>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">Add Skill</DrawerHeader>

        <DrawerBody>
          <Stack spacing="24px">
          <Box>
            <Field name='skillType'>
              {({ field, form }: any) => (
            <FormControl isInvalid={form.errors.skillType && form.submitCount > 0}>
              <FormLabel htmlFor="skillType">Skill Type</FormLabel>
              <Select
                placeholder="Select your skill type"
                ref={skillType}
                {...field}
              >
                <option value="technical">Technical</option>
                <option value="language">Language</option>
              </Select>
              <FormErrorMessage>{form.errors.skillType}</FormErrorMessage>
              </FormControl>)}
              </Field>
            </Box>
            <Box>
              <Field name='skill'>
              {({ field, form }: any) => (
            <FormControl isInvalid={form.errors.skill && form.submitCount > 0}>
              <FormLabel htmlFor="skill">Skill</FormLabel>
              <Input
                {...field}
                id="skill"
                placeholder="Your skill here"
              />
              <FormErrorMessage>{form.errors.skill}</FormErrorMessage>
              </FormControl>)}
              </Field>
            </Box>
          </Stack>
        </DrawerBody>

        <DrawerFooter borderTopWidth="1px" justifyContent={'space-between'} alignItems='left'>
          <Button variant="outline" mr={3} type='reset'>
            Clear
          </Button>
          <Button colorScheme="blue" type='submit' isLoading={isSubmitting}>{isEdit ? "Edit" : "Submit"}</Button>
        </DrawerFooter>
        </Form>
          )}
        </Formik>
      </DrawerContent>
    </Drawer>
  );
}
