import { useEffect, useState } from "react";
import DownloadSettings from "./DownloadSettings";
import Preview from "./Preview";

const defaultJsonDownloadSettings = {
	format: "json",
	fields: 100,
};
const defaultSqlDownloadSettings = {
	format: "sql",
	rows: 100,
};

function DownloadSettingsAndPreview() {
	const [downloadSettings, setDownloadSettings] = useState<{ [key: string]: string | number }>(
		defaultJsonDownloadSettings
	);

	useEffect(() => {
		if (downloadSettings.format === "json") {
			setDownloadSettings(defaultJsonDownloadSettings);
		} else if (downloadSettings.format === "sql") {
			setDownloadSettings(defaultSqlDownloadSettings);
		}

		return () => {
			setDownloadSettings(defaultJsonDownloadSettings);
		};
	}, [downloadSettings.format]);

	return (
		<div className="flex flex-wrap flex-row justify-between max-h-[50vh] sm:max-md:gap-5">
			<Preview downloadSettings={downloadSettings} />
			<DownloadSettings downloadSettings={downloadSettings} setDownloadSettings={setDownloadSettings} />
		</div>
	);
}

export default DownloadSettingsAndPreview;
