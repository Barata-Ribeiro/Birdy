import PropTypes from "prop-types";
import { CgClose } from "react-icons/cg";

import { useEffect, useState } from "react";
import useForm from "../hooks/useForm";
import FormButton from "./shared/FormButton";
import Input from "./shared/Input";

const EditProfileModal = ({ isOpen, onClose }) => {
	const username = useForm("username");
	const oldPassword = useForm();
	const newPassword = useForm("password");
	const confirmNewPassword = useForm();
	const coverImageUrl = useForm();
	const avatarUrl = useForm();
	const biography = useForm();

	const [errorConfirmNewPassword, setErrorConfirmNewPassword] = useState("");

	useEffect(() => {
		if (oldPassword.value !== undefined) {
			if (oldPassword.value !== confirmNewPassword.value)
				setErrorConfirmNewPassword("Passwords do not match!");
			else setErrorConfirmNewPassword(undefined);
		}
	}, [oldPassword, confirmNewPassword]);

	const handleSubmit = (e) => {
		e.preventDefault();

		const formData = {
			username: username.value,
			password: oldPassword.value,
			newPassword: newPassword.value,
			avatarUrl: avatarUrl.value,
			coverImageUrl: coverImageUrl.value,
			biography: biography.value,
		};
	};

	if (!isOpen) return null;
	return (
		<div className="fixed inset-0 z-[100] flex items-center justify-center">
			<div className="absolute inset-0 bg-black opacity-50"></div>
			<div className="z-50 w-11/12 rounded-lg bg-green-spring-50 p-8 dark:bg-mantis-950 md:w-1/2">
				<button
					onClick={onClose}
					className="float-right text-green-spring-500 hover:text-green-spring-700"
				>
					<CgClose size={24} />
				</button>
				<h2 className="mb-4 font-heading text-2xl">Edit Profile</h2>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<p className="mb-1 block text-green-spring-700 dark:text-green-spring-500">
							Change Username
						</p>
						<Input
							label={"Username"}
							type={"text"}
							name={"username"}
							inputClasses={
								"text-green-spring-700 dark:text-green-spring-500 w-full rounded border p-2"
							}
							value={username.value}
							onChange={username.onChange}
							onBlur={username.onBlur}
							error={username.error}
							aria-invalid={username.error ? "true" : "false"}
							aria-describedby={
								username.error ? `error-${username.value}` : undefined
							}
						/>
					</div>
					<div className="mb-4">
						<p className="mb-1 block text-green-spring-700 dark:text-green-spring-500">
							Change Password
						</p>
						<Input
							label={"Current Password"}
							type={"password"}
							name={"passwordCurrent"}
							inputClasses={
								"mb-2 text-green-spring-700 dark:text-green-spring-500 w-full rounded border p-2"
							}
							error={oldPassword.error}
							aria-invalid={oldPassword.error ? "true" : "false"}
							aria-describedby={
								oldPassword.error ? `error-${oldPassword.value}` : undefined
							}
						/>
						<Input
							label={"New Password"}
							type={"password"}
							name={"passwordNew"}
							inputClasses={
								"mb-2 text-green-spring-700 dark:text-green-spring-500 w-full rounded border p-2"
							}
							value={newPassword.value}
							onChange={newPassword.onChange}
							onBlur={newPassword.onBlur}
							error={newPassword.error}
							aria-invalid={newPassword.error ? "true" : "false"}
							aria-describedby={
								newPassword.error ? `error-${newPassword.value}` : undefined
							}
						/>
						<Input
							label={"Confirm New Password"}
							type={"password"}
							name={"confirmPasswordNew"}
							inputClasses={
								"text-green-spring-700 dark:text-green-spring-500 w-full rounded border p-2"
							}
							value={confirmNewPassword.value}
							onChange={confirmNewPassword.onChange}
							onBlur={confirmNewPassword.onBlur}
							error={errorConfirmNewPassword || confirmNewPassword.error}
							aria-invalid={
								errorConfirmNewPassword || confirmNewPassword.error
									? "true"
									: "false"
							}
							aria-describedby={
								errorConfirmNewPassword || confirmNewPassword.error
									? `error-${
											errorConfirmNewPassword || confirmNewPassword.error
									  }`
									: undefined
							}
						/>
					</div>
					<div className="mb-4">
						<p className="mb-1 block text-green-spring-700 dark:text-green-spring-500">
							Change Avatar
						</p>
						<Input
							label={"Url"}
							type={"text"}
							name={"avatarUrl"}
							inputClasses={
								"text-green-spring-700 dark:text-green-spring-500 w-full rounded border p-2"
							}
						/>
					</div>
					<div className="mb-4">
						<p className="mb-1 block text-green-spring-700 dark:text-green-spring-500">
							Change Cover Image
						</p>
						<Input
							label={"Url"}
							type={"text"}
							name={"coverImageUrl"}
							inputClasses={
								"text-green-spring-700 dark:text-green-spring-500 w-full rounded border p-2"
							}
						/>
					</div>
					<div className="mb-4">
						<p className="mb-1 block text-green-spring-700 dark:text-green-spring-500">
							Change Biography
						</p>
						<Input
							label={"Your Biography"}
							type={"text"}
							name={"biography"}
							inputClasses={
								"text-green-spring-700 dark:text-green-spring-500 w-full rounded border p-2"
							}
						/>
					</div>
					<div className="flex justify-center gap-2 sm:justify-end">
						<FormButton
							type="button"
							onClick={onClose}
							customClasses="rounded sm:!w-fit !bg-green-spring-300 px-4 py-2 hover:!bg-green-spring-400 dark:!bg-green-spring-600 dark:!hover:bg-green-spring-700"
						>
							Cancel
						</FormButton>
						<FormButton
							type="submit"
							role="Edit Account"
							customClasses="rounded sm:!w-fit bg-bright-turquoise-600 px-4 py-2 hover:bg-bright-turquoise-700"
						>
							Update
						</FormButton>
					</div>
				</form>
			</div>
		</div>
	);
};

EditProfileModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
};

export default EditProfileModal;
