import { Box, Flex, Heading, Divider } from '@chakra-ui/react'
import React from 'react'

function EducationResumeSection({ educationObject }: any) {

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
                {educationObject[key].gradDate}
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
