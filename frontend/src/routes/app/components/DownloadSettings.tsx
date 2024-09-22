type DownloadSettings = Record<string, string | number>;

interface DownloadSettingsInterface {
	downloadSettings: DownloadSettings;
	setDownloadSettings: React.Dispatch<React.SetStateAction<DownloadSettings>>;
}

function DownloadSettings({ downloadSettings, setDownloadSettings }: DownloadSettingsInterface) {
	const handleDownloadSettingsChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
		const name = e.target.name;
		const value = e.target.type === "number" ? Number(e.target.value) : e.target.value;
		setDownloadSettings((prevValues) => ({ ...prevValues, [name]: value }));
	};

	const handleDownloadSettingsSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("submitted");
		//download
	};

	return (
		<>
			<div className="h-full w-full md:w-[30%] bg-white rounded-md p-3 shadow-sm">
				<form className="flex flex-col items-start gap-1" onSubmit={handleDownloadSettingsSubmit}>
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

					<div className="w-full mb-4">
						<label
							htmlFor={downloadSettings.format === "json" ? "fields" : "rows"}
							className="uppercase tracking-wide text-gray-500 text-base font-bold"
						>
							{downloadSettings.format === "json" ? "Fields" : "Rows"}
						</label>
						<input
							type="number"
							name={downloadSettings.format === "json" ? "fields" : "rows"}
							id={downloadSettings.format === "json" ? "fields" : "rows"}
							className="h-8 w-full rounded-md border border-gray-500 focus:outline-none"
							value={downloadSettings.fields || downloadSettings.rows}
							onChange={(e) => {
								if (e.target.valueAsNumber > 1 && e.target.valueAsNumber <= 10000) {
									handleDownloadSettingsChange(e);
								}
							}}
						/>
					</div>

					<div>{JSON.stringify(downloadSettings)}</div>
					<button type="submit">SUBMIT</button>
				</form>
			</div>
		</>
	);
}

export default DownloadSettings;
