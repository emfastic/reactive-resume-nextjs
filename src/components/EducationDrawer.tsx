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
} from "@chakra-ui/react";
import { updateExperience, updateKeyedObjectSection } from "@/server";

export default function EducationDrawer({
  formData,
  isEdit,
  isOpen,
  onClose,
  setEdit,
}: any) {
  const school = useRef<any>(null);
  const location = useRef<any>(null);
  const degreeType = useRef<any>(null);
  const gradDate = useRef<any>(null);
  const major = useRef<any>(null);
  const minor = useRef<any>(null);
  const [gpa, setGPA] = useState("0.00");

  function clearData() {
    school.current.value = "";
    location.current.value = "";
    degreeType.current.value = "";
    gradDate.current.value = "";
    major.current.value = "";
    minor.current.value = "";
    setGPA("0.00");
  }

  function handleSubmit() {
    if (isEdit) {
      updateExperience("education", formData.key, {
        school: school.current.value,
        location: location.current.value,
        degreeType: degreeType.current.value,
        gradDate: gradDate.current.value,
        major: major.current.value,
        minor: minor.current.value,
        gpa: gpa,
      });
    } else {
      updateKeyedObjectSection(
        [
          {
            school: school.current.value,
            location: location.current.value,
            degreeType: degreeType.current.value,
            gradDate: gradDate.current.value,
            major: major.current.value,
            minor: minor.current.value,
            gpa: gpa,
          },
        ],
        "education"
      );
    }
    clearData();
  }

  function closeDrawer() {
    clearData();
    setEdit(false);
    onClose();
  }

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      initialFocusRef={school}
      onClose={closeDrawer}
      size="md"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">
          <Flex alignItems={"left"} justifyContent="left">
            <Text pt={"1"}>Add Education</Text>
          </Flex>
        </DrawerHeader>

        <DrawerBody>
          <Stack spacing="6px">
            <Box>
              <FormLabel htmlFor="school">School</FormLabel>
              <Input
                ref={school}
                defaultValue={isEdit ? formData.school : ""}
                id="school"
                placeholder="School Name"
              />
            </Box>
            <Box>
              <FormLabel htmlFor="location">Location</FormLabel>
              <Input
                ref={location}
                defaultValue={isEdit ? formData.location : ""}
                id="location"
                placeholder="City, State"
              />
            </Box>
            <Box>
              <FormLabel htmlFor="degree-type">Degree Type</FormLabel>
              <Select
                ref={degreeType}
                defaultValue={isEdit ? formData.degreeType : ""}
                id="degree-type"
                placeholder="Select Degree Type"
              >
                <option value="B.A.">B.A.</option>
                <option value="B.S.">B.S.</option>
              </Select>
            </Box>
            <Box>
              <FormLabel htmlFor="grad-date">Graduation Date</FormLabel>
              <Input
                ref={gradDate}
                defaultValue={isEdit ? formData.gradDate : ""}
                id="grad-date"
                placeholder="mm/dd/yyyy"
                type="month"
              />
            </Box>
            <Box>
              <FormLabel htmlFor="major">Major</FormLabel>
              <Input
                ref={major}
                defaultValue={isEdit ? formData.major : ""}
                id="major"
                placeholder="Major"
              />
            </Box>
            <Box>
              <FormLabel htmlFor="minor">Minor</FormLabel>
              <Input
                ref={minor}
                defaultValue={isEdit ? formData.minor : ""}
                id="minor"
                placeholder="Minor"
              />
            </Box>
            <Box>
              <FormLabel htmlFor="gpa">GPA</FormLabel>
              <NumberInput
                value={gpa}
                defaultValue={isEdit ? formData.gpa : ""}
                onChange={(value) => {
                  setGPA(value);
                }}
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
            </Box>
          </Stack>
        </DrawerBody>

        <DrawerFooter borderTopWidth="1px">
        <Flex justify={'space-between'} alignItems='left'>
          <Button variant="outline" mr={3} onClick={clearData}>
            Clear
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit}>
            {isEdit ? "Edit" : "Submit"}
          </Button>
          </Flex>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
