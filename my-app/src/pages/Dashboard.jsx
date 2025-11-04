import { Box, Heading, Flex } from "@chakra-ui/react";
import CardTemplate from "../components/CardTemplate";

function Dashboard() {
  const cardInfos = [
    {
      id: 1,
      image: "https://media.istockphoto.com/id/1265965042/vector/math-theory-mathematics-calculus-on-class-chalkboard-algebra-and-geometry-science.jpg?s=612x612&w=0&k=20&c=T97ylW_6ht1STS_MRw4YrDg0Kt3HuoXEOQI9vQFfin8=",
      altText: "Math on Chalk Board",
      title: "Calculus",
      subtitle: "CSMAT102",
      link: "https://facebook.com",
    },
    {
      id: 2,
      image: "https://engineering.jhu.edu/ams/wp-content/uploads/2021/06/hero-image-research-500x282.jpeg",
      altText: "Discrete Math on Chalk Board",
      title: "Discrete Structures 2",
      subtitle: "CSDS102",
      link: "https://facebook.com",
    },
    {
      id: 3,
      image: "https://media.licdn.com/dms/image/v2/D4D12AQGQt_uYVLll0w/article-cover_image-shrink_423_752/article-cover_image-shrink_423_752/0/1659011887161?e=1763596800&v=beta&t=y7rKMef9j84SOQdEmAVqnlh6Ox7rluu-qgvfmhOwXVs",
      altText: "Graph of Networks",
      title: "Networks and Communication",
      subtitle: "CSNET101",
      link: "https://facebook.com",
    },
    {
      id: 4,
      image: "https://camo.githubusercontent.com/8fc638f5523926798736e5372ac138e7718e53c572e0d99f99978769871e13fd/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f7468756d622f392f39382f4350542d4f4f502d6f626a656374735f616e645f636c61737365735f2d5f6174746d6574682e7376672f3230303070782d4350542d4f4f502d6f626a656374735f616e645f636c61737365735f2d5f6174746d6574682e7376672e706e67",
      altText: "Object-Oriented Programming Concept",
      title: "Object-Oriented Programming",
      subtitle: "CSOP01",
      link: "https://facebook.com",
    },
    {
      id: 5,
      image: "https://beta.bgscollege.in/wp-content/uploads/2025/08/Data-Structure-assignement-1.jpg",
      altText: "Data Structures Diagram",
      title: "Data Structures and Algorithms",
      subtitle: "CP103",
      link: "https://facebook.com",
    },
    {
      id: 6,
      image: "https://fs.artdevivre.com/storage/articles/events-article/article-cabanel/45eb0fc6df942d357fd709f048e622d7.jpg",
      altText: "Famous Painting",
      title: "Art Appreciation",
      subtitle: "HUM100",
      link: "https://facebook.com",
    },
    {
      id: 7,
      image: "https://s3-ap-south-1.amazonaws.com/ricedigitals3bucket/AUPortalContent/2022/09/14160420/Number-Theory-2.png",
      altText: "Global Politics Illustration",
      title: "Contemporary World",
      subtitle: "SOC102",
      link: "https://facebook.com",
    },
  ];

  return (
    <Box px="32px" py="16px" display="flex" flexDirection="column" gap="30px">
      <Heading size="md">Dashboard</Heading>
      <Flex wrap="wrap" gap="30">
        {cardInfos.map((cardInfo) => (
          <CardTemplate key={cardInfo.id} cardInfo={cardInfo} />
        ))}
      </Flex>
    </Box>
  )
}

export default Dashboard;
