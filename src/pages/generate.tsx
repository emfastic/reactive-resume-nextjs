import { Box, Divider, Flex, Heading, VStack, Badge } from "@chakra-ui/layout";
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
  useToast,
  Show,
} from "@chakra-ui/react";
import { auth, dbRef } from "../server/index.js";
import { onValue, child } from "firebase/database";
import { useRouter } from "next/router";
import {
  EducationExperience,
  Interest,
  Skill,
  User,
  WorkExperience,
} from "@/types/component.js";
import EducationChip from "../components/EducationChip";
import InterestChip from "../components/InterestChip";
import WorkExperienceChip from "../components/WorkExperienceChip";
import SkillChip from "../components/SkillChip";
import EducationResumeSection from "../components/EducationResumeSection";
import WorkExperienceResumeSection from "../components/WorkExperienceResumeSection";
import SkillsInterestsResumeSection from "../components/SkillsInterestsResumeSection";
import { onAuthStateChanged } from "firebase/auth";
import { DocumentCreator } from "../server/resume";
import { Packer } from "docx";
import { saveAs } from "file-saver";
import Head from "next/head";

export default function Generate() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
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
    });
  }, []);

  const toast = useToast();

  let experienceEntries: WorkExperience[] = [];
  let educationEntries: EducationExperience[] = [];
  let skillEntries: Skill[] = [];
  let interestEntries: Interest[] = [];

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

  const [experienceObject, setExperienceObject] = useState({});

  const workExperienceItems = experienceEntries.map((entry: WorkExperience) => {
    return (
      <WorkExperienceChip
        entry={entry}
        key={entry.key}
        setExperienceObject={setExperienceObject}
        experienceObject={experienceObject}
      />
    );
  });

  const [skillObject, setSkillObject] = useState({});

  const skillItems = skillEntries.map((entry: Skill) => {
    return (
      <SkillChip
        entry={entry}
        key={entry.key}
        setSkillObject={setSkillObject}
        skillObject={skillObject}
      />
    );
  });

  const [interestObject, setInterestObject] = useState({});

  const interestItems = interestEntries.map((entry: Interest) => {
    return (
      <InterestChip
        entry={entry}
        key={entry.key}
        setInterestObject={setInterestObject}
        interestObject={interestObject}
      />
    );
  });

  const [educationObject, setEducationObject] = useState({});

  const educationItems = educationEntries.map((entry: EducationExperience) => {
    return (
      <EducationChip
        entry={entry}
        key={entry.key}
        setEducationObject={setEducationObject}
        educationObject={educationObject}
      />
    );
  });

  function formatPhoneNum(phone: string): string {
    let formattedPhone =
      "(" +
      phone.substring(0, 3) +
      ") " +
      phone.substring(3, 6) +
      "-" +
      phone.substring(6);

    return phone !== "" ? formattedPhone : "";
  }

  function generate() {
    if (
      Object.entries(experienceObject).length === 0 &&
      Object.entries(educationObject).length === 0 &&
      Object.entries(skillObject).length === 0 &&
      Object.entries(interestObject).length === 0
    ) {
      toast({
        title: "Oops! You didn't select any experiences!",
        status: "error",
        duration: 3000,
      });
      return;
    }
    const documentCreator = new DocumentCreator();
    const doc = documentCreator.create([
      experienceObject,
      educationObject,
      { ...skillObject, ...interestObject },
      user,
    ]);

    Packer.toBlob(doc).then((blob) => {
      console.log(blob);
      saveAs(blob, `${user!.firstName} ${user!.lastName} Resume.docx`);
    });
  }

  return (
    <>
      <Head>
        <title>Reactive Resume</title>
        <meta
          name="keywords"
          content="resume, student, job search, career, easy resume builder"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Jake Ottiger" />
      </Head>
      <Flex
        alignItems={"left"}
        justifyContent="space-between"
        paddingTop={"3"}
        paddingLeft={"5"}
        paddingBottom={"3"}
        paddingRight={"5"}
        h="70px"
      >
        <IconButton
          aria-label="back"
          icon={<ArrowBackIcon />}
          bg="#FFFF"
          onClick={() => {
            router.push("/profile");
          }}
          size="lg"
        />
        <Button
          onClick={generate}
          _hover={{
            background: "#80DEEA",
          }}
          bg="#4DD0E1"
          size="lg"
        >
          Generate Resume
        </Button>
      </Flex>
      <Divider />

      <Flex>
        <Flex
          w={{ base: "100%", sm: "50%", md: "50%", lg: "50%", xl: "50%" }}
          justifyContent="center"
          pt="5"
          pb="5"
        >
          <Accordion defaultIndex={[0, 1, 2, 3]} w="2xl" allowToggle={false}>
            <AccordionItem>
              <h2>
                <AccordionButton
                  bg="#E0F2F1"
                  _hover={{ background: "#E0F8F7" }}
                >
                  <Box as="span" flex="1" textAlign="left">
                    <Heading>Education History</Heading>
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
                <AccordionButton
                  bg="#E0F2F1"
                  _hover={{ background: "#E0F8F7" }}
                >
                  <Box as="span" flex="1" textAlign="left">
                    <Heading>Experience History</Heading>
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
                <AccordionButton
                  bg="#E0F2F1"
                  _hover={{ background: "#E0F8F7" }}
                >
                  <Box as="span" flex="1" textAlign="left">
                    <Heading>Skills</Heading>
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
                <AccordionButton
                  bg="#E0F2F1"
                  _hover={{ background: "#E0F8F7" }}
                >
                  <Box as="span" flex="1" textAlign="left">
                    <Heading>Interests</Heading>
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

        <Show above="sm">
          <Card mt="4" w="50%">
            <CardHeader textAlign="center">
              <Heading size="md" mb="1">
                {user && user.firstName && user.lastName
                  ? `${user.firstName} ${user.lastName}`
                  : ""}
              </Heading>
              <Heading size="md" fontWeight="normal">
                {user && user.email && user.phoneNumber
                  ? `${user.email} | ${formatPhoneNum(user.phoneNumber)}${
                      user.website ? ` | ${user.website}` : ""
                    }`
                  : ""}
              </Heading>
            </CardHeader>

            <CardBody>
              <Stack spacing="4">
                {Object.keys(educationObject).length !== 0 ||
                Object.keys(experienceObject).length !== 0 ||
                Object.keys(skillObject).length !== 0 ||
                Object.keys(interestObject).length !== 0 ? (
                  <>
                    <EducationResumeSection educationObject={educationObject} />
                    <WorkExperienceResumeSection
                      workExperienceObject={experienceObject}
                    />
                    <SkillsInterestsResumeSection
                      skillObject={skillObject}
                      interestObject={interestObject}
                    />
                  </>
                ) : (
                  <>
                    <Heading textAlign="center">
                      Oh no your resume is empty!
                    </Heading>{" "}
                    <Heading textAlign="center">
                      Start building by clicking on the experiences on the left!
                    </Heading>
                  </>
                )}
              </Stack>
            </CardBody>
          </Card>
        </Show>
      </Flex>
    </>
  );
}
