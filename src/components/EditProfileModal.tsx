import React from "react";
import { CgClose } from "react-icons/cg";

import Input from "./shared/Input";
import FormButton from "./shared/FormButton";

interface EditProfileModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: () => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
	isOpen,
	onClose,
	onSubmit,
}) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-[100] flex items-center justify-center">
			<div className="absolute inset-0 bg-black opacity-50"></div>
			<div className="z-50 w-11/12 rounded-lg bg-white p-8 dark:bg-mantis-950 md:w-1/2">
				<button
					onClick={onClose}
					className="float-right text-gray-500 hover:text-gray-700"
				>
					<CgClose size={24} />
				</button>
				<h2 className="mb-4 font-heading text-2xl">Edit Profile</h2>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						onSubmit();
					}}
				>
					<div className="mb-4">
						<p className="mb-1 block text-gray-700 dark:text-green-spring-500">
							Change Username
						</p>
						<Input
							label={"Username"}
							type={"text"}
							name={"username"}
							inputClasses={
								"text-gray-700 dark:text-green-spring-500 w-full rounded border p-2"
							}
						/>
					</div>
					<div className="mb-4">
						<p className="mb-1 block text-gray-700 dark:text-green-spring-500">
							Change Password
						</p>
						<Input
							label={"Current Password"}
							type={"password"}
							name={"passwordCurrent"}
							inputClasses={
								"mb-2 text-gray-700 dark:text-green-spring-500 w-full rounded border p-2"
							}
						/>
						<Input
							label={"New Password"}
							type={"password"}
							name={"passwordNew"}
							inputClasses={
								"mb-2 text-gray-700 dark:text-green-spring-500 w-full rounded border p-2"
							}
						/>
						<Input
							label={"Confirm New Password"}
							type={"password"}
							name={"confirmPasswordNew"}
							inputClasses={
								"text-gray-700 dark:text-green-spring-500 w-full rounded border p-2"
							}
						/>
					</div>
					<div className="mb-4">
						<p className="mb-1 block text-gray-700 dark:text-green-spring-500">
							Change Avatar
						</p>
						<Input
							label={"Url"}
							type={"text"}
							name={"avatarUrl"}
							inputClasses={
								"text-gray-700 dark:text-green-spring-500 w-full rounded border p-2"
							}
						/>
					</div>
					<div className="mb-4">
						<p className="mb-1 block text-gray-700 dark:text-green-spring-500">
							Change Cover Image
						</p>
						<Input
							label={"Url"}
							type={"text"}
							name={"coverImageUrl"}
							inputClasses={
								"text-gray-700 dark:text-green-spring-500 w-full rounded border p-2"
							}
						/>
					</div>
					<div className="mb-4">
						<p className="mb-1 block text-gray-700 dark:text-green-spring-500">
							Change Biography
						</p>
						<Input
							label={"Your Biography"}
							type={"text"}
							name={"biography"}
							inputClasses={
								"text-gray-700 dark:text-green-spring-500 w-full rounded border p-2"
							}
						/>
					</div>
					<div className="flex justify-end gap-2">
						<FormButton
							type="button"
							onClick={onClose}
							customClasses="rounded w-fit !bg-green-spring-300 px-4 py-2 hover:!bg-green-spring-400 dark:!bg-green-spring-600 dark:!hover:bg-green-spring-700"
						>
							Cancel
						</FormButton>
						<FormButton
							type="submit"
							customClasses="rounded w-fit bg-bright-turquoise-600 px-4 py-2 hover:bg-bright-turquoise-700"
						>
							Update
						</FormButton>
					</div>
				</form>
			</div>
		</div>
	);
};

export default EditProfileModal;
