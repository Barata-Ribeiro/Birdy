import { useState } from "react";
import { FaEye, FaHeart, FaRegComments } from "react-icons/fa";
import { useSelector } from "react-redux";
import Image from "../helpers/Image";

const FeedPhotos = () => {
	const [imageHovered, setImageHovered] = useState(false);
	const { list } = useSelector((state) => state.feed);
	return (
		<ul className="masonry sm:masonry-sm md:masonry-md px-4 sm:px-0 [&>li:not(:first-child)]:mt-4">
			{list.map((photo) => (
				<li key={photo.id} className="break-inside">
					<a
						href=""
						className="relative"
						onPointerEnter={() => setImageHovered(true)}
						onPointerLeave={() => setImageHovered(false)}
						onMouseEnter={() => setImageHovered(true)}
						onMouseLeave={() => setImageHovered(false)}
					>
						<div
							className={`absolute inset-0 h-full w-full items-end justify-around gap-4 rounded-md bg-black/60 pb-4 text-mantis-50 ${
								imageHovered ? "flex" : "hidden"
							}`}
						>
							<span className="flex items-center gap-2">
								<FaEye />
								{photo.meta.total_hits}
							</span>
							<span className="flex items-center gap-2">
								<FaHeart />
								{photo.meta.total_likes}
							</span>
							<span className="flex items-center gap-2">
								<FaRegComments />
								{photo.meta.total_comments}
							</span>
						</div>
						<Image
							alt={`Photo Title: ${photo.title}, from ${photo.authorName}`}
							className="rounded-md object-cover"
							src={photo.imageUrl}
						/>
					</a>
				</li>
			))}
		</ul>
	);
};

export default FeedPhotos;
