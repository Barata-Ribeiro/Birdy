const ProfileStats = () => {
	return (
		<section className="p-4 sm:px-0">
			<h1 className="text-center text-2xl">Your Stats</h1>
			<article className="my-4 grid grid-cols-2 gap-6">
				<div className="col-span-full flex justify-between rounded-lg p-4 font-heading font-medium shadow-lg">
					<p>
						Total Hits: <span className="font-body font-normal">2394879</span>
					</p>
					<p>
						Total Comments: <span className="font-body font-normal">3456</span>
					</p>
					<p>
						Total Likes: <span className="font-body font-normal">672</span>
					</p>
				</div>
				<div className="col-auto rounded-lg p-4 font-heading font-medium shadow-lg"></div>
				<div className="col-auto rounded-lg p-4 font-heading font-medium shadow-lg"></div>
			</article>
		</section>
	);
};

export default ProfileStats;
