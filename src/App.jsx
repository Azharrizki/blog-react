import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import User from "./pages/User";
import Detail from "./pages/Detail";
import UserDetail from "./pages/UserDetail";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchPosts,
	getPostsStatus,
	selectAllPosts,
} from "./features/posts/postsSlice";
import { fetchComments } from "./features/comments/commentsSlice";
import { selectAllUsers } from "./features/users/usersSlice";

const App = () => {
	const dispatch = useDispatch();
	const posts = useSelector(selectAllPosts);
	const users = useSelector(selectAllUsers);

	useEffect(() => {
		dispatch(fetchPosts());
		dispatch(fetchComments());
	}, []);

	return (
		<main>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/edit/:postId" element={<Detail />} />
				<Route path="/users" element={<User />} />
				<Route path="/users/:userId" element={<UserDetail />} />
			</Routes>
		</main>
	);
};

export default App;
