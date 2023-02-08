import { Popover, PopoverTrigger, Button, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody, HStack, Text, IconButton, Flex, Heading, InputGroup, InputRightElement, Input } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon, CalendarIcon } from '@chakra-ui/icons'
import React, { useState } from 'react'

export default function DatePicker({ form, dateField, value }: any) {

    const [year, setYear] = useState<string>(new Date().getFullYear() + '')

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

      const monthToOctal: {[key: string]: string} = {
        "Jan": "01",
        "Feb": "02",
        "Mar": "03",
        "Apr": "04",
        "May": "05",
        "Jun": "06",
        "Jul": "07",
        'Aug': '08',
        'Sep': '09',
        "Oct": "10",
        "Nov": "11",
        "Dec": "12"
      };      
    

    const months1 = [
        "Jan",
        "Feb",
        "Mar"
      ];

      const months2 = [
        "Apr",
      "May",
      "Jun"]

      const months3 = ["Jul",
      "Aug",
      "Sep"]

      const months4 = ["Oct",
      "Nov",
      "Dec"]

      const [isOpen, setIsOpen] = useState<boolean>(false)

      const handleMonthChange = (monthName: string) => {
        let numericDate = year + '-' + monthToOctal[monthName]
        form.setFieldValue(dateField, numericDate)
        setIsOpen(isOpen => !isOpen)
      };
    
      const handleYearIncrease = () => {
        setYear(year => (Number(year) + 1) + '');
      };

      const handleYearDecrease = () => {
        setYear(year => (Number(year) - 1) + '');
      };

    const monthButtons1 = months1.map((month, idx) => {
        return <Button size='sm' onClick={() => handleMonthChange(month)} variant='ghost' textAlign='center' key={idx}>{month}</Button>
    })
    const monthButtons2 = months2.map((month, idx) => {
        return <Button size='sm' onClick={() => handleMonthChange(month)} variant='ghost' textAlign='center' key={idx}>{month}</Button>
    })
    const monthButtons3 = months3.map((month, idx) => {
        return <Button size='sm' onClick={() => handleMonthChange(month)} variant='ghost' textAlign='center' key={idx}>{month}</Button>
    })
    const monthButtons4 = months4.map((month, idx) => {
        return <Button size='sm' onClick={() => handleMonthChange(month)} variant='ghost' textAlign='center' key={idx}>{month}</Button>
    })
      
    
      
      
  return (
    <Popover isOpen={isOpen} onClose={() => {setIsOpen(false); form.setFieldValue(dateField, '')}}>
        <InputGroup>
        <PopoverTrigger>
        <Input value={value ? formatDate(value) : ''} onChange={() => {}} placeholder='Month Year' onClick={() => setIsOpen(true)}/>
        </PopoverTrigger>
  <PopoverTrigger>
    <InputRightElement><IconButton aria-label='date-picker' onClick={() => setIsOpen(true)} variant='ghost' icon={<CalendarIcon/>}/></InputRightElement>
  </PopoverTrigger>
  </InputGroup>
  <PopoverContent w='45'>
  <PopoverArrow />
  <PopoverHeader>
    <Flex justify='space-between' alignItems='center'>
        <IconButton size='sm' aria-label='dec-year' onClick={handleYearDecrease} variant='ghost' icon={<ChevronLeftIcon/>}/>
    <Heading size='md'>{year}</Heading>
    <IconButton size='sm' aria-label='inc-year' variant='ghost' onClick={handleYearIncrease} icon={<ChevronRightIcon/>}/>
    </Flex>
    </PopoverHeader>
    <PopoverBody>
        <HStack spacing={4} justify='center'>
        {monthButtons1}
        </HStack>
        <HStack spacing={4} justify='center' mt='2'>
        {monthButtons2}
        </HStack>
        <HStack spacing={4} justify='center' mt='2'>
        {monthButtons3}
        </HStack>
        <HStack spacing={4} justify='center' mt='2'>
        {monthButtons4}
        </HStack>
        </PopoverBody>
  </PopoverContent>
</Popover>
  )
}
