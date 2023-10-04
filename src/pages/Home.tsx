import { useState, useEffect } from "react";

import { FaEye, FaHeart, FaRegComments } from "react-icons/fa";

import Image from "../components/common/Image";
import Head from "../components/common/Head";

const Home = () => {
	const [randomNumbers, setRandomNumbers] = useState<number[]>([]);
	const [hoveredNumber, setHoveredNumber] = useState<number | null>(null);

	useEffect(() => {
		const generateRandomNumbers = () => {
			const uniqueRandomNumbers = new Set<number>();
			while (uniqueRandomNumbers.size < 15) {
				const randomNumber = Math.floor(Math.random() * 100) + 1;
				uniqueRandomNumbers.add(randomNumber);
			}
			setRandomNumbers(Array.from(uniqueRandomNumbers));
		};

		generateRandomNumbers();
	}, []);

	return (
		<section className="container">
			<Head
				title="Feed"
				description="Welcome to the Birdy social network! This is the feed with all the photos from our users."
			/>

			<ul className="my-4 columns-1 gap-2 sm:columns-2 sm:gap-4 md:columns-3 lg:columns-4 [&>li:not(:first-child)]:mt-4">
				{randomNumbers.map((number) => (
					<li key={number}>
						<a
							href=""
							className="relative"
							onMouseEnter={() => setHoveredNumber(number)}
							onMouseLeave={() => setHoveredNumber(null)}
						>
							<div
								className={`absolute inset-0 h-full w-full items-end justify-around gap-4 rounded-md bg-black/60 pb-4 text-mantis-50 ${
									hoveredNumber === number ? "flex" : "hidden"
								}`}
							>
								<span className="flex items-center gap-2">
									<FaEye />
									95398
								</span>
								<span className="flex items-center gap-2">
									<FaHeart />
									4356
								</span>
								<span className="flex items-center gap-2">
									<FaRegComments />
									324
								</span>
							</div>
							<Image
								alt=""
								className="rounded-md"
								src={`https://source.unsplash.com/random/${number}`}
							/>
						</a>
					</li>
				))}
			</ul>
		</section>
	);
};

export default Home;
