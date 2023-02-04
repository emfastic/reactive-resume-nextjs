import { Badge, Box, Tag, TagLabel } from '@chakra-ui/react'
import React, { useState } from 'react'

export default function SkillChip({ entry, setSkillObject, skillObject }: any) {
    
    const [clicked, setClicked] = useState(false)

    function handleClick() {
        setClicked(!clicked)

        // hack for now: don't want to force update needlessly but reading prev clicked val bc of React functionality
        const newObject = {...skillObject}

        if (!clicked) {
            newObject[entry.key] = entry
        } else {
            delete newObject[entry.key]
        }
        setSkillObject(newObject)
    }

  return (
    <Box key={entry.key}>
        <Tag
          size="lg"
          borderRadius="full"
          variant="solid"
          colorScheme={clicked ? 'red' : 'gray'}
          cursor={"pointer"}
          onClick={handleClick}
        >
          <Badge variant="subtle" fontSize="sm" mr="2">
            {entry.skillType}
          </Badge>
          <TagLabel>{entry.skill}</TagLabel>
        </Tag>
      </Box>
  )
}
