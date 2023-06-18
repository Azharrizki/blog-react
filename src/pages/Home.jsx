import React from "react";
import PostsList from "../components/PostsList";
import AddPostsForm from "../components/AddPostsForm";
import { Grid, GridItem } from "@chakra-ui/react";
import Navbar from "../components/Navbar";

const Home = () => {
	return (
		<>
			<Navbar />
			<Grid
				templateColumns={"repeat(4, 1fr)"}
				gap={10}
				placeContent={"center"}
				m={10}
			>
				<GridItem colSpan={3}>
					<PostsList />
				</GridItem>
				<GridItem colSpan={1}>
					<AddPostsForm />
				</GridItem>
			</Grid>
		</>
	);
};

export default Home;
