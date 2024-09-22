import {
	closestCorners,
	DndContext,
	DragEndEvent,
	PointerSensor,
	TouchSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useContext } from "react";
import addIcon from "../../../assets/add-circle-svgrepo-com.svg";
import { __DEFAULT_COLUMN__ } from "../../../utils/Constants";
import { ColumnsContext } from "../contexts/ColumnsContext";
import IndividualColumn from "./IndividualColumn";

function ColumnsList() {
	const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));
	const { columns, setColumns } = useContext(ColumnsContext);

	const getTaskPosition = (id: number) => {
		return columns.findIndex((specificColumn) => specificColumn.id === id);
	};

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (active.id === over?.id) {
			return;
		}
		setColumns((columns) => {
			const originalPosition = getTaskPosition(Number(active.id));
			const newPosition = getTaskPosition(Number(over?.id));
			return arrayMove(columns, originalPosition, newPosition);
		});
	};

	const handleAddColumnClick = () => {
		const uniqueId = Math.round(Math.random() * 1000000);
		setColumns((columns) => {
			return [
				...columns,
				{ ...__DEFAULT_COLUMN__, id: uniqueId, name: __DEFAULT_COLUMN__.name + "_" + (columns.length + 1) },
			];
		});
	};

	return (
		<div className="font-mono pb-1">
			<DndContext
				collisionDetection={closestCorners}
				onDragEnd={handleDragEnd}
				sensors={sensors}
				modifiers={[restrictToParentElement]}
			>
				<ul className="flex flex-col gap-5">
					<SortableContext strategy={verticalListSortingStrategy} items={columns}>
						{columns.map((column) => {
							return <IndividualColumn key={column.id} column={column} />;
						})}
					</SortableContext>
				</ul>
			</DndContext>
			<div className="font-sans text-white w-fit mt-5 font-bold">
				<button
					type="button"
					name="Add column button"
					className="h-full w-full bg-gray-400 bg-opacity-70 rounded-md px-12 py-2 hover:bg-gray-500 hover:bg-opacity-50"
					onClick={handleAddColumnClick}
				>
					<img src={addIcon} alt="Add icon" className="h-4 float-left relative top-1" />
					&nbsp;Add column
				</button>
			</div>
		</div>
	);
}

export default ColumnsList;
