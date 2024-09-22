import { useContext } from "react";
import { possibleFieldTypes } from "../../../utils/Constants";
import { ColumnsContext } from "../contexts/ColumnsContext";

interface DataTypeSelectorInterface {
	id: number;
	selectedFieldType: string;
}

function FieldTypeSelector({ id, selectedFieldType }: DataTypeSelectorInterface) {
	const { setActiveOverlay, setCurrentSelectingTypeForColumnId, setLocalPossibleFieldTypes} =
		useContext(ColumnsContext);

	const handleActiveTypeSelection = () => {
		setActiveOverlay((prev) => !prev);
		setLocalPossibleFieldTypes(possibleFieldTypes);
		setCurrentSelectingTypeForColumnId(id);
	};

	return (
		<>
			<div className="min-w-48 h-full mr-5 overflow-hidden whitespace-nowrap text-ellipsis cursor-pointer">
				<div onClick={handleActiveTypeSelection} className="h-full w-full text-left p-1.5 rounded-md border">
					<div className="flex justify-between items-center">
						<div>{selectedFieldType || "Select data type"}</div>
						<span>
							<svg width="9" height="5" viewBox="0 0 9 5" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M0.680423 0H8.31958C8.45471 0.000546568 8.58665 0.0397348 8.69869 0.11261C8.81074 0.185485 8.89787 0.288774 8.94907 0.409415C9.00026 0.530057 9.01323 0.662633 8.98631 0.79038C8.9594 0.918128 8.89383 1.03531 8.79788 1.12711L4.98513 4.80503C4.92161 4.86681 4.84604 4.91585 4.76278 4.94931C4.67951 4.98277 4.5902 5 4.5 5C4.4098 5 4.32049 4.98277 4.23722 4.94931C4.15396 4.91585 4.07839 4.86681 4.01487 4.80503L0.202122 1.12711C0.106173 1.03531 0.0405975 0.918128 0.0136861 0.79038C-0.0132253 0.662633 -0.00026383 0.530057 0.0509319 0.409415C0.102128 0.288774 0.189258 0.185485 0.301306 0.11261C0.413354 0.0397348 0.545287 0.000546568 0.680423 0Z"
									fill="black"
								></path>
							</svg>
						</span>
					</div>
				</div>
			</div>
		</>
	);
}

export default FieldTypeSelector;
