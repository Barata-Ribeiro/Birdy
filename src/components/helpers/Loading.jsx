/* eslint-disable import/no-unresolved */
import BirdSvg from "../../assets/bird-svgrepo-com.svg?react";

const Loading = () => {
	return (
		<div className="absolute left-0 top-0 z-[1000] flex h-full w-full">
			<div className="m-auto flex h-screen w-screen items-center justify-center bg-black/50">
				<BirdSvg className="absolute z-[999] h-[76px] w-[76px]" />
				<div className="relative h-24 w-24 animate-spin rounded-full bg-gradient-to-r from-bright-turquoise-300 via-bright-turquoise-400 to-bright-turquoise-200 ">
					<div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-mantis-50 bg-green-spring-200"></div>
				</div>
			</div>
		</div>
	);
};

export default Loading;
