import { Box, Flex, Heading, Divider } from '@chakra-ui/react'
import React from 'react'

function EducationResumeSection(props: any) {

    const educationItems = Object.keys(props.educationObject).map((key: string) => {
        return (
            <>
            <Flex justify='space-between' key={key}>
                <Box>
                    {props.educationObject[key].school}
                </Box>
                <Box>
                    {props.educationObject[key].location}
                </Box>
            </Flex>
            <Flex justify='space-between'>
                <Box>
            {props.educationObject[key].degreeType} in {props.educationObject[key].major}{props.educationObject[key].minor ? `, Minor in ${props.educationObject[key].minor}` : ''}
            </Box>
            <Box>
                {props.educationObject[key].gradDate}
            </Box>
            </Flex>
            </>
        )
    })

  return (
                <Box>
                  <Heading size="sm" textTransform="uppercase" mb='2'>
                    Education
                  </Heading>
                  <Divider />
                  {educationItems}
                </Box>
  )
}

export default EducationResumeSection
