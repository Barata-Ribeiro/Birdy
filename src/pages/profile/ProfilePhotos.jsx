import { useEffect, useState } from "react";
import { FaEye, FaHeart, FaRegComments } from "react-icons/fa";

import Head from "../../components/helpers/Head";
import Image from "../../components/helpers/Image";

const ProfilePhotos = () => {
	const [randomNumbers, setRandomNumbers] = useState([]);
	const [hoveredNumber, setHoveredNumber] = useState(null);

	useEffect(() => {
		const generateRandomNumbers = () => {
			const uniqueRandomNumbers = new Set();
			while (uniqueRandomNumbers.size < 16) {
				const randomNumber = Math.floor(Math.random() * 1000) + 1;
				if (!uniqueRandomNumbers.has(randomNumber))
					uniqueRandomNumbers.add(randomNumber);
				else generateRandomNumbers();
			}
			setRandomNumbers(Array.from(uniqueRandomNumbers));
		};

		generateRandomNumbers();
	}, []);

	return (
		<section className="my-4">
			<Head
				title="Your Photos"
				description="In this page you'll find all the photos you have uploaded."
			/>

			<ul className="masonry sm:masonry-sm md:masonry-md px-4 sm:px-0 [&>li:not(:first-child)]:mt-4">
				{randomNumbers.map((number) => (
					<li key={number} className="break-inside">
						<a
							href=""
							className="relative"
							onMouseEnter={() => setHoveredNumber(number)}
							onMouseLeave={() => setHoveredNumber(null)}
						>
							<div
								className={`text-mantis-50 absolute inset-0 !h-full !w-full items-end justify-around gap-4 rounded-md bg-black/60 pb-4 ${
									hoveredNumber === number ? "flex" : "hidden"
								}`}
							>
								<span className="flex items-center gap-2">
									<FaEye />
									{Math.floor(Math.random() * 100000)}
								</span>
								<span className="flex items-center gap-2">
									<FaHeart />
									{Math.floor(Math.random() * 10000)}
								</span>
								<span className="flex items-center gap-2">
									<FaRegComments />
									{Math.floor(Math.random() * 1000)}
								</span>
							</div>
							<Image
								alt=""
								className="rounded-md object-cover"
								src={`https://source.unsplash.com/random/${number}/?bird`}
							/>
						</a>
					</li>
				))}
			</ul>
		</section>
	);
};

export default ProfilePhotos;
