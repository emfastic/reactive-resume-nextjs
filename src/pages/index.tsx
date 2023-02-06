import {
  Heading,
  Flex,
  HStack,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Divider,
  Button,
  Box,
  VStack,
  Center,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import business from "/public/business-resume.png";
import ResumeCard from "../components/ResumeCard";
import LoginModal from "../components/LoginModal";
import { auth, provider, writeUserData, dbRef } from "../server/index.js";
import { onValue, child } from "firebase/database";
import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/router";
import Head from 'next/head'

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState();
  const router = useRouter();

  onAuthStateChanged(auth, user => {
    if (user) {
      router.push('/profile')
    }}
  )

  function handleSignIn() {
    signInWithPopup(auth, provider).then((result) => {
      // The signed-in user info.
      const user = result.user;

      // read data on update; navigate to build if user has account, otherwise navigate to profile to begin signup
      onValue(child(dbRef, `users/${user.uid}`), (snapshot) => {
        if (typeof window !== "undefined") {
          if (snapshot.exists()) {
            router.push("/profile");
            setUser(snapshot.val());
          } else if (user.email) {
            writeUserData(user);
            setUser(snapshot.val());
            router.push("/profile");
          }
        }
      });
    });
  }

  return (
    <>
    <Head>
      <title>Reactive Resume</title>
        <meta name="description" content="An easy to use platform to help students create professional resumes quickly and efficiently. Get started today."/>
        <meta property="og:title" content="Easy Resume Builder for Students"/>
        <meta property="og:description" content="Create a professional resume in minutes with our easy to use platform for students. Start your job search today."/>
        <meta property="og:url" content="https://reactive-resume-nextjs.vercel.app/"/>
        <meta property="og:image" content="/website-ss.png"/>
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@jakeottiger" />
        <meta name="twitter:title" content="Reactive Resume" />
        <meta name="twitter:description" content="Show your value with a professional resume" />
        <meta name="twitter:image" content="/website-ss.png" />
        <meta name="keywords" content="resume, student, job search, career, easy resume builder"/>
        <meta name="robots" content="index, follow"/>
        <meta name="author" content="Jake Ottiger"/>
    </Head>
      <Flex
        alignItems={"right"}
        justifyContent="space-between"
        paddingTop={"3"}
        paddingRight={"5"}
        paddingBottom={"3"}
      >
        <Heading size='xl' ml='5'>Reactive Resume</Heading>
        <HStack as="nav" spacing={6}>
          <LoginModal
            text="Get Started"
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            handleSignIn={handleSignIn}
          />
        </HStack>
      </Flex>
      <Divider />
      <Flex alignItems={"center"} justifyContent="center" paddingTop={"3"}>
        <Flex
          direction="column"
          h="sm"
          w="2xl"
          justifyContent={"center"}
          alignItems="center"
        >
          <Heading
            size="4xl"
            fontFamily="arial"
            fontWeight="semibold"
            paddingLeft={"4"}
          >
            Show your value.
          </Heading>
        </Flex>
        <HStack
          spacing={8}
          mt="5"
          alignContent={"right"}
          justifyContent="right"
          paddingRight={"5"}
        >
          <ResumeCard
            img="/business-resume.png"
            imgName="Business Resume"
            headerName="Business Resume"
          ></ResumeCard>
          <ResumeCard
            img="/communication-resume.png"
            imgName="Communication Resume"
            headerName="Communication Resume"
          ></ResumeCard>
        </HStack>
      </Flex>
    </>
  );
}
