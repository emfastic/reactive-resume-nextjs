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
  Textarea,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ExperienceDrawerProps } from "@/types/component";
import { updateExperience, updateKeyedObjectSection } from "@/server";

export default function ExperienceDrawer({
  isOpen,
  onClose,
  formData,
  setEdit,
  isEdit,
}: ExperienceDrawerProps) {
  const experienceType = useRef<any>(null);
  const organization = useRef<any>(null);
  const title = useRef<any>(null);
  const location = useRef<any>(null);
  const startDate = useRef<any>(null);
  const endDate = useRef<any>(null);
  const description = useRef<any>(null);

  const editSuccessToast = useToast()

  const [descriptionValue, setDescriptionValue] = useState("\u2022 ")

  function convertDescriptionToCSV(description: string) {
    let descriptionStr: string = description
      .replaceAll("\u2022 ", "")
      .trim();
    let descriptionArray: string[] = descriptionStr.split("\n\n");

    descriptionArray.forEach((element, idx) => {
      descriptionArray[idx] =
        element.charAt(0).toUpperCase() + element.slice(1);
    });

    return descriptionArray.join(",,");
  }

  function clearData() {
    experienceType.current.value = "";
    organization.current.value = "";
    title.current.value = "";
    location.current.value = "";
    startDate.current.value = "";
    endDate.current.value = "";
    description.current.value = "\u2022 ";
  }

  function closeDrawer() {
    setEdit(false);
    clearData();
    onClose();
  }

  function handleSubmit() {
    if (isEdit) {
      updateExperience("experiences", formData.key, {
        experienceType: experienceType.current.value,
        organization: organization.current.value,
        title: title.current.value,
        location: location.current.value,
        startDate: startDate.current.value,
        endDate: endDate.current.value,
        description: convertDescriptionToCSV(description.current.value),
      });
      closeDrawer()
      editSuccessToast({
        title: "Successfully updated item!",
        status: "success",
        duration: 3000
      })
    } else {
      updateKeyedObjectSection(
        [
          {
            experienceType: experienceType.current.value,
            organization: organization.current.value,
            title: title.current.value,
            location: location.current.value,
            startDate: startDate.current.value,
            endDate: endDate.current.value,
            description: convertDescriptionToCSV(description.current.value),
          },
        ],
        "experiences"
      );
      clearData();
    }
  }

  function handleChange(event: any) {
    // Get the current value of the input box
    let currVal = event.target.value;

    // Check if the user has pressed the return key
    if (event.key === "Enter") {
      // Add two new lines and a bullet and a space to the value
      const newValue = `${currVal}\n\n\u2022 `;

      // Update the value of the input box
      event.target.value = newValue;
      event.preventDefault();
    }
    setDescriptionValue(event.target.value);
  }

  function convertCSVToBullets(description: string) {
    let descriptionList = description.split(',,')

    descriptionList.forEach((value, idx) => {
      descriptionList[idx] = "\u2022 " + value
    })

    return descriptionList.join('\n\n')
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
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">
          <Flex alignItems={"left"} justifyContent="left">
            <Text pt={"1"}>Add Experience</Text>
            <Box ml="6" maxWidth="xl">
              {/* <FormLabel htmlFor="experience-type">Experience Type</FormLabel> */}
              <Select
                placeholder="Select Experience Type"
                ref={experienceType}
                defaultValue={isEdit ? formData.experienceType : ""}
              >
                <option value="work">Work</option>
                <option value="research">Research</option>
                <option value="extracurricular">Extracurricular</option>
              </Select>
            </Box>
          </Flex>
        </DrawerHeader>

        <DrawerBody>
          <Stack spacing="12px">
            <Box>
              <FormLabel htmlFor="organization">Organization</FormLabel>
              <Input
                ref={organization}
                defaultValue={isEdit ? formData.organization : ""}
                id="organization"
                placeholder="Organization Name"
              />
            </Box>
            <Box>
              <FormLabel htmlFor="title">Position</FormLabel>
              <Input
                ref={title}
                defaultValue={isEdit ? formData.title : ""}
                id="title"
                placeholder="Position Title"
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
              <FormLabel htmlFor="start-date">Start Date</FormLabel>
              <Input
                ref={startDate}
                defaultValue={isEdit ? formData.startDate : ""}
                id="start-date"
                placeholder="mm/dd/yyyy"
                type="month"
              />
            </Box>
            <Box>
              <FormLabel htmlFor="end-date">End Date</FormLabel>
              <Input
                ref={endDate}
                defaultValue={isEdit ? formData.endDate : ""}
                id="end-date"
                placeholder="mm/dd/yyyy"
                type="month"
              />
            </Box>

            <Box>
              <FormLabel htmlFor="experience-type">Description</FormLabel>
              <Textarea
                resize="none"
                size="xs"
                placeholder={`${"\u2022"} Descriptive Bullet 1\n${"\u2022"} Descriptive Bullet 2\n${"\u2022"} Descriptive Bullet 3`}
                ref={description}
                onChange={handleChange}
                onKeyDown={handleChange}
                defaultValue={isEdit ? convertCSVToBullets(formData.description) : "\u2022 "}
              />
            </Box>
          </Stack>
        </DrawerBody>

        <DrawerFooter borderTopWidth="1px">
          <Flex justify={'space-between'} alignItems='left'>
          <Button variant="outline" mr={3} onClick={clearData}>
            Clear
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit}>{isEdit ? "Edit" : "Submit"}</Button>
          </Flex>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
