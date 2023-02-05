import { Box, Flex, Heading, Divider } from '@chakra-ui/react'
import React from 'react'

function EducationResumeSection({ educationObject }: any) {

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

    const educationItems = Object.keys(educationObject).map((key: string) => {
        return (
            <Box key={key} mb='2'>
            <Flex justify='space-between' fontWeight={'semibold'}>
                <Box>
                    {educationObject[key].school}
                </Box>
                <Box>
                    {educationObject[key].location}
                </Box>
            </Flex>
            <Flex justify='space-between'>
                <Box>
            {educationObject[key].degreeType} in {educationObject[key].major}{educationObject[key].minor ? `, Minor in ${educationObject[key].minor}` : ''}
            </Box>
            <Box>
                {formatDate(educationObject[key].gradDate)}
            </Box>
            </Flex>
            <Box>{educationObject[key].gpa !== '0.00' ? `GPA: ${educationObject[key].gpa}/4.00` : ''}</Box>
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
