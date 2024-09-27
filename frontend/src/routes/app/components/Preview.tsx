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

	/* useEffect(() => {
		const createPreviewExamples = (cl: IndividualColumnInterface[]) => {
			if (downloadSettings.format === "json") {
				if (downloadSettings.type === "object") {
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
					console.log(prevExamps);
					return prevExamps;
				} else if (downloadSettings.type === "list") {
					const arrOfExamples: string[] = [];
					cl.forEach((column) => {
						const example = getExample({
							category: column.category,
							type: column.type,
							settings: column.settings,
							language: language,
						});
						arrOfExamples.push(example);
					});
					console.log(arrOfExamples);
					return arrOfExamples;
				}
			} else if (downloadSettings.format === "sql") {
				const arrOfNames: string[] = [];
				const arrOfExamples: string[] = [];
				cl.forEach((column) => {
					const example = getExample({
						category: column.category,
						type: column.type,
						settings: column.settings,
						language: language,
					});
					arrOfNames.push(column.name);
					arrOfExamples.push(example);
				});
				return `INSERT INTO ${downloadSettings.tableName || "undefined"} (${arrOfNames.join(", ")}) VALUES (${arrOfExamples.join(", ")});\n`;
			}
		};

		const newExamples = [];
		for (let index = 0; index < 5; index++) {
			newExamples.push(createPreviewExamples(columns));
		}

		if (downloadSettings.format === "json") {
			setPreviewExamples(JSON.stringify(newExamples, null, 2));
		} else if (downloadSettings.format === "sql") {
			setPreviewExamples(newExamples.join("").toString());
		}

		return () => {
			setPreviewExamples("");
		};
	}, [columns, language, downloadSettings.format, downloadSettings.tableName, downloadSettings.type]); */
	useEffect(() => {
		const createPreviewExamples = (cl: IndividualColumnInterface[]) => {
			return cl.map((column) => {
				const example = getExample({
					category: column.category,
					type: column.type,
					settings: column.settings,
					language: language,
				});

				return { name: column.name, example };
			});
		};

		const generateJSONExamples = (cl: { name: string; example: string }[]) => {
			if (downloadSettings.type === "object") {
				return cl.reduce((acc, { name, example }) => {
					acc[name] = example;
					return acc;
				}, {} as PreviewExample);
			} else if (downloadSettings.type === "list") {
				return cl.map(({ example }) => example);
			}
		};

		const generateSQLExamples = (cl: { name: string; example: string }[]) => {
			const columnNames = cl.map(({ name }) => name).join(", ");
			const values = cl.map(({ example }) => JSON.stringify(example)).join(", ");
			return `INSERT INTO ${downloadSettings.tableName || "undefined"} (${columnNames}) VALUES (${values});\n`;
		};

		const newExamples = Array.from({ length: 5 }, () => createPreviewExamples(columns));

		if (downloadSettings.format === "json") {
			const examples = newExamples.map((example) => generateJSONExamples(example));
			setPreviewExamples(JSON.stringify(examples, null, 2));
		} else if (downloadSettings.format === "sql") {
			const examples = newExamples.map((example) => generateSQLExamples(example));
			setPreviewExamples(examples.join(""));
		}

		return () => {
			setPreviewExamples("");
		};
	}, [columns, language, downloadSettings.format, downloadSettings.tableName, downloadSettings.type]);

	return (
		<>
			<div className="relative max-h-[inherit] min-h-full w-full md:w-2/3 bg-white rounded-md shadow-sm">
				<div className="absolute top-2 right-5">
					<button
						onMouseLeave={() => {
							setInterval(() => {
								setCopied(false);
							}, 2000);
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
				<pre className="h-full w-full overflow-auto px-4 pt-8 pb-4">{previewExamples}</pre>
			</div>
		</>
	);
}

export default Preview;
