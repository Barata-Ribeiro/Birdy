import { useEffect, useState } from "react";
import { FaEye, FaHeart, FaRegComments, FaUser } from "react-icons/fa";
import Image from "../components/helpers/Image";

const User = () => {
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
		<>
			<div className="bg-mantis-100 pb-4">
				<div className="h-[250px] w-full bg-[url('https://source.unsplash.com/random/?bird')] bg-cover bg-center"></div>
				<div className="-mt-20 flex flex-col items-center">
					<img
						src="https://source.unsplash.com/random/?selfie"
						className="border-green-spring-50 h-40 w-40 rounded-full border-4 object-cover"
					/>
					<div className="mt-2 flex items-center space-x-2">
						<p className="text-2xl">User Name</p>
						<FaUser />
					</div>
					<p className="text-green-spring-700">
						Photos: {Math.floor(Math.random() * 100000)}
					</p>
					<p className="text-green-spring-700 mb-3 mt-1 max-w-md text-center">
						Sed ut perspiciatis unde omnis iste natus error sit voluptatem
						accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
						quae ab illo inventore
					</p>
				</div>
			</div>
			<section className="my-4">
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
		</>
	);
};

export default User;
