import { useContext } from "react";
import { possibleFieldTypes } from "../../../utils/Constants";
import { ColumnsContext } from "../contexts/ColumnsContext";

function ActiveOverlay() {
	const {
		activeOverlay,
		setActiveOverlay,
		setSearch,
		setLocalPossibleFieldTypes,
		setCurrentSelectingTypeForColumnId,
	} = useContext(ColumnsContext);

	return (
		<div
			className={`${activeOverlay === false && "hidden"} unclickable-overlay absolute w-full h-full bg-black bg-opacity-45 z-20`}
			onClick={() => {
				setSearch("");
				setLocalPossibleFieldTypes(possibleFieldTypes);
				setActiveOverlay((prev) => !prev);
				setCurrentSelectingTypeForColumnId(0);
			}}
		></div>
	);
}

export default ActiveOverlay;
