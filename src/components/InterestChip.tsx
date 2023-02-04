import { Tag, TagLabel, Box } from '@chakra-ui/react'
import React, { useState } from 'react'

export default function InterestChip({ entry, setInterestObject, interestObject }: any) {

    const [clicked, setClicked] = useState(false)

    function handleClick() {
        setClicked(!clicked)

        const newObject = {...interestObject}

        // hack for now: don't want to force update needlessly but reading prev clicked val bc of React functionality
        if (!clicked) {
            newObject[entry.key] = entry
        } else {
            delete newObject[entry.key]
        }
        
        setInterestObject(newObject)
    }

  return (
    <Box key={entry.key}>
        <Tag
          size="lg"
          borderRadius="full"
          variant="solid"
          colorScheme={clicked ? 'yellow' : 'gray'}
          cursor={"pointer"}
          onClick={handleClick}
        >
          <TagLabel>{entry.interest}</TagLabel>
        </Tag>
      </Box>
  )
}
