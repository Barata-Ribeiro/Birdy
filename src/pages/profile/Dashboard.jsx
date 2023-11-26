import { Suspense, lazy, useEffect } from "react";
import { BiSolidPhotoAlbum } from "react-icons/bi";
import { FaChartPie, FaSignOutAlt, FaUpload } from "react-icons/fa";
import { FaUser, FaUserTie } from "react-icons/fa6";
import { MdAdminPanelSettings } from "react-icons/md";
import { Link, Navigate, Route, Routes, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import DeleteProfileModal from "../../components/DeleteProfileModal";
import EditProfileModal from "../../components/EditProfileModal";
import MainButton from "../../components/shared/MainButton";

// lazy loading pages
const NotFound = lazy(() => import("../NotFound"));
const ProfileAdmin = lazy(() => import("./ProfileAdmin"));
const ProfileStats = lazy(() => import("./ProfileStats"));
const ProfileUpload = lazy(() => import("./ProfileUpload"));

import Loading from "../../components/helpers/Loading";
import {
	closeDeleteModal,
	closeEditModal,
	openDeleteModal,
	openEditModal,
} from "../../store/slices/ui.slice";
import { userLogout } from "../../store/slices/user.slice";
import ProfilePhotos from "./ProfilePhotos";

const Dashboard = () => {
	const { username } = useParams();
	const { deleteModal, editModal } = useSelector((state) => state.ui);
	const { data, loading } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(closeDeleteModal());
		dispatch(closeEditModal());
	}, [dispatch]);

	const handleEditModalOpen = () => dispatch(openEditModal());
	const handleEditModalClose = () => dispatch(closeEditModal());
	const handleDeleteModalOpen = () => dispatch(openDeleteModal());
	const handleDeleteModalClose = () => dispatch(closeDeleteModal());

	const handleOutsideClick = ({ target, currentTarget }) => {
		if (target === currentTarget) handleDeleteModalClose();
	};

	if (!data || username !== data.username) return <Navigate to="/sign/in" />;
	if (loading) return <Loading />;
	return (
		<>
			<EditProfileModal
				isOpen={editModal}
				onClose={handleEditModalClose}
				onOutsideClick={handleOutsideClick}
			/>
			<DeleteProfileModal
				isOpen={deleteModal}
				onClose={handleDeleteModalClose}
				onOutsideClick={handleOutsideClick}
			/>
			<div className="bg-mantis-100 pb-8 dark:bg-mantis-800">
				<div
					style={{ backgroundImage: `url('${data.coverImageUrl}')` }}
					className="h-[250px] w-full bg-cover bg-center"
				></div>
				<div className="-mt-20 flex flex-col items-center">
					<img
						src={data.avatarUrl}
						alt={`${data.username}, this is your avatar.`}
						title={`${data.username}, this is your avatar.`}
						className="aspect-square h-40 w-40 rounded-full border-4 border-green-spring-50 object-cover object-center align-middle italic dark:border-mantis-800"
					/>
					<div className="mt-2 flex items-center space-x-2">
						<Link
							to={`/user/${data.id}/${data.username}`}
							className="font-body text-2xl dark:text-mantis-50"
						>
							{data.username}
						</Link>
						{data.role === "admin" ? (
							<FaUserTie size={18} />
						) : (
							<FaUser size={18} />
						)}
					</div>
					<p className="text-green-spring-700 dark:text-mantis-300">
						{data.email}
					</p>
					<p className="mb-3 mt-1 max-w-md text-center text-green-spring-700 dark:text-mantis-300">
						{data.biography}
					</p>
					<ul className="flex flex-col items-center gap-3 sm:flex-row sm:gap-2">
						<li>
							<p className="text-sm text-green-spring-500 dark:text-mantis-200">
								{data.totalPhotos} Photo(s)
							</p>
						</li>
						<li className="hidden sm:block">|</li>
						<li>
							<button
								onClick={handleEditModalOpen}
								className="text-sm text-green-spring-500 dark:text-mantis-200"
							>
								Edit Profile
							</button>
						</li>
						<li className="hidden sm:block">|</li>
						<li>
							<button
								onClick={handleDeleteModalOpen}
								className="text-sm text-red-400 dark:text-red-600"
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
						{data.role === "admin" && (
							<MainButton
								to={`../dashboard/${data.username}/admin-panel`}
								customClasses={"flex gap-2 items-center px-4 py-2 text-sm"}
							>
								<MdAdminPanelSettings size={18} />
								<span className="max-sm:hidden">Admin</span>
							</MainButton>
						)}
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
			<Suspense>
				<Routes>
					<Route path="/" element={<ProfilePhotos />} />
					<Route path="/admin-panel" element={<ProfileAdmin />} />
					<Route path="/stats" element={<ProfileStats />} />
					<Route path="/upload" element={<ProfileUpload />} />
					<Route path="*" element={<NotFound hideImage={true} />} />
				</Routes>
			</Suspense>
		</>
	);
};

export default Dashboard;
