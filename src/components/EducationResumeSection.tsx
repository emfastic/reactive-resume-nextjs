import { Box, Flex, Heading, Divider } from '@chakra-ui/react'
import { EducationExperience } from "@/types/component"
import React from 'react'

function EducationResumeSection({ educationObject }: any) {

  function compareDates(a: EducationExperience, b: EducationExperience) {
    if (a.gradDate < b.gradDate) {
      return 1;
    }
    if (a.gradDate > b.gradDate) {
      return -1;
    }
    return 0;
  }

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

    let educationList: EducationExperience[] = []

    Object.keys(educationObject).forEach((key) => {
      educationList.push(educationObject[key])
    })

    educationList.sort(compareDates)

    const educationItems = educationList.map((educationObject: EducationExperience) => {
        return (
            <Box key={educationObject.key} mb='2'>
            <Flex justify='space-between' fontWeight={'semibold'}>
                <Box>
                    {educationObject.school}
                </Box>
                <Box>
                    {educationObject.location}
                </Box>
            </Flex>
            <Flex justify='space-between'>
                <Box>
            {educationObject.degreeType} in {educationObject.major}{educationObject.minor ? `, Minor in ${educationObject.minor}` : ''}
            </Box>
            <Box>
                {formatDate(educationObject.gradDate)}
            </Box>
            </Flex>
            <Box>{educationObject.gpa !== '0.00' ? `GPA: ${educationObject.gpa}/4.00` : ''}</Box>
            </Box>
        )
    })

  return (
                <Box>
                  {educationItems.length !== 0 ? (<><Heading size="sm" textTransform="uppercase" mb='2'>
                    Education
                  </Heading>
                  <Divider /></>) : (<></>)}
                  {educationItems}
                </Box>
  )
}

export default EducationResumeSection
