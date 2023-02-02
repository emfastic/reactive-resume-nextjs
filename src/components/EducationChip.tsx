import { Box, Tag, TagLabel } from '@chakra-ui/react'
import React, { useState } from 'react'

export default function EducationChip({ entry, setEducationObject, educationObject }: any) {
    const [clicked, setClicked] = useState(false)

    function handleClick() {
        setClicked(!clicked)
        if (!clicked) {
            const newObject = {...educationObject}
            newObject[entry.key] = entry
            setEducationObject(newObject)
          } else {
            const newObject = {...educationObject}
            delete newObject[entry.key]
            setEducationObject(newObject)
        }
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
            {entry.school}, {entry.major}, {entry.gradDate}
          </TagLabel>
        </Tag>
      </Box>
  )
}
