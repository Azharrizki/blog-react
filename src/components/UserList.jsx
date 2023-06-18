import {
	Flex,
	IconButton,
	Table,
	TableCaption,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllUsers } from "../features/users/usersSlice";
import { BookOpen, Clock } from "feather-icons-react/build/IconComponents";
import { Link } from "react-router-dom";

const UserList = () => {
	const users = useSelector(selectAllUsers);

	return (
		<>
			<TableContainer border={"1px"} rounded={"12px"} borderColor={"gray.100"}>
				<Table>
					<Thead>
						<Tr>
							<Th>No</Th>
							<Th>Nama</Th>
							<Th>Username</Th>
							<Th>Action</Th>
						</Tr>
					</Thead>
					<Tbody>
						{users &&
							users.map((user) => (
								<Tr>
									<Td>{user.id}</Td>
									<Td>{user.name}</Td>
									<Td>{user.username}</Td>
									<Td>
										<Flex gap={4}>
											<Link to={`/users/${user.id}`}>
												<IconButton icon={<BookOpen />} />
											</Link>
										</Flex>
									</Td>
								</Tr>
							))}
					</Tbody>
				</Table>
			</TableContainer>
		</>
	);
};

export default UserList;
