import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	status: "idle",
	results: [],
	error: null,
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
	try {
		const response = await axios.get(
			"https://jsonplaceholder.typicode.com/users"
		);

		return response.data;
	} catch (err) {
		return err.message;
	}
});

const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {},
	extraReducers: {
		[fetchUsers.pending]: (state, action) => {
			state.status = "loading";
		},
		[fetchUsers.fulfilled]: (state, action) => {
			state.status = "succeeded";
			state.results = action.payload;
		},
		[fetchUsers.rejected]: (state, action) => {
			state.status = "error";
			state.error = action.error.message;
		},
	},
});

export const selectAllUsers = (state) => state.users.results;
export const selectOneUser = (state, userId) =>
	state.users.results.find((user) => user.id == userId);

export default usersSlice.reducer;
