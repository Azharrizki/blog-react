import React from "react";
import { Grid } from "@chakra-ui/react";
import DetailPost from "../components/DetailPost";
import Navbar from "../components/Navbar";

const Detail = () => {
	return (
		<>
			<Navbar />
			<Grid gap={10} placeContent={"center"} m={10}>
				<DetailPost />
			</Grid>
		</>
	);
};

export default Detail;
