import { useState } from "react";
import { Link } from "react-router-dom";

import Head from "../components/helpers/Head";
import FormButton from "../components/shared/FormButton";
import Input from "../components/shared/Input";
import useForm from "../hooks/useForm";

const Contact = () => {
	const name = useForm();
	const email = useForm("email");
	const messageSubject = useForm();
	const message = useForm();
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = (event) => {
		event.preventDefault();
		const isNameValid = name.validate();
		const isEmailValid = email.validate();
		const isMessageSubjectValid = messageSubject.validate();
		const isMessageValid = message.validate();

		if (
			isNameValid &&
			isEmailValid &&
			isMessageSubjectValid &&
			isMessageValid
		) {
			setIsLoading(true);
			// Submit logic here soon...
			alert(
				`The contact form is currently disabled. Use the repositorie's issues page! \n\n Submitted information: \n 
        Name: ${name.value} \n 
        Email: ${email.value} \n
        Subject: ${messageSubject.value} \n
        Message: ${message.value}`
			);
			setIsLoading(false);
		}
	};

	return (
		<section className="container mx-auto px-5 py-10">
			<Head
				title="Contact Us"
				description="Contact us for feedback and support."
			/>
			<p className="mx-auto mb-4 max-w-3xl leading-relaxed">
				The Birdy team is always looking for feedback and ways of improving its
				users experiences. If you have any questions, requests, or suggestions,
				please contact us using either the contact form bellow or through our{" "}
				<Link
					to="https://github.com/Barata-Ribeiro/Birdy/issues"
					target="_blank"
					rel="noopener noreferrer"
					className="text-green-spring-50 transition-colors duration-300 hover:text-bright-turquoise-500 hover:underline dark:text-green-spring-400 dark:hover:text-bright-turquoise-200 lg:text-green-spring-600"
				>
					issues page
				</Link>{" "}
				in the project&apos;s repository.
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
						inputClasses="bg-mantis-200 dark:bg-mantis-800 p-4 text-lg placeholder:text-green-spring-400 dark:placeholder:text-green-spring-300"
						error={name.error}
						aria-invalid={name.error ? "true" : "false"}
						aria-describedby={name.error ? `error-${name.value}` : undefined}
						{...name}
						aria-required="true"
						required
					/>
				</div>

				<div>
					<Input
						label="Email"
						type="email"
						name="email"
						inputClasses="bg-mantis-200 dark:bg-mantis-800 p-4 text-lg placeholder:text-green-spring-400 dark:placeholder:text-green-spring-300"
						error={email.error}
						aria-invalid={email.error ? "true" : "false"}
						aria-describedby={email.error ? `error-${email.value}` : undefined}
						{...email}
						aria-required="true"
						required
					/>
				</div>

				<div>
					<Input
						label="Subject"
						type="messageSubject"
						name="messageSubject"
						inputClasses="bg-mantis-200 dark:bg-mantis-800 p-4 text-lg placeholder:text-green-spring-400 dark:placeholder:text-green-spring-300"
						error={messageSubject.error}
						aria-invalid={messageSubject.error ? "true" : "false"}
						aria-describedby={
							messageSubject.error ? `error-${messageSubject.value}` : undefined
						}
						{...messageSubject}
						aria-required="true"
						required
					/>
				</div>

				<div>
					<textarea
						className={`peer block w-full rounded-lg border-green-spring-50 bg-mantis-200 p-2.5 text-lg text-mantis-950 placeholder:text-green-spring-400 focus:border-bright-turquoise-500 dark:bg-mantis-800 dark:placeholder:text-green-spring-300 ${
							message.error ? "border-2 border-red-500" : ""
						}`}
						name="message"
						placeholder="Your Message"
						rows="5"
						aria-required="true"
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
