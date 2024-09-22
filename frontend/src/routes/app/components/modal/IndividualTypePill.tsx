import { useContext } from "react";
import { ColumnsContext, SettingsInterface } from "../../contexts/ColumnsContext";

interface IndividualTypePillInterface {
	category: string;
	type: string;
	categorySearchActive: boolean;
	settings?: SettingsInterface;
}

function IndividualTypePill({ category, type, settings, categorySearchActive }: IndividualTypePillInterface) {
	const { setSearch, setActiveOverlay, setColumns, currentSelectingTypeForColumnId, search } =
		useContext(ColumnsContext);

	const handlePillTypeSelect = () => {
		setColumns((currColumns) =>
			currColumns.map((column) => {
				if (column.id === currentSelectingTypeForColumnId) {
					return {
						...column,
						category: category,
						type: type,
						settings: settings !== undefined ? settings : {},
					};
				} else {
					return column;
				}
			})
		);
		setSearch("");
		setActiveOverlay((prev) => !prev);
	};
	return (
		<div
			className={`w-fit h-fit py-1 px-3 rounded-lg bg-gray-300 bg-opacity-50 cursor-pointer hover:bg-opacity-80 text-center ${search === "" && !categorySearchActive && "flex-grow"}`}
			onClick={handlePillTypeSelect}
		>
			{type}
		</div>
	);
}

export default IndividualTypePill;
