import React from "react";
import { Card, Heading, Text, Flex, Box } from "rebass";
import { TiStar } from "react-icons/ti";

import { IRepositoryCardProps } from "../types";

export default ({
  repository: { name, description, htmlUrl, stargazersCount },
}: IRepositoryCardProps) => (
  <a target="_blank" rel="noopener noreferrer" href={htmlUrl}>
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
  </a>
);
