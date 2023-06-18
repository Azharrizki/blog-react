import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";

const initialState = {
	status: "idle",
	results: [],
	error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
	try {
		const response = await axios.get(
			"https://jsonplaceholder.typicode.com/posts"
		);

		return response.data;
	} catch (error) {
		return error.message;
	}
});

export const addPost = createAsyncThunk(
	"posts/addPost",
	async (initialPost) => {
		try {
			const response = await axios.post(
				"https://jsonplaceholder.typicode.com/posts",
				initialPost
			);

			return response.data;
		} catch (error) {
			return err.message;
		}
	}
);

export const editPost = createAsyncThunk(
	"posts/editPost",
	async (initialPost) => {
		try {
			const response = await axios.put(
				`https://jsonplaceholder.typicode.com/posts/${initialPost.id}`,
				initialPost
			);

			console.log("berhasil update data");

			return response.data;
		} catch (error) {
			return initialPost;
		}
	}
);

export const deletePost = createAsyncThunk(
	"posts/deletePost",
	async (initialPost) => {
		try {
			const response = await axios.delete(
				`https://jsonplaceholder.typicode.com/posts/${initialPost.id}`
			);

			return initialPost;
		} catch (error) {
			return error.message;
		}
	}
);

const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		postAdded(state, action) {
			state.results.push(action.payload);
		},
		reactionAdded(state, action) {
			const { postId, reaction } = action.payload;
			const existingPost = state.results.find((post) => post.id === postId);
			if (existingPost) {
				existingPost.reactions[reaction]++;
			}
		},
	},
	extraReducers: {
		[fetchPosts.pending]: (state, action) => {
			state.status = "loading";
		},
		[fetchPosts.fulfilled]: (state, action) => {
			state.status = "succeeded";
			let min = 1;
			state.results = action.payload.map((post) => {
				post.date = sub(new Date(), { minutes: min++ }).toISOString();
				post.reactions = {
					thumbsUp: 0,
					wow: 0,
					heart: 0,
					rocket: 0,
					coffee: 0,
				};
				return post;
			});
		},
		[fetchPosts.rejected]: (state, action) => {
			state.status = "error";
			state.error = action.error.message;
		},
		[addPost.pending]: (state, action) => {
			state.status = "loading";
		},
		[addPost.fulfilled]: (state, action) => {
			state.status = "succeeded";
			state.results = [...state.results, action.payload];
		},
		[addPost.rejected]: (state, action) => {
			state.status = "error";
			state.error = action.error.message;
		},
		[editPost.pending]: (state, action) => {
			state.status = "loading";
		},
		[editPost.fulfilled]: (state, action) => {
			state.status = "succeeded";
			const existingPost = state.results.find(
				(post) => post.id == action.payload.id
			);

			if (existingPost) {
				existingPost.title = action.payload.title;
				existingPost.body = action.payload.body;
				existingPost.date = action.payload.date;
				existingPost.userId = action.payload.userId;
				existingPost.reactions = action.payload.reactions;
			}
		},
		[editPost.rejected]: (state, action) => {
			state.status = "error";
			state.error = action.error.message;
		},
		[deletePost.pending]: (state, action) => {
			state.status = "loading";
		},
		[deletePost.fulfilled]: (state, action) => {
			state.status = "succeeded";
			const filterPost = state.results.filter(
				(post) => post.id != action.payload.id
			);

			state.results = filterPost;
		},
		[deletePost.rejected]: (state, action) => {
			state.status = "error";
			state.error = action.error.message;
		},
	},
});

export const selectAllPosts = (state) => state.posts.results;
export const getAllPost = (state, userId) =>
	state.posts.results.filter((post) => post.userId == userId);
export const getOnePost = (state, postId) =>
	state.posts.results.find((post) => post.id == postId);
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const { postAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
