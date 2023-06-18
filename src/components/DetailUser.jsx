import { Box, Flex, Grid, Heading, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getAllPost } from "../features/posts/postsSlice";
import { Link2 } from "feather-icons-react/build/IconComponents";

const DetailUser = () => {
	const { userId } = useParams();
	const posts = useSelector((state) => getAllPost(state, userId));

	return (
		<Grid templateColumns={"repeat(5,1fr)"} m={10} gap={4}>
			{posts &&
				posts.map((post) => (
					<Box border={"1px"} rounded={"12px"} p={4}>
						<Heading fontSize={"lg"} mb={4}>
							{post.title.slice(0, 20)}...
						</Heading>
						<Text>{post.body.slice(0, 60)}...</Text>
						<Link to={`/edit/${post.id}`}>
							<IconButton icon={<Link2 />} />
						</Link>
					</Box>
				))}
		</Grid>
	);
};

export default DetailUser;
