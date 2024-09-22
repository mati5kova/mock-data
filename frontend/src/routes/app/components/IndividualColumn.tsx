import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useContext, useEffect, useState } from "react";
import DragDots from "../../../assets/DragDots";
import TrashCan from "../../../assets/TrashCan";
import useExample from "../../../hooks/useExample";
import { ColumnsContext, IndividualColumnInterface } from "../contexts/ColumnsContext";
import FieldTypeSelector from "./FieldTypeSelector";
import Settings from "./settings/Settings";

interface IndividualColumnProps {
	column: IndividualColumnInterface;
}

function IndividualColumn({ column }: IndividualColumnProps) {
	const [fieldName, setFieldName] = useState(column.name);
	const [selectedFieldType, setSelectedFieldType] = useState(column.type);
	const { setColumns } = useContext(ColumnsContext);
	const example = useExample({ category: column.category, type: selectedFieldType, settings: column.settings });
	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: Number(column.id) });
	const style = {
		transition: transition,
		transform: CSS.Transform.toString(transform),
	};

	useEffect(() => {
		//za posodabljanje <DataTypeSelector/> preko Categories -> IndividualTypePill
		setSelectedFieldType(column.type);
	}, [column.type]);

	const handleColumnFieldNameChange = (columnId: number, e: React.ChangeEvent<HTMLInputElement>) => {
		const newName = e.target.value.replace(/\s/g, ""); // Remove all spaces
		setFieldName(newName); // Update fieldName state if necessary

		setColumns((prevColumns) =>
			prevColumns.map((column) => (column.id === columnId ? { ...column, name: newName } : column))
		);
	};

	const handleColumnDelete = () => {
		setColumns((prevColumns) => prevColumns.filter((prevColumn) => prevColumn.id !== column.id));
	};

	return (
		<li
			className="bg-white h-20 w-full flex justify-between items-center drop-shadow-sm rounded-md p-5 select-none"
			ref={setNodeRef}
			style={style}
			key={column.id}
		>
			<div className="flex h-fit max-w-[83.333333%] items-center">
				{/* max-w enak kot je SectionContainer */}
				<span {...attributes} {...listeners} className="h-fit px-px mr-5">
					<DragDots />
				</span>

				<input
					type="text"
					name={`Column: ${column.name}-${column.id}`}
					value={fieldName.replace(/\s/g, "")}
					onChange={(e) => handleColumnFieldNameChange(column.id, e)}
					className="w-48 bg-gray-200 rounded-md p-1.5 hover:bg-gray-300 hover:bg-opacity-70 focus:outline focus:outline-2 focus:outline-gray-400 mr-5"
				></input>

				<FieldTypeSelector id={column.id} selectedFieldType={selectedFieldType} />

				<div
					id="example"
					className="w-96 h-full mr-6 text-ellipsis overflow-hidden whitespace-nowrap text-gray-600 text-sm"
				>
					{example}
				</div>

				<div className="w-80 h-full">
					<Settings column={column} />
				</div>
			</div>

			<div className="flex h-auto w-auto items-center" onClick={handleColumnDelete}>
				<TrashCan />
			</div>
		</li>
	);
}

export default IndividualColumn;
