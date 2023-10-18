import { useState, FormEvent, ChangeEvent } from "react";
import Input from "../../components/shared/Input";
import FormButton from "../../components/shared/FormButton";

type ImageUploadState = {
	preview: string | undefined;
	raw: File | undefined;
};

const ProfileUpload = () => {
	const [imageUpload, setImageUpload] = useState<ImageUploadState>({
		preview: undefined,
		raw: undefined,
	});

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		console.log("SUBMIT");
	};

	const handleImgChange = (event: ChangeEvent<HTMLInputElement>) => {
		const target = event.target as HTMLInputElement;
		if (target.files && target.files[0]) {
			setImageUpload({
				preview: URL.createObjectURL(target.files[0]),
				raw: target.files[0],
			});
		}
	};

	return (
		<section className="p-4 sm:px-0">
			<h1 className="text-center text-2xl">Post Your Picture!</h1>
			<div className="mx-0 grid grid-cols-1 items-center gap-4 pt-4 md:grid-cols-2">
				<form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
					<Input
						label={"Photo Title"}
						type={"text"}
						name={"photoTitle"}
						inputClasses={
							"block w-full rounded-lg bg-mantis-200 dark:bg-mantis-800 p-4 text-lg placeholder:text-green-spring-400"
						}
					/>
					<Input
						label={"Bird Habitat"}
						type={"text"}
						name={"birdHabitat"}
						inputClasses={
							"block w-full rounded-lg bg-mantis-200 dark:bg-mantis-800 p-4 text-lg placeholder:text-green-spring-400"
						}
					/>
					<Input
						label={"Bird Size"}
						type={"text"}
						name={"birdSize"}
						inputClasses={
							"block w-full rounded-lg bg-mantis-200 dark:bg-mantis-800 p-4 text-lg placeholder:text-green-spring-400"
						}
					/>
					<input
						type="file"
						name="imageUpload"
						id="imageUpload"
						onChange={handleImgChange}
						className="block w-full text-lg"
					/>
					<FormButton customClasses="p-4 text-lg rounded-2xl">Send</FormButton>
				</form>
				{imageUpload.preview && (
					<img
						alt="Photo for Upload"
						src={`${imageUpload.preview}`}
						className="!max-w-md !justify-self-center !rounded-lg"
					/>
				)}
			</div>
		</section>
	);
};

export default ProfileUpload;
