import { updateExperience, updateKeyedObjectSection } from "@/server";
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
  Flex,
  FormLabel,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { useRef } from "react";

export default function InterestDrawer({ isOpen, onClose, formData, isEdit, setEdit }: DrawerProps) {
  const interest = useRef<any>(null)

  function clearData() {
    interest.current.value = ''
  }

  function handleSubmit() {
    if (isEdit) {
      updateExperience("interests", formData.key, {
        interest: interest.current.value
      });
      closeDrawer()
    } else {
      updateKeyedObjectSection(
        [
          {
            interest: interest.current.value
          },
        ],
        "interests"
      );
      clearData()
    }
  }

  function closeDrawer() {
    clearData()
    setEdit(false)
    onClose()
  }
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
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">Add Interest</DrawerHeader>

        <DrawerBody>
          <Stack spacing="24px">
            <Box>
              <FormLabel htmlFor="skill">Interest</FormLabel>
              <Input
                ref={interest}
                defaultValue={isEdit ? formData.interest : ""}
                id="interest"
                placeholder="Your interest here"
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
