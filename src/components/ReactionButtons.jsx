import React from "react";
import { useDispatch } from "react-redux";
import { reactionAdded } from "../features/posts/postsSlice";

const reactionEmoji = [
	{ name: "thumbsUp", emoji: "👍" },
	{ name: "wow", emoji: "😯" },
	{ name: "heart", emoji: "🧡" },
	{ name: "rocket", emoji: "🚀" },
	{ name: "coffee", emoji: "☕" },
];

const ReactionButtons = ({ post }) => {
	const dispatch = useDispatch();

	return (
		<div>
			{reactionEmoji.map((emoji) => (
				<button
					style={{ padding: "4px" }}
					key={emoji.name}
					type="button"
					onClick={() =>
						dispatch(
							reactionAdded({
								postId: post.id,
								reaction: emoji.name,
							})
						)
					}
				>
					{emoji.emoji} {post.reactions[emoji.name]}
				</button>
			))}
		</div>
	);
};

export default ReactionButtons;
