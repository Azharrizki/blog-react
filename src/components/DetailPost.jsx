import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllUsers, selectOneUser } from "../features/users/usersSlice";
import {
	Box,
	Button,
	Divider,
	Flex,
	Heading,
	IconButton,
	Stack,
	Text,
} from "@chakra-ui/react";

import { deletePost, editPost, getOnePost } from "../features/posts/postsSlice";
import { useNavigate, useParams } from "react-router-dom";
import { getCommentsById } from "../features/comments/commentsSlice";
import PostTime from "./PostTime";
import { ArrowLeft, Heart } from "feather-icons-react/build/IconComponents";
import MessageCircle from "feather-icons-react/build/IconComponents/MessageCircle";
import Edit2 from "feather-icons-react/build/IconComponents/Edit2";
import InputForm from "./InputForm";
import X from "feather-icons-react/build/IconComponents/X";

const DetailPost = () => {
	const { postId } = useParams();
	const dispatch = useDispatch();
	const users = useSelector(selectAllUsers);
	const post = useSelector((state) => getOnePost(state, postId));
	const user = useSelector((state) => selectOneUser(state, post.userId));
	const comment = useSelector((state) => getCommentsById(state, postId));
	const [isEdit, setIsEdit] = useState(false);

	const [title, setTitle] = useState(post.title);
	const [userId, setUserId] = useState(post.userId);
	const [content, setContent] = useState(post.body);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await dispatch(
				editPost({
					id: post.id,
					title,
					body: content,
					userId,
					date: new Date().toISOString(),
					reactions: post.reactions,
				})
			);
			setIsEdit((state) => !state);
		} catch (err) {
			console.log(err.message);
		}
	};

	return (
		<Flex flexDir={"column"} alignContent={"center"} maxW={"xl"}>
			{isEdit ? (
				<>
					<Stack gap={4}>
						<Heading mb={2}>
							EDIT POSTINGAN{" "}
							<IconButton
								onClick={() => setIsEdit((state) => !state)}
								size={"xs"}
								icon={<X />}
							/>
						</Heading>
						<InputForm
							title={"Title"}
							value={title}
							handleChange={(e) => setTitle(e.target.value)}
							placeholder={"Masukan title blog..."}
						/>
						<InputForm
							isSelected
							title={"Author"}
							value={userId}
							handleChange={(e) => setUserId(e.target.value)}
						>
							<option>Pilih author...</option>
							{users &&
								users.map((user) => (
									<option
										key={user.id}
										value={user.id}
										selected={post.userId == user.id}
									>
										{user.name}
									</option>
								))}
						</InputForm>
						<InputForm
							title={"Content"}
							value={content}
							handleChange={(e) => setContent(e.target.value)}
							placeholder={"Masukan content blog..."}
						/>
						<Button colorScheme="blue" onClick={handleSubmit}>
							Simpan Post
						</Button>
					</Stack>
				</>
			) : (
				<>
					<Heading mb={6}>
						{post.title.toUpperCase()}{" "}
						<IconButton
							onClick={() => setIsEdit((state) => !state)}
							size={"sm"}
							icon={<Edit2 />}
						/>
					</Heading>
					<Flex fontWeight={600} mb={6}>
						{user.name}
						<PostTime timestamp={post.date} />
					</Flex>
					<Divider mb={2.5} />
					<Flex mb={2.5} gap={6}>
						<Flex gap={2} fontWeight={600}>
							<Heart /> {post.reactions.heart}
						</Flex>
						<Flex gap={2} fontWeight={600}>
							<MessageCircle /> {comment.length}
						</Flex>
					</Flex>
					<Divider mb={6} />
					<Text mb={6}>{post.body}</Text>
				</>
			)}

			<Divider mb={6} />
			<Flex flexDir={"column"} gap={4}>
				{comment &&
					comment.map((c) => (
						<Box
							key={c.id}
							p={4}
							border={"1px"}
							borderColor={"gray.100"}
							borderRadius={"16px"}
						>
							<Text fontSize={"md"} fontWeight={600}>
								{c.email}
							</Text>
							<Text>{c.body}</Text>
						</Box>
					))}
			</Flex>
		</Flex>
	);
};

export default DetailPost;
