import { useId } from "react";
import { SettingsTypesInterface } from "../../contexts/ColumnsContext";
import SettingsWrapper from "./SettingsWrapper";

function IndividualCheckbox({ parameters = {}, setParameters }: SettingsTypesInterface) {
	const newId = useId();
	return (
		<SettingsWrapper>
			{Object.entries(parameters).map(([key, value], index) => {
				return (
					<label htmlFor={key + newId} key={index} className="flex items-center mr-10">
						{key}
						<input
							id={key + newId}
							type="checkbox"
							className="ml-1 accent-gray-500"
							defaultChecked={Boolean(value)}
							onClick={() => {
								setParameters((prev) => ({
									...prev,
									[key]: !value,
								}));
							}}
						></input>
					</label>
				);
			})}
		</SettingsWrapper>
	);
}

export default IndividualCheckbox;
