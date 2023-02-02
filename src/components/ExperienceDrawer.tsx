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
  const position = useRef<any>(null);
  const location = useRef<any>(null);
  const startDate = useRef<any>(null);
  const endDate = useRef<any>(null);
  const description = useRef<any>(null);

  function clearData() {
    experienceType.current.value = "";
    organization.current.value = "";
    position.current.value = "";
    location.current.value = "";
    startDate.current.value = "";
    endDate.current.value = "";
    description.current.value = "";
  }

  function closeDrawer() {
    setEdit(false);
    clearData();
    onClose();
  }

  function handleSubmit() {
    if (isEdit) {
      updateExperience("experiences", formData.key, {
        section: experienceType.current.value,
        organization: organization.current.value,
        position: position.current.value,
        location: location.current.value,
        startDate: startDate.current.value,
        endDate: endDate.current.value,
        description: description.current.value,
      });
    } else {
      updateKeyedObjectSection(
        [
          {
            section: experienceType.current.value,
            organization: organization.current.value,
            position: position.current.value,
            location: location.current.value,
            startDate: startDate.current.value,
            endDate: endDate.current.value,
            description: description.current.value,
          },
        ],
        "experiences"
      );
    }
    clearData();
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
              <FormLabel htmlFor="position">Position</FormLabel>
              <Input
                ref={position}
                defaultValue={isEdit ? formData.position : ""}
                id="position"
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
                defaultValue={isEdit ? formData.description : ""}
              />
            </Box>
          </Stack>
        </DrawerBody>

        <DrawerFooter borderTopWidth="1px">
          <Button variant="outline" mr={3} onClick={clearData}>
            Clear
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit}>{isEdit ? "Edit" : "Submit"}</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
