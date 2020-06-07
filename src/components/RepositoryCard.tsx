import React from "react";
import { Card, Heading, Text, Flex, Box } from "rebass";
import { TiStar } from "react-icons/ti";

import { IRepositoryCardProps } from "../types";

export default ({
  repository: { name, description, stargazersCount },
}: IRepositoryCardProps) => (
  <Card width={256}>
    <Flex mx={-2}>
      <Box width={1 / 2} px={2}>
        <Heading>{name}</Heading>
        <Text>{description}</Text>
      </Box>
      <Box width={1 / 2} px={2}>
        <Text>{stargazersCount}</Text>
        <TiStar />
      </Box>
    </Flex>
  </Card>
);
