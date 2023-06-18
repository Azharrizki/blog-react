import { formatDistance, formatDistanceToNow, parseISO } from "date-fns";

const PostTime = ({ timestamp }) => {
	let timeAgo = "";
	if (timestamp) {
		const date = parseISO(timestamp);
		const timePeriod = formatDistanceToNow(date);
		timeAgo = `- ${timePeriod} ago`;
	}

	return (
		<span title="timestamp">
			&nbsp; <i>{timeAgo}</i>
		</span>
	);
};

export default PostTime;