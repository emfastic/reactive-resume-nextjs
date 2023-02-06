import React, { useRef } from "react";
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
  FormLabel,
  Input,
  Select,
  Stack,
  Textarea,
  Text,
  useToast,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { ExperienceDrawerProps } from "@/types/component";
import { updateExperience, updateKeyedObjectSection } from "@/server";
import { Field, Form, Formik } from "formik";
import { WorkExperience } from '@/types/component.js';

export default function ExperienceDrawer({
  isOpen,
  onClose,
  formData,
  setEdit,
  isEdit,
}: ExperienceDrawerProps) {

  const experienceType = useRef<any>(null)

  const successToast = useToast()

  function convertDescriptionToCSV(description: string) {

    let descriptionArray = description.split('\u2022')

    descriptionArray.forEach((val, idx) => {
      descriptionArray[idx] = val.replace('\n', '').trim()
    })

    descriptionArray = descriptionArray.slice(1)

    descriptionArray.forEach((element, idx) => {
      descriptionArray[idx] =
        element.charAt(0).toUpperCase() + element.slice(1);
    });

    return descriptionArray.join(",,");
  }

  function closeDrawer() {
    setEdit(false);
    onClose();
  }

  function handleSubmit(values: WorkExperience) {
    if (values.endDate === '') {
      values.endDate = 'Present'
    }

    values.description = convertDescriptionToCSV(values.description)

    if (isEdit) {
      updateExperience("experiences", formData.key, values);
      closeDrawer()
      successToast({
        title: "Successfully updated experience!",
        status: "success",
        duration: 3000
      })
    } else {
      updateKeyedObjectSection(
        [
          values,
        ],
        "experiences"
      );
      successToast({
        title: "Successfully added experience!",
        status: "success",
        duration: 3000
      })
      clearData(values)
    }
  }

  function handleChange(event: any, form: any) {
    const currVal = event.target.value;
  
    // use setFieldValue from Formik form to adjust based on whether user enters return otherwise just update val
    if (event.key === 'Enter') {
      const newValue = `${currVal}\n\n\u2022 `;
      form.setFieldValue('description', newValue);
      event.preventDefault();
    } else {
      form.setFieldValue('description', currVal);
    }
  }

  function convertCSVToBullets(description: string) {
    let descriptionList = description.split(',,')

    descriptionList.forEach((value, idx) => {
      descriptionList[idx] = "\u2022 " + value
    })

    return descriptionList.join('\n\n')
  }

  const validate = (values: WorkExperience) => {
    const errors: any = {}

    if (!values.organization) {
      errors.organization = 'Organization name required'
    }
    if (!values.title) {
      errors.title = "Position title required"
    }
    if (!values.startDate) {
      errors.startDate = "Start date required"
    }
    if (!values.description || values.description === "\u2022 ") {
      errors.description = "Description required"
    }
    if (!values.location) {
      errors.location = "Location required"
    }
    if (!values.experienceType) {
      errors.experienceType = "Experience type required"
    }

    return errors
  }

  const clearData = (values: WorkExperience) => {

    values.description = '\u2022 '
    values.endDate = ''
    values.startDate = ''
    values.experienceType = ''
    values.location = ''
    values.organization = ''
    values.title = ''
  }

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      initialFocusRef={experienceType}
      onClose={closeDrawer}
      size="md"
    >
      <DrawerOverlay />
      <DrawerContent overflowY='scroll'>
        <Formik
        initialValues={{
          organization: isEdit ? formData.organization : "",
          title: isEdit ? formData.title : "",
          location: isEdit ? formData.location : "",
          startDate: isEdit ? formData.startDate : "",
          endDate: isEdit ? formData.endDate : "",
          description: isEdit ? convertCSVToBullets(formData.description) : "\u2022 ",
          experienceType: isEdit ? formData.experienceType : ""
        }}
        onSubmit={(values, { setSubmitting }) => {handleSubmit(values); setSubmitting(false)}}
        onReset={clearData}
        validate={validate}
        >
          {({ isSubmitting, handleSubmit, handleReset }) => (
            <Form onSubmit={handleSubmit} onReset={handleReset}>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">
          <Flex alignItems={"left"} justifyContent="left">
            <Text pt={"1"}>Add Experience</Text>
            <Box ml="6" maxWidth="xl">
              <Field name='experienceType'>
                {({ field, form }: any) => (
                <FormControl isInvalid={form.errors.experienceType && form.submitCount > 0}>
              <Select
                placeholder="Select Experience Type"
                ref={experienceType}
                {...field}
              >
                <option value="work">Work</option>
                <option value="research">Research</option>
                <option value="extracurricular">Extracurricular</option>
              </Select>
              <FormErrorMessage>{form.errors.experienceType}</FormErrorMessage>
              </FormControl>)}
              </Field>
            </Box>
          </Flex>
        </DrawerHeader>

        <DrawerBody>
          <Stack spacing="12px">
            <Box>
              <Field name='organization'>
                {({ field, form }: any) => (
                <FormControl isInvalid={form.errors.organization && form.submitCount > 0}>
              <FormLabel htmlFor="organization">Organization</FormLabel>
              <Input
                {...field}
                id="organization"
                placeholder="Organization Name"
              />
              <FormErrorMessage>{form.errors.organization && form.submitCount > 0}</FormErrorMessage>
              </FormControl>)}
              </Field>
            </Box>
            <Box>
            <Field name='title'>
                {({ field, form }: any) => (
                <FormControl isInvalid={form.errors.title && form.submitCount > 0}>
              <FormLabel htmlFor="position">Position</FormLabel>
              <Input
                {...field}
                id="position"
                placeholder="Position title"
              />
              <FormErrorMessage>{form.errors.title}</FormErrorMessage>
              </FormControl>)}
              </Field>
            </Box>
            <Box>
            <Field name='location'>
                {({ field, form }: any) => (
                <FormControl isInvalid={form.errors.location && form.submitCount > 0}>
              <FormLabel htmlFor="location">Location</FormLabel>
              <Input
                {...field}
                id="location"
                placeholder="City, State"
              />
              <FormErrorMessage>{form.errors.location}</FormErrorMessage>
              </FormControl>)}
              </Field>
            </Box>
            <Box>
            <Field name='startDate'>
                {({ field, form }: any) => (
                <FormControl isInvalid={form.errors.startDate && form.submitCount > 0}>
              <FormLabel htmlFor="start-date">Start Date</FormLabel>
              <Input
                {...field}
                id="start-date"
                placeholder="mm/dd/yyyy"
                type="month"
              />
              <FormErrorMessage>{form.errors.startDate}</FormErrorMessage>
              </FormControl>)}
              </Field>
            </Box>
            <Box>
            <Field name='endDate'>
                {({ field, form }: any) => (
                <FormControl>
              <FormLabel htmlFor="end-date">End Date (blank if current role)</FormLabel>
              <Input
                {...field}
                id="end-date"
                placeholder="mm/dd/yyyy"
                type="month"
              />
              </FormControl>)}
              </Field>
            </Box>
            <Box>
            <Field name='description'>
                {({ field, form }: any) => (
                  
                  
                <FormControl  isInvalid={form.errors.description && form.submitCount > 0}>
              <FormLabel htmlFor="description">Description</FormLabel>
              <Textarea
                resize="none"
                size="xs"
                placeholder={"\u2022 Descriptive Bullet 1\n\u2022 Descriptive Bullet 2\n\u2022 Descriptive Bullet 3"}
                value={field.value}
                onKeyDown={event => handleChange(event, form)}
                onChange={event => handleChange(event, form)}
              />
              <FormErrorMessage>{form.errors.description}</FormErrorMessage>
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
