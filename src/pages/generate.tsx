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

export default function Generate() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (auth.currentUser) {
      onValue(child(dbRef, `users/${auth.currentUser.uid}`), (snapshot) => {
        if (typeof window !== "undefined") {
          if (snapshot.exists()) {
            setUser(snapshot.val());
          } else {
            setUser(snapshot.val());
          }
        }
      });
    }
  }, []);

  if (!auth.currentUser && typeof window !== "undefined") {
    router.push("/");
  }

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

  // const [selectedEducation, setSelectedEducation] = useState<EducationExperience[]>([])
  // const [selectedWorkExperiences, setSelectedWorkExperiences] = useState<WorkExperience[]>([])
  // const [selectedSkills, setSelectedSkills] = useState<Skill[]>([])
  // const [selectedInterests, setSelectedInterests] = useState<Interest[]>([])


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
        <Button>Generate Resume</Button>
      </Flex>
      <Divider />

      <Flex>
        <Flex w="50%" justifyContent="center" alignItems='center' pt="5" pb="5">
          <Accordion defaultIndex={[0, 1, 2, 3]} w="xl" allowMultiple>
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
        {/* </Flex> */}
        </Flex>
        {/* <Flex justify={"center"} w="50%" bg="red"> */}
          <Card mt="4" w='50%'>
            <CardHeader textAlign="center">
              <Heading size="md" mb="1">
                Jake Ottiger
              </Heading>
              <Heading size="md" fontWeight="normal">
                ottigerj@bc.edu  | 216-225-2483 | linkedin.com/in/jakeottiger
              </Heading>
            </CardHeader>

            <CardBody>
              <Stack divider={<StackDivider />} spacing="4">
                <EducationResumeSection educationObject={educationObject}/>
                <Box>
                  <Heading size="sm" textTransform="uppercase">
                    Work Experience
                  </Heading>
                  Check out the overview of your clients.
                </Box>
                <Box>
                  <Heading size="sm" textTransform="uppercase">
                    Projects
                  </Heading>
                  <Box textAlign={'right'}>
                  See a detailed analysis of all your business clients.
                  See a detailed analysis of all your business clients.
                  See a detailed analysis of all your business clients.
                  See a detailed analysis of all your business clients.See a detailed analysis of all your business clients.See a detailed analysis of all your business clients.
                  See a detailed analysis of all your business clients.
                  See a detailed analysis of all your business clients.
                  See a detailed analysis of all your business clients.
                  See a detailed analysis of all your business clients.
                  See a detailed analysis of all your business clients.
                  See a detailed analysis of all your business clients.
                  See a detailed analysis of all your business clients.
                  See a detailed analysis of all your business clients.
                  See a detailed analysis of all your business clients.
                  See a detailed analysis of all your business clients.
                  See a detailed analysis of all your business clients.See a detailed analysis of all your business clients.
                  See a detailed analysis of all your business clients.See a detailed analysis of all your business clients.See a detailed analysis of all your business clients.
                  See a detailed analysis of all your business clients.See a detailed analysis of all your business clients.
                  See a detailed analysis of all your business clients.
                  See a detailed analysis of all your business clients.See a detailed analysis of all your business clients.
                  See a detailed analysis of all your business clients.See a detailed analysis of all your business clients.See a detailed analysis of all your business clients.
                  See a detailed analysis of all your business clients.See a detailed analysis of all your business clients.
                  </Box>
                </Box>
              </Stack>
            </CardBody>
          </Card>
        </Flex>
    </>
  );
}
