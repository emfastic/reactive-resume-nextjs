import React, { useRef } from "react";
import { ChangingDrawerProps, DrawerObject } from "@/types/component";
import { Drawer, DrawerOverlay } from "@chakra-ui/react";
import InterestDrawer from "../components/InterestDrawer";
import SkillDrawer from "./SkillDrawer";
import ExperienceDrawer from "./ExperienceDrawer";
import EducationDrawer from "./EducationDrawer";

export default function ChangingDrawer({
  isOpen,
  onClose,
  drawerType,
  educationFormData,
  isEdit,
}: ChangingDrawerProps) {
  const firstField = useRef(null);

  const drawerObj: DrawerObject = {
    experience: <ExperienceDrawer />,
    education: <EducationDrawer isEdit={isEdit} formData={educationFormData} />,
    skill: <SkillDrawer />,
    interest: <InterestDrawer />,
  };

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      initialFocusRef={firstField}
      onClose={onClose}
      size="md"
    >
      {drawerObj[drawerType]}
    </Drawer>
  );
}
