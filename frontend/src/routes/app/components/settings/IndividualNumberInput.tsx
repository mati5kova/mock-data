import { useId } from "react";
import { NumberInputLimitations } from "../../../../utils/NumberInputLimitations";
import { SettingsTypesInterface } from "../../contexts/ColumnsContext";
import SettingsWrapper from "./SettingsWrapper";

function IndividualNumberInput({ type, parameters = {}, setParameters }: SettingsTypesInterface) {
	const limitations = NumberInputLimitations(type);
	const newId = useId();
	return (
		<SettingsWrapper>
			{Object.entries(parameters).map(([key, value], index) => {
				return (
					<label htmlFor={index + newId} key={index} className="flex items-center mr-10">
						{key}
						<input
							id={index + newId}
							type="number"
							value={Number(value) || limitations[0]}
							className="h-full w-full ml-1 accent-gray-500 outline outline-1 outline-gray-500 rounded-sm"
							onChange={(e) => {
								let adjustedValue = e.target.valueAsNumber;

								if (e.target.valueAsNumber < limitations[0]) {
									adjustedValue = limitations[0];
								} else if (e.target.valueAsNumber > limitations[1]) {
									adjustedValue = limitations[1];
								} else if (isNaN(adjustedValue) === false) {
									setParameters((prev) => ({ ...prev, [key]: adjustedValue }));
								} else if (isNaN(adjustedValue) === true) {
									setParameters((prev) => ({ ...prev, [key]: limitations[0] }));
								}
							}}
							onBlur={() => {
								//če slučajno nekako pride NaN
								if (isNaN(Number(value))) {
									setParameters((prev) => ({ ...prev, [key]: limitations[0] }));
								}
							}}
						/>
					</label>
				);
			})}
		</SettingsWrapper>
	);
}

export default IndividualNumberInput;
