import React from "react";
import PostSubtitle from "./PostSubtitle";
import PostTime from "./PostTime";
import ReactionButtons from "./ReactionButtons";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const CardPost = ({ post }) => {
	return (
		<Flex
			flexDir={"column"}
			gap={1}
			px={3}
			py={2}
			key={post.id}
			border={"1px"}
			borderColor={"blue.500"}
			borderRadius={"12px"}
		>
			<Flex>
				<Heading fontFamily={"monospace"} size="md" textTransform="uppercase">
					<Link to={`edit/${post.id}`}>{post.title}</Link>
				</Heading>
			</Flex>
			<Text pt="2" fontSize="sm">
				{post.body.substring(0, 100)}
			</Text>
			<Box>
				<PostSubtitle userId={post.userId}>
					<PostTime timestamp={post.date} />
				</PostSubtitle>
			</Box>
			<ReactionButtons post={post} />
		</Flex>
	);
};

export default CardPost;
