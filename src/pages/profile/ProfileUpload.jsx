import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Error from "../../components/helpers/Error";
import Head from "../../components/helpers/Head";
import FormButton from "../../components/shared/FormButton";
import Input from "../../components/shared/Input";
import useForm from "../../hooks/useForm";
import { photoPosting } from "../../store/slices/photoPost.slice";
import { checkTokenExpiration } from "../../store/slices/token.slice";

const ProfileUpload = () => {
	const photoTitle = useForm();
	const photoBirdHabitat = useForm();
	const photoBirdSize = useForm("number");
	const [imageUpload, setImageUpload] = useState({
		preview: undefined,
		raw: undefined,
	});

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { loading, data, error } = useSelector((state) => state.photoPost);
	const { data: token } = useSelector((state) => state.token);

	useEffect(() => {
		if (data) navigate(`/dashboard/${data.authorName}`);
	}, [data, navigate]);

	const handleSubmit = (event) => {
		event.preventDefault();
		dispatch(checkTokenExpiration());

		const formData = new FormData();
		formData.append("imageFile", imageUpload.raw);
		formData.append("title", photoTitle.value);
		formData.append("size", photoBirdSize.value);
		formData.append("habitat", photoBirdHabitat.value);

		dispatch(photoPosting({ formData, token }));
	};

	const handleImgChange = (event) => {
		const target = event.target;
		if (target.files && target.files[0]) {
			setImageUpload({
				preview: URL.createObjectURL(target.files[0]),
				raw: target.files[0],
			});
		}
	};

	return (
		<section className="p-4 sm:px-0">
			<Head
				title="Upload"
				description="In this page you can upload new bird photographs to share with the world."
			/>

			<h1 className="text-center text-2xl">Post Your Picture!</h1>
			<div className="mx-0 grid grid-cols-1 items-center gap-4 pt-4 lg:grid-cols-2">
				<form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
					<Input
						label="Photo Title"
						type="text"
						name="photoTitle"
						inputClasses="block w-full rounded-lg bg-mantis-200 dark:bg-mantis-800 p-4 text-lg placeholder:text-green-spring-400"
						value={photoTitle.value}
						onChange={photoTitle.onChange}
						onBlur={photoTitle.onBlur}
						error={photoTitle.error}
						aria-invalid={photoTitle.error ? "true" : "false"}
						aria-describedby={
							photoTitle.error ? `error-${photoTitle.value}` : undefined
						}
						required
					/>
					<Input
						label="Bird Habitat"
						type="text"
						name="birdHabitat"
						inputClasses="block w-full rounded-lg bg-mantis-200 dark:bg-mantis-800 p-4 text-lg placeholder:text-green-spring-400"
						value={photoBirdHabitat.value}
						onChange={photoBirdHabitat.onChange}
						onBlur={photoBirdHabitat.onBlur}
						error={photoBirdHabitat.error}
						aria-invalid={photoBirdHabitat.error ? "true" : "false"}
						aria-describedby={
							photoBirdHabitat.error
								? `error-${photoBirdHabitat.value}`
								: undefined
						}
						required
					/>
					<Input
						label="Bird Size"
						type="text"
						name="birdSize"
						inputClasses="block w-full rounded-lg bg-mantis-200 dark:bg-mantis-800 p-4 text-lg placeholder:text-green-spring-400"
						value={photoBirdSize.value}
						onChange={photoBirdSize.onChange}
						onBlur={photoBirdSize.onBlur}
						error={photoBirdSize.error}
						aria-invalid={photoBirdSize.error ? "true" : "false"}
						aria-describedby={
							photoBirdSize.error ? `error-${photoBirdSize.value}` : undefined
						}
						required
					/>
					<input
						type="file"
						name="imageUpload"
						id="imageUpload"
						onChange={handleImgChange}
						className="block w-full text-lg"
						required
					/>
					<FormButton
						customClasses="p-4 text-lg rounded-2xl"
						isLoading={loading}
					>
						Send
					</FormButton>
				</form>
				{imageUpload.preview && (
					<img
						alt="Preview from the image you are trying to upload..."
						src={`${imageUpload.preview}`}
						className="aspect-square h-auto max-w-md justify-self-center rounded-lg object-cover object-center align-middle italic"
					/>
				)}
			</div>
			<Error error={error} />
		</section>
	);
};

export default ProfileUpload;
