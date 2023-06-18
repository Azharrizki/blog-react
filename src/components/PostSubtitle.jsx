import React from "react";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../features/users/usersSlice";
import { Text } from "@chakra-ui/react";

const PostSubtitle = ({ userId, children }) => {
	const users = useSelector(selectAllUsers);

	const author = users.find((user) => user.id == userId);

	return (
		<Text fontSize={"xs"}>
			by {author ? author.name : "Unknow author"}
			{children}
		</Text>
	);
};

export default PostSubtitle;
