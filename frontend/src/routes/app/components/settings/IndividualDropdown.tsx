import { useId } from "react";
import { DropdownOptionsList } from "../../../../utils/DropdownOptionsList";
import { SettingsTypesInterface } from "../../contexts/ColumnsContext";
import SettingsWrapper from "./SettingsWrapper";

function IndividualDropdown({ type, parameters = {}, setParameters }: SettingsTypesInterface) {
	const newId = useId();
	return (
		<SettingsWrapper>
			{Object.entries(parameters).map(([key, value], index) => {
				const dropdownSelectOptions = DropdownOptionsList(type);

				return (
					<label htmlFor={key + index + newId} key={`${key}-${index}`}>
						{key}
						<select
							id={key + index + newId}
							value={value?.toString()}
							className="h-full w-full outline outline-1 outline-gray-500 rounded-sm max-w-fit ml-3"
							onChange={(e) => {
								let value: string | number = e.target.value;

								//check dodan da deluje tudi če je dropdown poln številk (npr. accountNumber)
								if (!isNaN(parseFloat(e.target.value))) {
									value = Number(value);
								}

								setParameters((prev) => ({
									...prev,
									[key]: value,
								}));
							}}
						>
							{dropdownSelectOptions.map((option, optIndex) => {
								return (
									<option value={option} key={`${option}-${optIndex}`}>
										{option}
									</option>
								);
							})}
						</select>
					</label>
				);
			})}
		</SettingsWrapper>
	);
}
export default IndividualDropdown;
