import { Link } from "react-router-dom";

function ErrorPage() {
	return (
		<div className="bg-white text-gray-900 dark:bg-gray-900">
			<div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
				<div className="mx-auto max-w-screen-sm text-center">
					<h1 className="mb-4 text-7xl font-extrabold tracking-tight lg:text-9xl">404</h1>
					<p className="mb-4 text-3xl font-bold tracking-tight md:text-4xl dark:text-white">
						Something's missing.
					</p>
					<p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
						Sorry, we can't find that page. You'll find lots to explore on the home page.
					</p>
					<button type="button">
						<Link
							to="/"
							className="my-4 inline-flex rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 hover:bg-opacity-85 focus:outline-none focus:ring-4"
						>
							Back to Homepage
						</Link>
					</button>

					{/* <i>{error.statusText || error.message}</i> */}
				</div>
			</div>
		</div>
	);
}

export default ErrorPage;
