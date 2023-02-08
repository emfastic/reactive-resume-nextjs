import React, { useRef, useState } from "react";
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
  Text,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInput,
  FormControl,
  FormErrorMessage,
  useToast,
  FormHelperText,
  InputGroup
} from "@chakra-ui/react";
import { updateExperience, updateKeyedObjectSection } from "@/server";
import { Field, Form, Formik, validateYupSchema } from "formik";
import { EducationExperience } from '@/types/component.js';
import DatePicker from "./DatePicker";

export default function EducationDrawer({
  formData,
  isEdit,
  isOpen,
  onClose,
  setEdit,
}: any) {
  const school = useRef<any>(null);

  const successToast = useToast()

  const [startDate, setStartDate] = React.useState<any>(new Date());

  function clearData(values: EducationExperience) {
    values.school = "";
    values.location = "";
    values.degreeType = "";
    values.gradDate = "";
    values.major = "";
    values.minor = "";
    values.gpa = "0.00";
  }

  function handleSubmit(values: EducationExperience) {
    if (isEdit) {
      updateExperience("education", formData.key, values);
      closeDrawer()
      successToast({
        title: "Successfully updated education!",
        status: 'success',
        duration: 3000
      })
    } else {
      updateKeyedObjectSection(
        [
          values,
        ],
        "education"
      );
      successToast({
        title: "Successfully added education!",
        status: 'success',
        duration: 3000
      })
    }
    clearData(values);
  }

  function closeDrawer() {
    setEdit(false);
    onClose();
  }

  const validate = (values: EducationExperience) => {
    const errors: any = {}

    if (!values.school) {
      errors.school = 'School name required'
    }
    if (!values.degreeType) {
      errors.degreeType = "Degree type required"
    }
    if (!values.gradDate) {
      errors.gradDate = "Graduation date required"
    }
    if (!values.location) {
      errors.location = "Location required"
    }
    if (!values.major) {
      errors.major = "Major required, if undeclared write Undeclared"
    }
    return errors
  }

  const [selectedDate, setSelectedDate] = useState<string>('')

  const handleDateChange = (numericDate: string) => {
    setSelectedDate(numericDate)
  };

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      initialFocusRef={school}
      onClose={closeDrawer}
      size="md"
    >
      <DrawerOverlay />
      <DrawerContent overflowY={'scroll'}>
      <Formik
        initialValues={{
          school: isEdit ? formData.school : "",
          location: isEdit ? formData.location : "",
          gradDate: isEdit ? formData.gradDate : "",
          major: isEdit ? formData.major : "",
          minor: isEdit ? formData.minor : "",
          degreeType: isEdit ? formData.degreeType : "",
          gpa: isEdit ? formData.gpa : "0.00"
        }}
        onSubmit={(values, { setSubmitting }) => {handleSubmit(values); setSubmitting(false)}}
        onReset={clearData}
        validate={validate}
        >
          {({ isSubmitting, handleSubmit, handleReset, values }) => (
            <Form onSubmit={handleSubmit} onReset={handleReset}>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">
          <Flex alignItems={"left"} justifyContent="left">
            <Text pt={"1"}>Add Education</Text>
          </Flex>
        </DrawerHeader>

        <DrawerBody>
          <Stack spacing="6px">
            <Box>
            <Field name='school'>
                {({ field, form }: any) => (
                <FormControl isInvalid={form.errors.school && form.submitCount > 0}>
              <FormLabel htmlFor="school">School</FormLabel>
              <Input
                ref={school}
                {...field}
                id="school"
                placeholder="School Name"
              />
              <FormErrorMessage>{form.errors.school}</FormErrorMessage>
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
            <Field name='degreeType'>
                {({ field, form }: any) => (
                  <FormControl isInvalid={form.errors.degreeType && form.submitCount > 0}>
              <FormLabel htmlFor="degree-type">Degree Type</FormLabel>
              <Select
                {...field}
                id="degree-type"
                placeholder="Select Degree Type"
              >
                <option value="B.A.">B.A.</option>
                <option value="B.S.">B.S.</option>
              </Select>
              <FormErrorMessage>{form.errors.degreeType}</FormErrorMessage>
              </FormControl>)}
              </Field>
            </Box>
            <Box>
            <Field name='gradDate'>
                {({ field, form }: any) => (
                  <FormControl isInvalid={form.errors.gradDate && form.submitCount > 0}>
              <FormLabel htmlFor="grad-date">Graduation Date</FormLabel>
          <DatePicker value={values.gradDate} dateField='gradDate' form={form}/>
              <FormErrorMessage>{form.errors.gradDate}</FormErrorMessage>
              </FormControl>)}
              </Field>
            </Box>
            <Box>
            <Field name='major'>
                {({ field, form }: any) => (
                  <FormControl isInvalid={form.errors.major && form.submitCount > 0}>
              <FormLabel htmlFor="major">Major</FormLabel>
              <Input
                {...field}
                id="major"
                placeholder="Major"
              />
            <FormHelperText>Put undeclared if you are undecided.</FormHelperText>
            <FormErrorMessage>{form.errors.major}</FormErrorMessage>
            </FormControl>)}
            </Field>
            </Box>
            <Box>
            <Field name='minor'>
                {({ field, form }: any) => (
                <FormControl>
              <FormLabel htmlFor="minor">Minor</FormLabel>
              <Input
                {...field}
                id="minor"
                placeholder="Minor"
              />
              </FormControl>)}
              </Field>
            </Box>
            <Box>
            <Field name='gpa'>
                {({ field, form }: any) => (
                <FormControl>
              <FormLabel htmlFor="gpa">GPA</FormLabel>
              <NumberInput
                value={field.value}
                onChange={value => form.setFieldValue('gpa', value)}
                precision={2}
                step={0.1}
                max={4.0}
                min={0.0}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <FormHelperText>Leave as 0.00 if you do not want to share.</FormHelperText>
              </FormControl>)}
              </Field>
            </Box>
          </Stack>
        </DrawerBody>

        <DrawerFooter borderTopWidth="1px" justifyContent={'space-between'} alignItems='left'>
          <Button variant="outline" mr={3} type='reset'>
            Clear
          </Button>
          <Button colorScheme="blue" type='submit' isLoading={isSubmitting}>
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
