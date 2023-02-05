import { Box, Divider, Flex, Heading, ListItem, UnorderedList } from '@chakra-ui/react'
import React from 'react'
import { WorkExperience } from '@/types/component.js';

export default function WorkExperienceResumeSection({ workExperienceObject }: any) {

    const researchExperienceList: WorkExperience[] = []
    const workExperienceList: WorkExperience[] = []
    const extracurricularExperienceList: WorkExperience[] = []

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

    // Seperate experience object into resume sections
    Object.keys(workExperienceObject).forEach(key => {
        if (workExperienceObject[key]['section'] === 'Work') {
            workExperienceList.push(workExperienceObject[key])
        } else if (workExperienceObject[key]['section'] === 'Research') {
            researchExperienceList.push(workExperienceObject[key])
        } else if (workExperienceObject[key]['section'] === 'Extracurricular') {
            extracurricularExperienceList.push(workExperienceObject[key])
        }
    })

    const workExperienceItems = workExperienceList.map((workObject: WorkExperience) => {

        // CSVed description
        const descriptionList = workObject.description.split(',')

        const descriptionItems = descriptionList.map((value, idx) => {
            return <ListItem key={idx}>{value}</ListItem>
        })

        return (
            <Box key={workObject.key} mb='2'>
            <Flex justify='space-between' fontWeight={'semibold'}>
                <Box>
                    {workObject.organization}
                </Box>
                <Box>
                    {workObject.location}
                </Box>
            </Flex>
            <Flex justify='space-between'>
                <Box>
            {workObject.title}
            </Box>
            <Box>
                {formatDate(workObject.startDate)} - {formatDate(workObject.endDate)}
            </Box>
            </Flex>
            <UnorderedList>
                {descriptionItems}
            </UnorderedList>
            </Box>
        )
    })

    const researchExperienceItems = researchExperienceList.map((workObject: WorkExperience) => {

        // CSVed description
        const descriptionList = workObject.description.split(',')

        const descriptionItems = descriptionList.map((value, idx) => {
            return <ListItem key={idx}>{value}</ListItem>
        })

        return (
            <Box key={workObject.key} mb='2'>
            <Flex justify='space-between' fontWeight={'semibold'}>
                <Box>
                    {workObject.organization}
                </Box>
                <Box>
                    {workObject.location}
                </Box>
            </Flex>
            <Flex justify='space-between'>
                <Box>
            {workObject.title}
            </Box>
            <Box>
                {formatDate(workObject.startDate)} - {formatDate(workObject.endDate)}
            </Box>
            </Flex>
            <UnorderedList>
                {descriptionItems}
            </UnorderedList>
            </Box>
        )
    })

    const extracurricularExperienceItems = extracurricularExperienceList.map((workObject: WorkExperience) => {

        // CSVed description
        const descriptionList = workObject.description.split(',')

        const descriptionItems = descriptionList.map((value, idx) => {
            return <ListItem key={idx}>{value}</ListItem>
        })

        return (
            <Box key={workObject.key} mb='2'>
            <Flex justify='space-between' fontWeight={'semibold'}>
                <Box>
                    {workObject.organization}
                </Box>
                <Box>
                    {workObject.location}
                </Box>
            </Flex>
            <Flex justify='space-between'>
                <Box>
            {workObject.title}
            </Box>
            <Box>
                {formatDate(workObject.startDate)} - {formatDate(workObject.endDate)}
            </Box>
            </Flex>
            <UnorderedList>
                {descriptionItems}
            </UnorderedList>
            </Box>
        )
    })


  return (
    <Box>
                  {workExperienceList.length !== 0 ? (<><Heading size="sm" textTransform="uppercase" mb='2'>
                    Work Experience
                  </Heading> <Divider /></>) : (<></>)}
                  {workExperienceItems}
                  {researchExperienceList.length !== 0 ? (<><Heading size="sm" textTransform="uppercase" mb='2'>
                    Research Experience
                  </Heading> <Divider /></>) : (<></>)}
                  {researchExperienceItems}
                  {extracurricularExperienceList.length !== 0 ? (<><Heading size="sm" textTransform="uppercase" mb='2'>
                    Extracurricular Experience
                  </Heading> <Divider /></>) : (<></>)}
                  {extracurricularExperienceItems}
                </Box>
  )
}
