import Image from "../components/common/Image";
import Head from "../components/common/Head";

const NotFound = () => {
	return (
		<section className="container flex h-screen w-screen items-center justify-center">
			<Head
				title="404"
				description="This isn't the page you're looking for..."
			/>
			<div className="px-4 lg:py-12">
				<div className="lg:flex lg:gap-4">
					<div className="flex flex-col items-center justify-center md:py-24 lg:py-32">
						<h1 className="text-9xl font-bold text-mantis-600">404</h1>
						<p className="mb-2 text-center text-2xl font-bold md:text-3xl">
							<span className="text-bright-turquoise-600">Oops!</span> Page not
							found
						</p>
						<p className="mb-8 text-center text-gray-500 md:text-lg">
							The page you’re looking for doesn’t exist.
						</p>
						<a
							href="/"
							className="rounded-lg bg-mantis-600 px-6 py-2 text-sm font-semibold text-mantis-50"
						>
							Go home
						</a>
					</div>
					<div className="mt-4">
						<Image
							src="https://images.unsplash.com/photo-1653014687089-7659025afe78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
							alt="Kiskadee bird"
							className="max-h-[510px]"
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default NotFound;
