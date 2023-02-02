import React, { useRef } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Divider,
  Image,
} from "@chakra-ui/react";
import { ResumeCardProps } from "@/types/component";

export default function ResumeCard({
  img,
  imgName,
  headerName,
}: ResumeCardProps) {
  return (
    <>
      <Card>
        <CardBody>
          <CardHeader>
            <Heading size="md" fontFamily={"arial"} fontWeight="bolder">
              {headerName}
            </Heading>
          </CardHeader>
          <Divider />
          <Image src={img} alt={imgName} borderRadius={"lg"} w="65" h="450" />
        </CardBody>
      </Card>
    </>
  );
}
