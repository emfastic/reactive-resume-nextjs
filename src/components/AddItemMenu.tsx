import {
  HamburgerIcon,
  AddIcon,
  SettingsIcon,
  StarIcon,
} from "@chakra-ui/icons";

import {
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";

export default function AddItemMenu({
  educationOpen,
  experienceOpen,
  skillOpen,
  interestOpen,
  profileOpen,
}: any) {
  const router = useRouter();

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<HamburgerIcon />}
        variant="outline"
      />
      <MenuList>
        <MenuItem icon={<StarIcon />} onClick={() => router.push("/generate")}>
          Create Resume
        </MenuItem>
        <MenuItem icon={<AddIcon />} onClick={educationOpen}>
          Add Education
        </MenuItem>
        <MenuItem icon={<AddIcon />} onClick={experienceOpen}>
          Add Experience
        </MenuItem>
        <MenuItem icon={<AddIcon />} onClick={skillOpen}>
          Add Skill
        </MenuItem>
        <MenuItem icon={<AddIcon />} onClick={interestOpen}>
          Add Interest
        </MenuItem>
        <MenuItem icon={<SettingsIcon />} onClick={profileOpen}>
          Profile
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
