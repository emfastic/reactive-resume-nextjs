import { Box, Tag, TagLabel } from '@chakra-ui/react'
import React, { useState } from 'react'

export default function EducationChip({ entry, setEducationObject, educationObject }: any) {
    const [clicked, setClicked] = useState(false)

    function handleClick() {
        setClicked(!clicked)

        const newObject = {...educationObject}

        // hack for now: don't want to force update needlessly but reading prev clicked val bc of React functionality
        if (!clicked) {
            newObject[entry.key] = entry
          } else {
            delete newObject[entry.key]
        }

        setEducationObject(newObject)
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
    

  return (
    <Box key={entry.key}>
        <Tag
          size="lg"
          borderRadius="full"
          variant="solid"
          colorScheme={clicked ? 'green' : 'gray'}
          cursor={"pointer"}
          onClick={handleClick}
        >
          <TagLabel>
            {entry.school}, {entry.major}, {formatDate(entry.gradDate)}
          </TagLabel>
        </Tag>
      </Box>
  )
}
