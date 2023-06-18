import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	status: "idle",
	results: [],
	error: null,
};

export const fetchComments = createAsyncThunk(
	"comments/fetchComments",
	async () => {
		try {
			const res = await axios.get(
				`https://jsonplaceholder.typicode.com/comments`
			);

			return res.data;
		} catch (err) {
			return err.message;
		}
	}
);

const comments = createSlice({
	name: "comments",
	initialState,
	reducers: {},
	extraReducers: {
		[fetchComments.pending]: (state, action) => {
			state.status = "loading";
		},
		[fetchComments.fulfilled]: (state, action) => {
			state.status = "succeeded";
			state.results = action.payload;
		},
	},
});

export const getCommentStatus = (state) => state.comments.status;
export const getCommentsById = (state, postId) =>
	state.comments.results.filter((comment) => comment.postId == postId);

export default comments.reducer;
