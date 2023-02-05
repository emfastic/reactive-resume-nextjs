import {
  Box,
  Divider,
  Flex,
  Heading,
  VStack,
  Badge,
} from "@chakra-ui/layout";
import { ArrowBackIcon } from "@chakra-ui/icons";
import React, { useState, useEffect } from "react";
import { Button, IconButton } from "@chakra-ui/button";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Card,
  CardBody,
  CardHeader,
  Stack,
  StackDivider,
  Tag,
  TagCloseButton,
  TagLabel,
} from "@chakra-ui/react";
import { auth, dbRef } from "../server/index.js";
import { onValue, child } from "firebase/database"
import { useRouter } from "next/router";
import { EducationExperience, Interest, Skill, User, WorkExperience } from "@/types/component.js";
import EducationChip from "../components/EducationChip";
import InterestChip from '../components/InterestChip';
import WorkExperienceChip from "../components/WorkExperienceChip";
import SkillChip from "../components/SkillChip";
import EducationResumeSection from '../components/EducationResumeSection';
import WorkExperienceResumeSection from "../components/WorkExperienceResumeSection";
import SkillsInterestsResumeSection from "../components/SkillsInterestsResumeSection";
import { onAuthStateChanged } from "firebase/auth";
import { DocumentCreator } from '../server/resume'
import { Packer } from "docx";
import { saveAs } from 'file-saver'

export default function Generate() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        onValue(child(dbRef, `users/${user.uid}`), (snapshot) => {
          if (typeof window !== "undefined") {
            if (snapshot.exists()) {
              setUser(snapshot.val());
            } else {
              setUser(snapshot.val());
            }
          }
        });
      } else {
        router.push("/");    
      }
    })
  }, []);

  let experienceEntries: WorkExperience[] = [];
  let educationEntries: EducationExperience[] = [];
  let skillEntries: Skill[] = []
  let interestEntries: Interest[] = []

  function compareSkills(a: Skill, b: Skill) {
    if (a.skillType < b.skillType) {
      return 1;
    }
    if (a.skillType > b.skillType) {
      return -1;
    }
    return 0;
  }

  if (user) {
    if (user.experiences !== undefined) {
      for (const [key, value] of Object.entries(user.experiences)) {
        value.key = key;
        experienceEntries.push(value);
      }
    }

    if (user.education !== undefined) {
      for (const [key, value] of Object.entries(user.education)) {
        value.key = key;
        educationEntries.push(value);
      }
    }

    if (user.skills !== undefined) {
      for (const [key, value] of Object.entries(user.skills)) {
        value.key = key;
        skillEntries.push(value);
      }
    }

    if (user.interests !== undefined) {
      for (const [key, value] of Object.entries(user.interests)) {
        value.key = key;
        interestEntries.push(value);
      }
    }
  }

  function compare(a: WorkExperience, b: WorkExperience) {
    if (a.experienceType < b.experienceType) {
      return 1;
    }
    if (a.experienceType > b.experienceType) {
      return -1;
    }
    return 0;
  }

  experienceEntries.sort(compare);
  skillEntries.sort(compareSkills);

  const [experienceObject, setExperienceObject] = useState({})

  const workExperienceItems = experienceEntries.map(
    (entry: WorkExperience) => {
      return (
        <WorkExperienceChip entry={entry} key={entry.key} setExperienceObject={setExperienceObject} experienceObject={experienceObject} />
      );
    }
  );

  const [skillObject, setSkillObject] = useState({})

  const skillItems = skillEntries.map((entry: Skill) => {
    return (
      <SkillChip entry={entry} key={entry.key} setSkillObject={setSkillObject} skillObject={skillObject} />
    );
  });

  const [interestObject, setInterestObject] = useState({})

  const interestItems = interestEntries.map((entry: Interest) => {
    return (
      <InterestChip entry={entry} key={entry.key} setInterestObject={setInterestObject} interestObject={interestObject}/>
    );
  });

  const [educationObject, setEducationObject] = useState({})

  const educationItems = educationEntries.map((entry: EducationExperience) => {
    return (
      <EducationChip entry={entry} key={entry.key} setEducationObject={setEducationObject} educationObject={educationObject} />
    );
  });

  function generate() {
    if (
      Object.entries(experienceObject).length === 0 &&
      Object.entries(educationObject).length === 0 &&
      Object.entries(skillObject).length === 0 &&
      Object.entries(interestObject).length === 0
    ) {
      alert("Select experiences by clicking on them to add to your resume!");
      return;
    }
    const documentCreator = new DocumentCreator();
    const doc = documentCreator.create([
      experienceObject,
      educationObject,
      {...skillObject, ...interestObject},
      user,
    ]);

    Packer.toBlob(doc).then((blob) => {
      console.log(blob);
      saveAs(
        blob,
        `${user!.firstName} ${user!.lastName} Resume.docx`
      );
    });
  }


  return (
    <>
      <Flex
        alignItems={"left"}
        justifyContent="space-between"
        paddingTop={"3"}
        paddingLeft={"5"}
        paddingBottom={"3"}
        paddingRight={"5"}
        h="9.5vh"
      >
        <IconButton
          aria-label="back"
          icon={<ArrowBackIcon />}
          onClick={() => {
            router.push("/profile");
          }}
        />
        <Button onClick={generate}>Generate Resume</Button>
      </Flex>
      <Divider />

      <Flex>
        <Flex w="50%" justifyContent="center" alignItems='center' pt="5" pb="5">
          <Accordion defaultIndex={[0, 1, 2, 3]} w="2xl" allowToggle={false}>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                  <Heading>
                    Education History
                    </Heading>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <VStack spacing="2" alignItems="left">
                  {educationItems}
                </VStack>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    <Heading>
                    Experience History
                    </Heading>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <VStack spacing="2" alignItems="left">
                  {workExperienceItems}
                </VStack>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                  <Heading>
                    Skills
                    </Heading>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
              <VStack spacing="2" alignItems="left">
                {skillItems}
              </VStack>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                  <Heading>
                    Interests
                    </Heading>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
              <VStack spacing="2" alignItems="left">
                {interestItems}
              </VStack>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Flex>
          <Card mt="4" w='50%'>
            <CardHeader textAlign="center">
              <Heading size="md" mb="1">
                {user ? `${user.firstName} ${user.lastName}` : ''}
              </Heading>
              <Heading size="md" fontWeight="normal">
                {user ? `${user.email} | ${user.phoneNumber} | ${user.website}` : ""}
              </Heading>
            </CardHeader>

            <CardBody>
              <Stack spacing="4">
                <EducationResumeSection educationObject={educationObject}/>
                <WorkExperienceResumeSection workExperienceObject={experienceObject}/>
                <SkillsInterestsResumeSection skillObject={skillObject} interestObject={interestObject} />
                </Stack>
            </CardBody>
          </Card>
        </Flex>
    </>
  );
}
