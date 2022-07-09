import { Flex, Icon, Box, Text } from "@chakra-ui/react";
import { IoIosStar, IoIosStarOutline, IoIosStarHalf } from "react-icons/io";

const Rating = ({ value, text, color = "red.500" }) => {
  return (
    <Flex align="flex-start">
      <Box mr="2">
        <Icon
          color={color}
          as={
            value >= 1
              ? IoIosStar
              : value >= 0.5
              ? IoIosStarHalf
              : IoIosStarOutline
          }
        />
        <Icon
          color={color}
          as={
            value >= 2
              ? IoIosStar
              : value >= 1.5
              ? IoIosStarHalf
              : IoIosStarOutline
          }
        />
        <Icon
          color={color}
          as={
            value >= 3
              ? IoIosStar
              : value >= 2.5
              ? IoIosStarHalf
              : IoIosStarOutline
          }
        />
        <Icon
          color={color}
          as={
            value >= 4
              ? IoIosStar
              : value >= 3.5
              ? IoIosStarHalf
              : IoIosStarOutline
          }
        />
        <Icon
          color={color}
          as={
            value >= 5
              ? IoIosStar
              : value >= 4.5
              ? IoIosStarHalf
              : IoIosStarOutline
          }
        />
      </Box>
      <Text>{text}</Text>
    </Flex>
  );
};
export default Rating;
