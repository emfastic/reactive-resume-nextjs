import { Box, Center, Divider, Flex, VStack, Badge } from "@chakra-ui/layout";
import { AddIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import { Button } from "@chakra-ui/button";
import { Avatar } from "@chakra-ui/avatar";
import { useDisclosure } from "@chakra-ui/react-use-disclosure";
import ProfileModal from "@/components/ProfileModal";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Tag,
  TagCloseButton,
  TagLabel,
  Heading,
  useToast,
  Toast
} from "@chakra-ui/react";
import { auth, dbRef, removeData } from "../server/index.js";
import { useRouter } from "next/router";
import { onValue, child } from "firebase/database";
import {
  EducationExperience,
  Interest,
  Skill,
  User,
  WorkExperience,
} from "@/types/component.js";
import EducationDrawer from "../components/EducationDrawer";
import ExperienceDrawer from "../components/ExperienceDrawer";
import SkillDrawer from "../components/SkillDrawer";
import InterestDrawer from "../components/InterestDrawer";
import { onAuthStateChanged } from "firebase/auth";
import Head from "next/head";

export default function Profile() {
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const {
    isOpen: isEducationDrawerOpen,
    onOpen: onEducationDrawerOpen,
    onClose: onEducationDrawerClose,
  } = useDisclosure();

  const {
    isOpen: isExperienceDrawerOpen,
    onOpen: onExperienceDrawerOpen,
    onClose: onExperienceDrawerClose,
  } = useDisclosure();

  const {
    isOpen: isSkillDrawerOpen,
    onOpen: onSkillDrawerOpen,
    onClose: onSkillDrawerClose,
  } = useDisclosure();

  const {
    isOpen: isInterestDrawerOpen,
    onOpen: onInterestDrawerOpen,
    onClose: onInterestDrawerClose,
  } = useDisclosure();

  const router = useRouter();

  const deleteToast = useToast()

  const [user, setUser] = useState<User | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [educationFormData, setEducationFormData] =
    useState<EducationExperience>({
      school: "",
      location: "",
      degreeType: "",
      gradDate: "",
      major: "",
      minor: "",
      gpa: "",
    });
  const [experienceFormData, setExperienceFormData] = useState<WorkExperience>({
    experienceType: "",
    organization: "",
    title: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const [skillFormData, setSkillFormData] = useState<Skill>({
    skill: "",
    skillType: ""
  });

  const [interestFormData, setInterestFormData] = useState<Interest>({
    interest: "",
  })

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        onValue(child(dbRef, `users/${user.uid}`), (snapshot) => {
          if (typeof window !== "undefined") {
            if (snapshot.exists() && snapshot.val().firstName) {
              setUser(snapshot.val());
            } else {
              setUser(snapshot.val());
              onModalOpen()
            }
          }
        });
      } else {
        router.push("/");    
      }
    })
  }, []);

  if (!auth.currentUser && typeof window !== "undefined") {
    router.push("/");
  }

  let experienceEntries: WorkExperience[] = [];
  let educationEntries: EducationExperience[] = [];
  let skillEntries: Skill[] = [];
  let interestEntries: Interest[] = [];

  function formatDate(date: string): string {
    const months: {[key: string]: string} = {
      "01": "January",
      "02": "February",
      "03": "March",
      "04": "April",
      "05": "May",
      "06": "June",
      "07": "July",
      "08": "August",
      "09": "September",
      "10": "October",
      "11": "November",
      "12": "December",
    };

    return date === "Present"
      ? date
      : months[date.slice(5)] + " " + date.slice(0, 4);
  }

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

  function editExperience(workEntry: WorkExperience) {
    setExperienceFormData(workEntry);
    setIsEdit(true);
    onExperienceDrawerOpen();
  }

  function editEducation(educationEntry: EducationExperience) {
    setEducationFormData(educationEntry);
    setIsEdit(true);
    onEducationDrawerOpen();
  }

  function editSkill(skillEntry: Skill) {
    setSkillFormData(skillEntry);
    setIsEdit(true);
    onSkillDrawerOpen();
  }

  function editInterest(interestEntry: Interest) {
    setInterestFormData(interestEntry)
    setIsEdit(true)
    onInterestDrawerOpen()
  }

  function handleDelete(endpoint: string, entry: WorkExperience | EducationExperience | Skill | Interest) {

    deleteToast({
      title: "Entry was successfully deleted",
      status: "info",
      duration: 3000
    })

    removeData(endpoint, entry.key)
  }

  const workExperienceItems = experienceEntries.map(
    (entry: WorkExperience) => {
      return (
        <Box key={entry.key}>
          <Tag
            size="lg"
            borderRadius="full"
            variant="solid"
            colorScheme="blue"
            cursor={"pointer"}
          >
            <Badge variant="subtle" colorScheme="blue" fontSize="sm" mr="2">
              {entry.experienceType}
            </Badge>
            <TagLabel onClick={() => {
              editExperience(entry);
            }}>
              {entry.organization}, {entry.title}, {formatDate(entry.startDate)} -{" "}
              {formatDate(entry.endDate)}
            </TagLabel>
            <TagCloseButton onClick={() => handleDelete('experiences', entry)}/>
          </Tag>
        </Box>
      );
    }
  );

  const skillItems = skillEntries.map((entry: Skill) => {
    return (
      <Box key={entry.key}>
        <Tag
          size="lg"
          borderRadius="full"
          variant="solid"
          colorScheme="red"
          cursor={"pointer"}
        >
          <Badge variant="subtle" colorScheme="red" fontSize="sm" mr="2">
            {entry.skillType}
          </Badge>
          <TagLabel onClick={() => {
            editSkill(entry);
          }}>{entry.skill}</TagLabel>
          <TagCloseButton onClick={() => handleDelete('skills', entry)}/>
        </Tag>
      </Box>
    );
  });

  const interestItems = interestEntries.map((entry: Interest) => {
    return (
      <Box key={entry.key}>
        <Tag
          size="lg"
          borderRadius="full"
          variant="solid"
          colorScheme="yellow"
          cursor={"pointer"}
        >
          <TagLabel onClick={() => {
            editInterest(entry);
          }}>{entry.interest}</TagLabel>
          <TagCloseButton onClick={() => handleDelete('interests', entry)}/>
        </Tag>
      </Box>
    );
  });

  const educationItems = educationEntries.map((entry: EducationExperience) => {
    return (
      <Box key={entry.key}>
        <Tag
          size="lg"
          borderRadius="full"
          variant="solid"
          colorScheme="green"
          cursor={"pointer"}
        >
          <TagLabel onClick={() => {
            editEducation(entry);
          }}>
            {entry.school}, {entry.major}, {formatDate(entry.gradDate)}
          </TagLabel>
          <TagCloseButton onClick={() => handleDelete('education', entry)}/>
        </Tag>
      </Box>
    );
  });

  return (
    <>
    <Head>
      <title>Reactive Resume</title>
    </Head>
      <Flex
        alignItems={"center"}
        justifyContent="space-between"
        paddingTop={"3"}
        paddingLeft={"5"}
        paddingBottom={"3"}
        paddingRight={"5"}
        h="9.5vh"
      >
        <Avatar
          src="generic-profile.webp"
          mr="3"
          cursor={"pointer"}
          onClick={() => {
            onModalOpen();
          }}
        />

        <Heading size='xl' ml='100'>Reactive Resume</Heading>

        {user ? <ProfileModal
          isModalOpen={isModalOpen}
          onModalClose={onModalClose}
          user={user}
        /> : <></>}

        <Button onClick={() => router.push("/generate")}>Create Resume</Button>
      </Flex>
      <Divider />

      <Flex h="90vh" w="100vw">
        <Center>
          <VStack as="nav" spacing={6} align="left" justify="left" ml="5">
            <Box>
              <Button
                leftIcon={<AddIcon />}
                onClick={onEducationDrawerOpen}
                w="100%"
                size="lg"
              >
                Add Education
              </Button>
            </Box>

            <Box>
              <Button
                leftIcon={<AddIcon />}
                onClick={onExperienceDrawerOpen}
                w="100%"
                size="lg"
              >
                Add Experience
              </Button>
            </Box>

            <Box>
              <Button
                leftIcon={<AddIcon />}
                onClick={onSkillDrawerOpen}
                w="100%"
                size="lg"
              >
                Add Skill
              </Button>
            </Box>

            <Box>
              <Button
                leftIcon={<AddIcon />}
                onClick={onInterestDrawerOpen}
                w="100%"
                size="lg"
              >
                Add Interest
              </Button>
            </Box>
          </VStack>
        </Center>

        <EducationDrawer
          isOpen={isEducationDrawerOpen}
          onClose={onEducationDrawerClose}
          setEdit={setIsEdit}
          isEdit={isEdit}
          formData={educationFormData}
        />

        <ExperienceDrawer
          isOpen={isExperienceDrawerOpen}
          onClose={onExperienceDrawerClose}
          setEdit={setIsEdit}
          isEdit={isEdit}
          formData={experienceFormData}
        />

        <SkillDrawer
          isOpen={isSkillDrawerOpen}
          onClose={onSkillDrawerClose}
          setEdit={setIsEdit}
          isEdit={isEdit}
          formData={skillFormData}
        />

<InterestDrawer
          isOpen={isInterestDrawerOpen}
          onClose={onInterestDrawerClose}
          setEdit={setIsEdit}
          isEdit={isEdit}
          formData={interestFormData}
        />

        <Box w="100%" h="100%" pl="200" pr="250" pt="5" pb="5">
          <Accordion defaultIndex={[0, 1]} allowMultiple>
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
                  {experienceEntries.length !== 0 ? workExperienceItems : <Heading size='md' textAlign='center'>Looking pretty empty here, add some experiences</Heading>}
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
        </Box>
      </Flex>
    </>
  );
}
