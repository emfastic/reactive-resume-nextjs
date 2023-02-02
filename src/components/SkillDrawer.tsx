import { updateKeyedObjectSection, updateExperience } from "@/server";
import { DrawerProps } from "@/types/component";
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
  FormLabel,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { useRef } from "react";

export default function SkillDrawer({
  isOpen,
  onClose,
  formData,
  setEdit,
  isEdit,
}: DrawerProps) {

  const skill = useRef<any>(null);
  const skillType = useRef<any>(null);

  function clearData() {
    skill.current.value = "";
    skillType.current.value = "";
  }

  function closeDrawer() {
    setEdit(false);
    clearData();
    onClose();
  }

  function handleSubmit() {
    if (isEdit) {
      updateExperience("skills", formData.key, {
        skill: skill.current.value,
        skillType: skillType.current.value
      });
    } else {
      updateKeyedObjectSection(
        [
          {
            skill: skill.current.value,
            skillType: skillType.current.value,
          },
        ],
        "skills"
      );
    }
  }

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      initialFocusRef={skill}
      onClose={closeDrawer}
      size="md"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">Add Skill</DrawerHeader>

        <DrawerBody>
          <Stack spacing="24px">
            <Box>
              <FormLabel htmlFor="skill">Skill</FormLabel>
              <Input
                ref={skill}
                defaultValue={isEdit ? formData.skill : ""}
                id="skill"
                placeholder="Your skill here"
              />
            </Box>
            <Box>
              <FormLabel htmlFor="skill">Skill Type</FormLabel>
              <Select
                placeholder="Select your skill type"
                ref={skillType}
                defaultValue={isEdit ? formData.skillType : ""}
              >
                <option value="techincal">Technical</option>
                <option value="language">Language</option>
              </Select>
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
