import { formatDate } from "../../../../utils/FormatDate";
import { SettingsTypesInterface } from "../../contexts/ColumnsContext";
import SettingsWrapper from "./SettingsWrapper";

function IndividualCalendar({ parameters = {}, setParameters }: SettingsTypesInterface) {
	return (
		<SettingsWrapper>
			{Object.entries(parameters).map(([key, value], index) => {
				return (
					<label htmlFor={key} key={index} className="flex items-center mr-10">
						{key}
						<input
							id={key}
							type="date"
							className="ml-1 accent-gray-500"
							value={formatDate(String(value))}
							onChange={(e) => {
								const newDate = new Date(e.target.value);
								setParameters((prev) => ({
									...prev,
									[key]: newDate.toString(),
								}));
							}}
						></input>
					</label>
				);
			})}
		</SettingsWrapper>
	);
}

export default IndividualCalendar;
