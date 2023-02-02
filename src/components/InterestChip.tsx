import { Tag, TagLabel, Box } from '@chakra-ui/react'
import React, { useState } from 'react'

export default function InterestChip({ entry, setInterestObject, interestObject }: any) {

    const [clicked, setClicked] = useState(false)

    function handleClick() {
        setClicked(!clicked)
        if (clicked) {
            interestObject[entry.key] = entry
            setInterestObject(interestObject)
        } else {
            delete interestObject[entry.key]
            setInterestObject(interestObject)
        }
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
