import PropTypes from "prop-types";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";

const DeleteButton = ({
	onDelete,
	isLoading,
	accessibilityText,
	direction,
}) => {
	const [showConfirm, setShowConfirm] = useState(false);

	const handleDeleteClick = () => setShowConfirm(true);

	const handleConfirm = () => {
		onDelete();
		setShowConfirm(false);
	};

	const handleCancel = () => setShowConfirm(false);

	return (
		<div className="relative">
			<button
				onClick={handleDeleteClick}
				disabled={isLoading || showConfirm}
				className="flex items-center justify-center p-1 text-red-600 hover:text-red-700 disabled:opacity-50 dark:text-red-500 dark:hover:text-red-600"
				aria-label={`Delete ${accessibilityText}`}
				title={`Delete ${accessibilityText}`}
			>
				<FaTrash />
			</button>

			{showConfirm && (
				<div
					className={`absolute bottom-2 ${direction}-2 z-20 mt-2 rounded border border-green-spring-200 bg-white p-2 shadow dark:border-green-spring-600 dark:bg-green-spring-700`}
				>
					<p className="text-sm text-green-spring-700 dark:text-green-spring-300">
						Confirm deletion?
					</p>
					<div className="mt-2 flex justify-end space-x-2">
						<button
							onClick={handleCancel}
							className="rounded bg-green-spring-200 px-3 py-1 text-sm text-green-spring-500 hover:bg-green-spring-300 dark:bg-green-spring-600 dark:text-green-spring-400 dark:hover:bg-green-spring-500"
							aria-label="Cancel deletion"
						>
							Cancel
						</button>
						<button
							onClick={handleConfirm}
							className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
							aria-label="Confirm deletion"
						>
							Delete
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

DeleteButton.propTypes = {
	onDelete: PropTypes.func.isRequired,
	isLoading: PropTypes.bool,
	accessibilityText: PropTypes.string.isRequired,
	direction: PropTypes.string.isRequired,
};

DeleteButton.defaultProps = {
	isLoading: false,
};

export default DeleteButton;
