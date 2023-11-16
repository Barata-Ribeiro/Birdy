import { useState } from "react";
import { BiSolidPhotoAlbum } from "react-icons/bi";
import { FaChartPie, FaSignOutAlt, FaUpload } from "react-icons/fa";
import { FaUser, FaUserTie } from "react-icons/fa6";
import { MdAdminPanelSettings } from "react-icons/md";
import { Link, Navigate, Route, Routes, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import DeleteProfileModal from "../../components/DeleteProfileModal";
// import EditProfileModal from "../../components/EditProfileModal";
import MainButton from "../../components/shared/MainButton";
import useFetch from "../../hooks/useFetch";
import NotFound from "../NotFound";
import ProfileAdmin from "./ProfileAdmin";
import ProfileStats from "./ProfileStats";
import ProfileUpload from "./ProfileUpload";

import Loading from "../../components/helpers/Loading";
import { userLogout } from "../../store/slices/user.slice";
import ProfilePhotos from "./ProfilePhotos";

const Dashboard = () => {
	const { username } = useParams();
	const [editModal, setEditModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);

	const dispatch = useDispatch();
	const { data, loading } = useSelector((state) => state.user);

	const { loading: fetchLoading, error: fetchError, request } = useFetch();

	const handleEditModal = (e) => {
		e.preventDefault();
		setEditModal(!editModal);
	};

	const handleDeleteModal = (e) => {
		e.preventDefault();
		setDeleteModal(!deleteModal);
	};

	if (!data || username !== data.username) return <Navigate to="/sign/in" />;
	if (loading || fetchLoading) return <Loading />;
	return (
		<>
			{/* <EditProfileModal isOpen={editModal} onClose={handleEditModal} /> */}
			<DeleteProfileModal isOpen={deleteModal} onClose={handleDeleteModal} />
			<div className="bg-mantis-100 pb-8">
				<div
					style={{ backgroundImage: `url('${data.coverImageUrl}')` }}
					className={`h-[250px] w-full bg-cover bg-center `}
				></div>
				<div className="-mt-20 flex flex-col items-center">
					<img
						src={data.avatarUrl}
						alt={`${data.username}, this is your avatar.`}
						title={`${data.username}, this is your avatar.`}
						className="aspect-square h-40 w-40 rounded-full border-4 border-green-spring-50 object-cover object-center align-middle italic"
					/>
					<div className="mt-2 flex items-center space-x-2">
						<Link
							to={`/user/${data.id}/${data.username}`}
							className="font-body text-2xl"
						>
							{data.username}
						</Link>
						{data.role === "admin" ? (
							<FaUserTie size={18} />
						) : (
							<FaUser size={18} />
						)}
					</div>
					<p className="text-green-spring-700">{data.email}</p>
					<p className="mb-3 mt-1 max-w-md text-center text-green-spring-700">
						{data.biography}
					</p>
					<ul className="flex flex-col items-center gap-3 sm:flex-row sm:gap-2">
						<li>
							<p className="text-sm text-green-spring-500">
								{data.totalPhotos} Photo(s)
							</p>
						</li>
						<li className="hidden sm:block">|</li>
						<li>
							<button
								// onClick={handleEditModal}
								className="text-sm text-green-spring-500 disabled:cursor-not-allowed disabled:line-through"
								title="Edit Profile temporarily disabled"
								aria-label="Edit Profile temporarily disabled"
								disabled
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
							to={`/dashboard/${data.username}`}
							customClasses={"flex gap-2 items-center px-4 py-2 text-sm"}
						>
							<BiSolidPhotoAlbum size={18} />
							<span className="max-sm:hidden">Photos</span>
						</MainButton>
						<MainButton
							to={`../dashboard/${data.username}/admin-panel`}
							customClasses={"flex gap-2 items-center px-4 py-2 text-sm"}
						>
							<MdAdminPanelSettings size={18} />{" "}
							<span className="max-sm:hidden">Admin</span>
						</MainButton>
						<MainButton
							to={`../dashboard/${data.username}/stats`}
							customClasses={"flex gap-2 items-center px-4 py-2 text-sm"}
						>
							<FaChartPie size={18} />
							<span className="max-sm:hidden">Stats</span>
						</MainButton>
						<MainButton
							to={`../dashboard/${data.username}/upload`}
							customClasses={"flex gap-2 items-center px-4 py-2 text-sm"}
						>
							<FaUpload size={18} />
							<span className="max-sm:hidden">New Post</span>
						</MainButton>
						<MainButton
							onClick={() => dispatch(userLogout())}
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
				<Route path="/admin-panel" element={<ProfileAdmin />} />
				<Route path="/stats" element={<ProfileStats />} />
				<Route path="/upload" element={<ProfileUpload />} />
				<Route path="*" element={<NotFound hideImage={true} />} />
			</Routes>
		</>
	);
};

export default Dashboard;
