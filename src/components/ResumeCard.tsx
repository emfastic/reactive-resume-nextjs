import React, { useRef } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Divider,
  Image,
  Flex,
} from "@chakra-ui/react";
import { ResumeCardProps } from "@/types/component";

export default function ResumeCard({
  img,
  imgName,
  headerName,
}: ResumeCardProps) {
  return (
    <>
      <Card w="sm">
        <CardBody>
          <CardHeader>
            <Heading size="md" fontFamily={"arial"} fontWeight="bolder">
              {headerName}
            </Heading>
          </CardHeader>
          <Divider />
          <Flex justify={{ base: "center" }}>
            <Image src={img} alt={imgName} borderRadius={"lg"} w="65" h="450" />
          </Flex>
        </CardBody>
      </Card>
    </>
  );
}
