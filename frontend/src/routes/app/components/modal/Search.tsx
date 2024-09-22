import { useContext, useEffect, useRef } from "react";
import { ColumnsContext } from "../../contexts/ColumnsContext";

function Search() {
	const { search, setSearch, possibleFieldTypes, setLocalPossibleFieldTypes, activeOverlay } =
		useContext(ColumnsContext);
	const searchInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (activeOverlay === true && searchInputRef.current) {
			searchInputRef.current.focus();
		}
	}, [activeOverlay]);

	return (
		<div className="w-full h-11 flex items-center">
			<span>
				<svg
					viewBox="0 0 20 20"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className="h-11 p-3 bg-gray-100 rounded-l-md border-gray-100"
				>
					<path
						d="M9 2C5.13401 2 2 5.13401 2 9C2 12.866 5.13401 16 9 16C12.866 16 16 12.866 16 9C16 5.13401 12.866 2 9 2ZM0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9C18 13.9706 13.9706 18 9 18C4.02944 18 0 13.9706 0 9Z"
						fill="#98A2B3"
					></path>
					<path
						d="M13.9429 13.9429C14.3334 13.5524 14.9666 13.5524 15.3571 13.9429L19.7071 18.2929C20.0976 18.6834 20.0976 19.3166 19.7071 19.7071C19.3166 20.0976 18.6834 20.0976 18.2929 19.7071L13.9429 15.3571C13.5524 14.9666 13.5524 14.3334 13.9429 13.9429Z"
						fill="#98A2B3"
					></path>
				</svg>
			</span>
			<input
				type="text"
				name="Data type search"
				className="w-full h-full rounded-r-md p-3.5 bg-gray-100  border border-gray-100 focus:border-opacity-70 focus:border-gray-300 outline-none"
				placeholder="search types"
				value={search}
				ref={searchInputRef}
				onChange={(e) => {
					setLocalPossibleFieldTypes(possibleFieldTypes);
					setSearch(e.target.value.toLowerCase().trim());
				}}
			></input>
		</div>
	);
}

export default Search;
