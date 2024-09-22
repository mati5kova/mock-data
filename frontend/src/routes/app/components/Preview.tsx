import { useContext, useEffect, useState } from "react";
import getExample from "../../../utils/GetExample";
import { ColumnsContext, IndividualColumnInterface } from "../contexts/ColumnsContext";

interface PreviewExample {
	[key: string]: string | number; // Define dynamic keys as strings and values as any, or use specific types if known
}

function Preview() {
	const { columns, language } = useContext(ColumnsContext);
	const [previewExamples, setPreviewExamples] = useState<PreviewExample[]>([]);

	useEffect(() => {
		const createPreviewExamples = (cl: IndividualColumnInterface[]) => {
			const prevExamps = cl.reduce((acc, column) => {
				const example = getExample({
					category: column.category,
					type: column.type,
					settings: column.settings,
					language: language,
				});
				acc[column.name] = example;
				return acc;
			}, {} as PreviewExample);
			return prevExamps;
		};

		const newExamples = [];
		for (let index = 0; index < 5; index++) {
			newExamples.push(createPreviewExamples(columns));
		}

		setPreviewExamples(newExamples);
		return () => {
			setPreviewExamples([]);
		};
	}, [columns, language]);

	return (
		<>
			<div className="max-h-[inherit] h-full w-full md:w-1/2 bg-white rounded-md p-3 overflow-auto">
				<pre>{JSON.stringify(previewExamples, null, 2)}</pre>
			</div>
		</>
	);
}

export default Preview;
