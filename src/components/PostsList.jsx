import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchPosts,
	getPostsError,
	getPostsStatus,
	selectAllPosts,
} from "../features/posts/postsSlice";
import { SimpleGrid } from "@chakra-ui/react";
import CardPost from "./CardPost";
import { fetchComments } from "../features/comments/commentsSlice";

const PostsList = () => {
	const dispatch = useDispatch();
	const status = useSelector(getPostsStatus);
	const error = useSelector(getPostsError);
	const posts = useSelector(selectAllPosts);

	useEffect(() => {
		if (status === "idle") {
			dispatch(fetchPosts());
			dispatch(fetchComments());
		}
	}, [status]);

	let content;

	if (status === "loading") {
		content = <p>Loading...</p>;
	} else if (status === "succeeded") {
		const orderedPosts = posts
			.slice()
			.sort((a, b) => b.date.localeCompare(a.date));

		content = orderedPosts.map((post, index) => (
			<CardPost key={index} post={post} />
		));
	} else if (status === "error") {
		content = <p>{error}</p>;
	}

	return (
		<SimpleGrid columns={3} spacing={4}>
			{content}
		</SimpleGrid>
	);
};

export default PostsList;
