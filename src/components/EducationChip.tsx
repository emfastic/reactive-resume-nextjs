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
