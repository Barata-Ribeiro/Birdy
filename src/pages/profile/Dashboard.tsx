import { MouseEvent, useState } from "react";
import { BiSolidPhotoAlbum } from "react-icons/bi";
import { FaChartPie, FaSignOutAlt, FaUpload } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { MdAdminPanelSettings } from "react-icons/md";
import { Route, Routes } from "react-router-dom";

import DeleteProfileModal from "../../components/DeleteProfileModal";
import EditProfileModal from "../../components/EditProfileModal";
import MainButton from "../../components/shared/MainButton";
import useFetch from "../../hooks/useFetch";
import { useAppDispatch, useAppSelector } from "../../store/redux-hooks";
import NotFound from "../NotFound";
import ProfileAdmin from "./ProfileAdmin";
import ProfilePhotos from "./ProfilePhotos";
import ProfileStats from "./ProfileStats";
import ProfileUpload from "./ProfileUpload";

const Dashboard = () => {
	const [editModal, setEditModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);

	const dispatch = useAppDispatch();
	const {
		data,
		loading: reduxLoading,
		error: reduxError,
	} = useAppSelector((state) => state.user);

	const { loading: fetchLoading, error: fetchError, request } = useFetch();

	const handleEditModal = (e?: MouseEvent) => {
		e?.preventDefault();
		setEditModal(!editModal);
	};

	const handleDeleteModal = (e?: MouseEvent) => {
		e?.preventDefault();
		setDeleteModal(!deleteModal);
	};

	return (
		<>
			<EditProfileModal
				isOpen={editModal}
				onClose={handleEditModal}
				onSubmit={() => {
					console.log("Data updated");
					handleEditModal();
				}}
			/>
			<DeleteProfileModal isOpen={deleteModal} onClose={handleDeleteModal} />
			<div className="bg-mantis-100 pb-8">
				<div className="h-[250px] w-full bg-[url('https://source.unsplash.com/random/?bird')] bg-cover bg-center"></div>
				<div className="-mt-20 flex flex-col items-center">
					<img
						src={data.avatarUrl}
						className="h-40 w-40 rounded-full border-4 border-green-spring-50 object-cover"
					/>
					<div className="mt-2 flex items-center space-x-2">
						<p className="text-2xl">{data.username}</p>
						<FaUser />
					</div>
					<p className="text-green-spring-700">{data.email}</p>
					<p className="mb-3 mt-1 max-w-md text-center text-green-spring-700">
						Sed ut perspiciatis unde omnis iste natus error sit voluptatem
						accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
						quae ab illo inventore
					</p>
					<ul className="flex flex-col items-center gap-3 sm:flex-row sm:gap-2">
						<li>
							<p className="text-sm text-green-spring-500">239847 Photos</p>
						</li>
						<li className="hidden sm:block">|</li>
						<li>
							<button
								onClick={handleEditModal}
								className="text-sm text-green-spring-500"
							>
								Edit Profile
							</button>
						</li>
						<li className="hidden sm:block">|</li>
						<li>
							<button
								onClick={handleDeleteModal}
								className="text-sm text-red-400"
							>
								Delete Account
							</button>
						</li>
					</ul>
				</div>
				<div className="mt-2 flex flex-1 flex-col items-center justify-end px-8 lg:items-end">
					<div className="mt-2 flex shrink-0 flex-wrap items-center justify-center gap-2 whitespace-nowrap">
						<MainButton
							to={"/dashboard"}
							customClasses={"flex gap-2 items-center px-4 py-2 text-sm"}
						>
							<BiSolidPhotoAlbum size={18} />
							<span className="max-sm:hidden">Photos</span>
						</MainButton>
						<MainButton
							to={"../dashboard/admin"}
							customClasses={"flex gap-2 items-center px-4 py-2 text-sm"}
						>
							<MdAdminPanelSettings size={18} />{" "}
							<span className="max-sm:hidden">Admin</span>
						</MainButton>
						<MainButton
							to={"../dashboard/stats"}
							customClasses={"flex gap-2 items-center px-4 py-2 text-sm"}
						>
							<FaChartPie size={18} />
							<span className="max-sm:hidden">Stats</span>
						</MainButton>
						<MainButton
							to={"../dashboard/upload"}
							customClasses={"flex gap-2 items-center px-4 py-2 text-sm"}
						>
							<FaUpload size={18} />
							<span className="max-sm:hidden">New Post</span>
						</MainButton>
						<MainButton
							onClick={() => alert("You have been logged out")}
							to={"/sign/in"}
							customClasses={"flex gap-2 items-center px-4 py-2 text-sm"}
						>
							<FaSignOutAlt size={18} />
							<span className="max-sm:hidden">Sign Out</span>
						</MainButton>
					</div>
				</div>
			</div>
			<Routes>
				<Route path="/" element={<ProfilePhotos />} />
				<Route path="/admin" element={<ProfileAdmin />} />
				<Route path="/stats" element={<ProfileStats />} />
				<Route path="/upload" element={<ProfileUpload />} />
				<Route path="*" element={<NotFound hideImage={true} />} />
			</Routes>
		</>
	);
};

export default Dashboard;
