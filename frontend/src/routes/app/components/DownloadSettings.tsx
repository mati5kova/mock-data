type DownloadSettings = Record<string, string | number>;

interface DownloadSettingsInterface {
	downloadSettings: DownloadSettings;
	setDownloadSettings: React.Dispatch<React.SetStateAction<DownloadSettings>>;
}

function DownloadSettings({ downloadSettings, setDownloadSettings }: DownloadSettingsInterface) {
	const handleDownloadSettingsChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
		const name = e.target.name;
		const value = e.target.type === "number" ? Number(e.target.value) : e.target.value.replace(/ /g, "");
		setDownloadSettings((prevValues) => ({ ...prevValues, [name]: value }));
	};

	const handleDownloadSettingsSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("submitted");
		//download
	};

	return (
		<>
			<div className="relative h-[50vh] w-full md:w-[30%] bg-white rounded-md p-3 shadow-sm">
				<form className="h-full w-full flex flex-col items-start gap-1" onSubmit={handleDownloadSettingsSubmit}>
					{/* format */}
					<div className="w-full mb-4">
						<label
							htmlFor="format-select"
							className="uppercase tracking-wide text-gray-500 text-base font-bold"
						>
							Format
						</label>
						<select
							name="format"
							id="format-select"
							className="h-8 w-full rounded-md border border-gray-500 focus:outline-none"
							value={downloadSettings.format}
							onChange={handleDownloadSettingsChange}
						>
							<option value="json">JSON</option>
							<option value="sql">SQL</option>
						</select>
					</div>

					{/* table name - sql */}
					{downloadSettings.format === "sql" ? (
						<div className="w-full mb-4">
							<label
								htmlFor="tableName"
								className="uppercase tracking-wide text-gray-500 text-base font-bold"
							>
								table name
							</label>
							<input
								type="text"
								name="tableName"
								id="tableName"
								className="h-8 w-full rounded-md border border-gray-500 focus:outline-none"
								defaultValue={downloadSettings.tableName}
								onChange={handleDownloadSettingsChange}
							/>
						</div>
					) : downloadSettings.format === "json" ? (
						<div className="w-full mb-4">
							<label htmlFor="type" className="uppercase tracking-wide text-gray-500 text-base font-bold">
								type
							</label>
							<select
								name="type"
								id="type"
								className="h-8 w-full rounded-md border border-gray-500 focus:outline-none"
								value={downloadSettings.type}
								onChange={handleDownloadSettingsChange}
							>
								<option value="object">OBJECT</option>
								<option value="list">LIST</option>
							</select>
						</div>
					) : null}

					{/* records/rows */}
					<div className="w-full mb-4">
						<label
							htmlFor={downloadSettings.format === "json" ? "records" : "rows"}
							className="uppercase tracking-wide text-gray-500 text-base font-bold"
						>
							{downloadSettings.format === "json" ? "Records" : "Rows"}
						</label>
						<input
							type="number"
							name={downloadSettings.format === "json" ? "records" : "rows"}
							id={downloadSettings.format === "json" ? "records" : "rows"}
							className="h-8 w-full rounded-md border border-gray-500 focus:outline-none"
							value={downloadSettings.records || downloadSettings.rows}
							onChange={(e) => {
								if (e.target.valueAsNumber > 1 && e.target.valueAsNumber <= 10000) {
									handleDownloadSettingsChange(e);
								}
							}}
						/>
					</div>

					{/* <div>{JSON.stringify(downloadSettings)}</div> */}
					<div className="absolute bottom-3 right-3 font-sans text-white w-fit h-fit font-bold ">
						<button
							type="submit"
							className="h-10 w-fit bg-gray-400 bg-opacity-80 rounded-md px-5 hover:bg-gray-500 hover:bg-opacity-50"
						>
							DOWNLOAD
						</button>
					</div>
				</form>
			</div>
		</>
	);
}

export default DownloadSettings;
