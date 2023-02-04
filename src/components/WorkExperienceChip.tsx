import { Tag, Badge, TagLabel, Box } from '@chakra-ui/react'
import React, { useState } from 'react'

export default function WorkExperienceChip({ entry, setExperienceObject, experienceObject }: any) {

    const [clicked, setClicked] = useState(false)

    function handleClick() {
        setClicked(!clicked)

        const newObject = {...experienceObject}

        // hack for now: don't want to force update needlessly but reading prev clicked val bc of React functionality
        if (!clicked) {
            newObject[entry.key] = entry
        } else {
            delete newObject[entry.key]
        }

        setExperienceObject(newObject)
    }

  return (
    <Box key={entry.key}>
          <Tag
            size="lg"
            borderRadius="full"
            variant="solid"
            colorScheme={clicked ? 'blue' : 'gray'}
            cursor={"pointer"}
            onClick={handleClick}
          >
            <Badge variant="subtle" fontSize="sm" mr="2">
              {entry.experienceType}
            </Badge>
            <TagLabel>
              {entry.organization}, {entry.position}, {entry.startDate} -{" "}
              {entry.endDate}
            </TagLabel>
          </Tag>
        </Box>
  )
}
