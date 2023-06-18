import { Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import Navbar from "../components/Navbar";
import UserList from "../components/UserList";

const User = () => {
	return (
		<>
			<Navbar />
			<Grid m={10} templateColumns={"repeat(4, 1fr)"} gap={6}>
				<GridItem colSpan={3}>
					<UserList />
				</GridItem>
				<GridItem colSpan={1}>Info User</GridItem>
			</Grid>
		</>
	);
};

export default User;
