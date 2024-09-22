import { ChangeEvent, useContext } from "react";
import { listOfLanguages } from "../../../utils/Constants";
import { ColumnsContext } from "../contexts/ColumnsContext";


function LanguageSelector() {
	const { language, setLanguage } = useContext(ColumnsContext);

	const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
		listOfLanguages.map((lng) => {
			lng.code === event.target.value ? setLanguage(lng) : null;
		});
	};

	return (
		<>
			<select
				name="Select language"
				className="font-sans h-fit w-fit p-1.5 rounded-sm outline outline-1 outline-gray-300"
				aria-label="Select language"
				onChange={handleLanguageChange}
				defaultValue={language.code}
			>
				{listOfLanguages.map((language) => {
					return (
						<option key={language.code} value={language.code}>
							{language.name}
						</option>
					);
				})}
			</select>
		</>
	);
}

export default LanguageSelector;
