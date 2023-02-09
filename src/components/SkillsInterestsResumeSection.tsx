import { Interest, Skill } from "@/types/component";
import { Box, Divider, Heading, Flex } from "@chakra-ui/react";
import React from "react";

export default function SkillsInterestsResumeSection({
  skillObject,
  interestObject,
}: any) {
  const technicalSkillList: Skill[] = [];
  const languageSkillList: Skill[] = [];
  const interestList: Interest[] = [];

  Object.keys(skillObject).forEach((key) => {
    if (skillObject[key]["skillType"] === "technical") {
      technicalSkillList.push(skillObject[key]["skill"]);
    } else if (skillObject[key]["skillType"] === "language") {
      languageSkillList.push(skillObject[key]["skill"]);
    }
  });

  Object.keys(interestObject).forEach((key) => {
    interestList.push(interestObject[key]["interest"]);
  });

  let headingTitle = "";

  const isSkillsOrInterests =
    Object.keys(skillObject).length > 0 ||
    Object.keys(interestObject).length > 0;

  if (
    Object.keys(skillObject).length > 0 &&
    Object.keys(interestObject).length > 0
  ) {
    headingTitle = "Skills & Interests";
  } else if (Object.keys(skillObject).length > 0) {
    headingTitle = "Skills";
  } else if (Object.keys(interestObject).length > 0) {
    headingTitle = "Interests";
  }

  let interestText = "";
  let technicalSkillText = "";
  let languageSkillText = "";

  if (interestList.length > 0) {
    interestText = interestList.join(", ");
  }

  if (technicalSkillList.length > 0) {
    technicalSkillText = technicalSkillList.join(", ");
  }

  if (languageSkillList.length > 0) {
    languageSkillText = languageSkillList.join(", ");
  }

  return (
    <Box>
      {isSkillsOrInterests ? (
        <>
          <Heading size="sm" textTransform="uppercase" mb="2">
            {headingTitle}
          </Heading>
          <Divider />
        </>
      ) : (
        <></>
      )}
      <Flex>
        {technicalSkillText !== "" ? (
          <Box fontWeight={"semibold"}>Technical:&nbsp;</Box>
        ) : (
          <></>
        )}
        {technicalSkillText}
      </Flex>
      <Flex>
        {languageSkillText !== "" ? (
          <Box fontWeight={"semibold"}>Language:&nbsp;</Box>
        ) : (
          <></>
        )}
        {languageSkillText}
      </Flex>
      <Flex>
        {interestText !== "" ? (
          <Box fontWeight={"semibold"}>Interests:&nbsp;</Box>
        ) : (
          <></>
        )}
        {interestText}
      </Flex>
    </Box>
  );
}
