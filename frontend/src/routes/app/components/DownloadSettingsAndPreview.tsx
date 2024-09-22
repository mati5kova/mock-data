import DownloadSettings from "./DownloadSettings";
import Preview from "./Preview";

function DownloadSettingsAndPreview() {
	return (
		<div className="flex flex-wrap flex-row justify-between max-h-[50vh] sm:max-md:gap-5">
			<Preview />
			<DownloadSettings />
		</div>
	);
}

export default DownloadSettingsAndPreview;
