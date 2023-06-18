import { Text, Input, Select } from "@chakra-ui/react";
import React from "react";

const InputForm = ({
	isSelected,
	title,
	value,
	handleChange,
	placeholder,
	defaultValue,
	children,
}) => {
	return (
		<>
			<Text>{title}</Text>
			{isSelected ? (
				<Select onChange={handleChange} defaultValue={defaultValue}>
					{children}
				</Select>
			) : (
				<Input
					value={value}
					onChange={handleChange}
					placeholder={placeholder}
				/>
			)}
		</>
	);
};

export default InputForm;
