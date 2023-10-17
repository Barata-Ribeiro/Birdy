import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CgClose } from "react-icons/cg";

import FormButton from "./shared/FormButton";

interface DeleteProfileModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const DeleteProfileModal: React.FC<DeleteProfileModalProps> = ({
	isOpen,
	onClose,
}) => {
	const [isDeleting, setIsDeleting] = useState(false);
	const [progress, setProgress] = useState(0);
	const navigate = useNavigate();

	useEffect(() => {
		let start: number | null = null;
		let animationFrameId: number | null = null;

		const step = (timestamp: number) => {
			if (start === null) start = timestamp;
			const progress = Math.round(Math.min((timestamp - start) / 50, 100));

			setProgress(progress);

			if (progress < 100) animationFrameId = requestAnimationFrame(step);
			else {
				console.log("Deleted!");
				navigate("/sign/up");
			}
		};

		if (isDeleting) {
			start = null;
			animationFrameId = requestAnimationFrame(step);
		}

		return () => {
			if (animationFrameId) cancelAnimationFrame(animationFrameId);
			setProgress(0);
		};
	}, [isDeleting, navigate]);

	const handleInteractionStart = () => setIsDeleting(true);
	const handleInteractionEnd = () => {
		setIsDeleting(false);
		setProgress(0);
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
				<h2 className="mb-4 font-heading text-2xl text-red-600">Warning!</h2>
				<p className="mb-6 text-lg leading-relaxed">
					Under our policies, when you delete your account, it will be
					completely removed from our database, with no way of recovering it.
					Deleting your account will also delete all photos posted; comments
					made; comments received; given likes; received likes. Only delete your
					account if you're 100% (one hundred percent) sure this is the intended
					outcome.
				</p>
				<p className="mb-4 text-right text-sm">
					To delete, press and hold the "Delete" button.
				</p>
				<div className="mb-4 flex justify-center gap-2 sm:justify-end">
					<FormButton
						type="button"
						onClick={onClose}
						customClasses="rounded sm:!w-fit !bg-green-spring-300 px-4 py-2 hover:!bg-green-spring-400 dark:!bg-green-spring-600 dark:!hover:bg-green-spring-700"
					>
						Cancel
					</FormButton>
					<FormButton
						// Eventos do mouse
						onMouseDown={handleInteractionStart}
						onMouseUp={handleInteractionEnd}
						onMouseLeave={handleInteractionEnd}
						// Eventos de toque
						onTouchStart={handleInteractionStart}
						onTouchEnd={handleInteractionEnd}
						onTouchCancel={handleInteractionEnd}
						role="Delete Account"
						customClasses="rounded px-4 py-2 sm:!w-fit !bg-red-600 hover:!bg-red-400"
					>
						{isDeleting ? `${progress}%` : "Delete"}
					</FormButton>
				</div>
			</div>
		</div>
	);
};

export default DeleteProfileModal;
