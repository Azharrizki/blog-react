import { Button, Select, Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { addPost, postAdded } from "../features/posts/postsSlice";
import { fetchUsers, selectAllUsers } from "../features/users/usersSlice";
import InputForm from "./InputForm";

const AddPostsForm = () => {
	const dispatch = useDispatch();
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [userId, setUserId] = useState("");

	const users = useSelector(selectAllUsers);

	const handleSubmit = (e) => {
		e.preventDefault();
		try {
			dispatch(
				addPost({
					id: nanoid(),
					title,
					body: content,
					userId,
					date: new Date().toISOString(),
					reactions: {
						thumbsUp: 0,
						wow: 0,
						heart: 0,
						rocket: 0,
						coffee: 0,
					},
				})
			);

			setTitle("");
			setContent("");
			setUserId("");
		} catch (err) {
			console.log(err.message);
		}
	};

	useEffect(() => {
		dispatch(fetchUsers());
	}, []);

	return (
		<section>
			<form>
				<Stack>
					<InputForm
						title={"Title"}
						value={title}
						handleChange={(e) => setTitle(e.target.value)}
						placeholder={"Masukan title blog..."}
					/>
					<InputForm
						isSelected
						title={"Author"}
						handleChange={(e) => setUserId(e.target.value)}
					>
						<option value="">Pilih author...</option>
						{users.map((user) => (
							<option key={user.id} value={user.id}>
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
					<Button colorScheme="blue" type="submit" onClick={handleSubmit}>
						Simpan Post
					</Button>
				</Stack>
			</form>
		</section>
	);
};

export default AddPostsForm;
