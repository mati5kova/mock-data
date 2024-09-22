import { useContext } from "react";
import { possibleFieldTypes } from "../../../../utils/Constants";
import { ColumnsContext } from "../../contexts/ColumnsContext";
import Categories from "./Categories";
import Search from "./Search";

function SelectTypeModal() {
	const {
		activeOverlay,
		setSearch,
		setLocalPossibleFieldTypes,
		setActiveOverlay,
		setCurrentSelectingTypeForColumnId,
	} = useContext(ColumnsContext);

	return (
		<div className={`${activeOverlay === false && "hidden"}`}>
			<div className="z-40 absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/4 bg-white w-2/3 min-h-fit pt-6 px-14 pb-14 rounded-lg">
				<h1 className="text-center mb-5 font-bold text-xl text-gray-400">CHOOSE A TYPE</h1>
				<div
					className="absolute top-3 right-3 cursor-pointer"
					onClick={() => {
						setSearch("");
						setLocalPossibleFieldTypes(possibleFieldTypes);
						setActiveOverlay((prev) => !prev);
						setCurrentSelectingTypeForColumnId(0);
					}}
				>
					<svg
						width="24px"
						height="24px"
						viewBox="0 0 64 64"
						xmlns="http://www.w3.org/2000/svg"
						strokeWidth="4"
						stroke="gray"
						fill="none"
						className="p-px"
					>
						<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
						<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
						<g id="SVGRepo_iconCarrier">
							<line x1="8.06" y1="8.06" x2="55.41" y2="55.94"></line>
							<line x1="55.94" y1="8.06" x2="8.59" y2="55.94"></line>
						</g>
					</svg>
				</div>
				<Search />
				<Categories />
			</div>
		</div>
	);
}

export default SelectTypeModal;
