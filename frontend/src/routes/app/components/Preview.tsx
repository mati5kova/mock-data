import { useContext, useEffect, useState } from "react";
import { useCopyToClipboard } from "usehooks-ts";
import DocumentDuplicateIcon from "../../../assets/DocumentDuplicateIcon.png";
import getExample from "../../../utils/GetExample";
import { ColumnsContext, IndividualColumnInterface } from "../contexts/ColumnsContext";

interface PreviewExample {
	[key: string]: string | number; // Define dynamic keys as strings and values as any, or use specific types if known
}

function Preview({ downloadSettings }: { downloadSettings: { [key: string]: string | number } }) {
	const { columns, language } = useContext(ColumnsContext);
	const [previewExamples, setPreviewExamples] = useState<string>("");
	const [, copy] = useCopyToClipboard();
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		const createPreviewExamples = (cl: IndividualColumnInterface[]) => {
			if (downloadSettings.format === "json") {
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
			} else if (downloadSettings.format === "sql") {
				return `INSERT INTO column_name`;
			}
		};

		const newExamples = [];
		for (let index = 0; index < 5; index++) {
			newExamples.push(createPreviewExamples(columns));
		}

		setPreviewExamples(JSON.stringify(newExamples, null, 2));

		return () => {
			setPreviewExamples("");
		};
	}, [columns, language, downloadSettings.format]);

	return (
		<>
			<div className="relative max-h-[inherit] h-full w-full md:w-2/3 bg-white rounded-md p-3 overflow-auto shadow-sm">
				<div className="absolute top-2 right-2 float-end">
					<button
						onMouseLeave={() => {
							setInterval(() => {
								setCopied(false);
							}, 3000);
						}}
						onClick={() => {
							copy(previewExamples);
							setCopied(true);
						}}
					>
						{copied ? (
							<span>&#10004;</span>
						) : (
							<div className="h-5 w-5 text-white">
								<img src={DocumentDuplicateIcon} alt="Copy icon" className="text-red-500" />
							</div>
						)}
					</button>
				</div>
				<pre>{previewExamples}</pre>
			</div>
		</>
	);
}

export default Preview;
