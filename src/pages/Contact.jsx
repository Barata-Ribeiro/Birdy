import { useState } from "react";
import Head from "../components/helpers/Head";
import FormButton from "../components/shared/FormButton";
import Input from "../components/shared/Input";
import useForm from "../hooks/useForm";

const Contact = () => {
	const name = useForm();
	const email = useForm("email");
	const message = useForm();
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = (event) => {
		event.preventDefault();
		const isNameValid = name.validate();
		const isEmailValid = email.validate();
		const isMessageValid = message.validate();

		if (isNameValid && isEmailValid && isMessageValid) {
			setIsLoading(true);
			// Submit logic here soon...
			console.log("Submitted: ", {
				name: name.value,
				email: email.value,
				message: message.value,
			});
			setIsLoading(false);
		}
	};

	return (
		<section className="container mx-auto px-5 py-10">
			<Head
				title="Contact Us"
				description="Contact us for feedback and support."
			/>
			<p className="mb-4">
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae in fuga
				dignissimos at aliquam asperiores saepe eveniet consectetur. Fugit porro
				laborum explicabo laboriosam doloremque facere nisi quis aliquam optio
				possimus!
			</p>
			<form
				onSubmit={handleSubmit}
				className="mx-auto flex max-w-md flex-col gap-4"
			>
				<div>
					<Input
						label="Name"
						type="text"
						name="name"
						error={name.error}
						aria-invalid={name.error ? "true" : "false"}
						aria-describedby={name.error ? `error-${name.value}` : undefined}
						{...name}
						aria-required
						required
					/>
				</div>

				<div>
					<Input
						label="Email"
						type="email"
						name="email"
						error={email.error}
						aria-invalid={email.error ? "true" : "false"}
						aria-describedby={email.error ? `error-${email.value}` : undefined}
						{...email}
						aria-required
						required
					/>
				</div>

				<div>
					<textarea
						className={`peer block w-full rounded-lg border-green-spring-50 p-2.5 text-mantis-950 focus:border-bright-turquoise-500 ${
							message.error ? "border-2 border-red-500" : ""
						}`}
						name="message"
						placeholder="Your Message"
						rows="5"
						aria-required
						required
						{...message}
					></textarea>
					{message.error && (
						<p className="mt-2 text-sm text-red-500" role="alert">
							{message.error}
						</p>
					)}
				</div>
				<FormButton
					customClasses="p-2 text-lg rounded-2xl group-invalid:pointer-events-none group-invalid:opacity-30"
					isLoading={isLoading}
				>
					Send Message
				</FormButton>
			</form>
		</section>
	);
};

export default Contact;
