import React from "react";
import { FaChartPie, FaUpload, FaSignOutAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";

import Image from "../../components/helpers/Image";
import MainButton from "../../components/shared/MainButton";
import EditProfileModal from "./EditProfileModal";

const Dashboard = () => {
	const [modal, setModal] = React.useState(false);

	const handleModal = (e?: React.MouseEvent) => {
		e?.preventDefault();
		setModal(!modal);
	};

	return (
		<>
			<EditProfileModal
				isOpen={modal}
				onClose={handleModal}
				onSubmit={() => {
					console.log("Data updated");
					handleModal();
				}}
			/>
			<div className="bg-mantis-100 pb-8">
				<div className="h-[250px] w-full bg-[url('https://source.unsplash.com/random/?bird')] bg-cover bg-center"></div>
				<div className="-mt-20 flex flex-col items-center">
					<img
						src="https://source.unsplash.com/random/?selfie"
						className="h-40 w-40 rounded-full border-4 border-white object-cover"
					/>
					<div className="mt-2 flex items-center space-x-2">
						<p className="text-2xl">User Name</p>
						<FaUser />
					</div>
					<p className="text-green-spring-700">jasonbourne@cia.com</p>
					<p className="mb-3 mt-1 max-w-md text-center text-green-spring-700">
						Sed ut perspiciatis unde omnis iste natus error sit voluptatem
						accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
						quae ab illo inventore
					</p>
					<ul className="flex items-center gap-2">
						<li>
							<p className="text-sm text-green-spring-500">239847 Photos</p>
						</li>
						<li>|</li>
						<li>
							<button
								onClick={handleModal}
								className="text-sm text-green-spring-500"
							>
								Edit Profile
							</button>
						</li>
					</ul>
				</div>
				<div className="mt-2 flex flex-1 flex-col items-center justify-end px-8 lg:items-end">
					<div className="mt-2 flex shrink-0 flex-wrap items-center justify-center gap-2 whitespace-nowrap">
						<MainButton
							to={"/stats"}
							customClasses={"flex gap-2 items-center px-4 py-2 text-sm"}
						>
							<FaChartPie /> Stats
						</MainButton>
						<MainButton
							to={"/upload"}
							customClasses={"flex gap-2 items-center px-4 py-2 text-sm"}
						>
							<FaUpload /> Upload Photo
						</MainButton>
						<MainButton
							onClick={() => alert("You have been logged out")}
							to={"/sign/in"}
							customClasses={"flex gap-2 items-center px-4 py-2 text-sm"}
						>
							<FaSignOutAlt /> Sign Out
						</MainButton>
					</div>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
