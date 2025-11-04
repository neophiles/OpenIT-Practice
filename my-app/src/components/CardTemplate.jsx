import {
  Card, CardBody,
  Box, HStack,
  Text, Image,
  Button, Link } from '@chakra-ui/react'
function CardTemplate({ cardInfo }) {
  const {
    image,
    altText,
    title,
    subtitle,
    link
  } = cardInfo;

  return (
    <Card w="250px" h="250px" overflow="hidden" sx={{filter: "drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.20))"}}>
      <Image
        h="125px"
        objectFit="cover"
        src={image}
        alt={altText}
      />
      <CardBody h="125px" display="flex" flexDirection="column" gap="10px">
        <Box>
          <Link href={link} isExternal fontWeight="bold" fontSize="14px">{title}</Link>
          <Text size="sm">{subtitle}</Text>
        </Box>
        <HStack>
          <Button size="auto" p="0" bg="none">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-clipboard">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
              <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
            </svg>
          </Button>
          <Button size="auto" p="0" bg="none">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-bubble-text">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M7 10h10" />
              <path d="M9 14h5" />
              <path d="M12.4 3a5.34 5.34 0 0 1 4.906 3.239a5.333 5.333 0 0 1 -1.195 10.6a4.26 4.26 0 0 1 -5.28 1.863l-3.831 2.298v-3.134a2.668 2.668 0 0 1 -1.795 -3.773a4.8 4.8 0 0 1 2.908 -8.933a5.33 5.33 0 0 1 4.287 -2.16" />
            </svg>
          </Button>
          <Button size="auto" p="0" bg="none">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-folder">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2" />
            </svg>
          </Button>
        </HStack>
      </CardBody>
    </Card>
  )
}

export default CardTemplate;
