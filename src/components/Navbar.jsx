import { Box, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<Flex justify={"space-between"} mx={10} my={6}>
			<Heading fontSize={"2xl"}>BLOG</Heading>
			<Flex gap={8} fontWeight={600}>
				<Link to={"/"}>Home</Link>
				<Link to={"/users"}>User</Link>
			</Flex>
		</Flex>
	);
};

export default Navbar;
