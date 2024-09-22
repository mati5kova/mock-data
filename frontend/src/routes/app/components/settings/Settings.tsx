import { useContext, useEffect, useState } from "react";
import { ColumnsContext, IndividualColumnInterface } from "../../contexts/ColumnsContext";
import IndividualCalendar from "./IndividualCalendar";
import IndividualCheckbox from "./IndividualCheckbox";
import IndividualDropdown from "./IndividualDropdown";
import IndividualNumberInput from "./IndividualNumberInput";

interface SettingsInterface {
	column: IndividualColumnInterface;
}

// 1 checkbox: recordLocator, month, weekday, iban,
// 1 dropdown: cmyk, hsl, hwb, rgb, isbn(10|13), creditCardNumber, accountNumber(8-12),
// 1 checkbox + 1 dropdown: email
// 1 številski input: password, float
// 2 številska inputa: amount, int, lines(1-5), numeric, sample
// 1 številski input + dropdown: hexadecimal(mixed, lower, upper)
// 2 številska input polja + 1 dropdown: price
// 2 koledarja: between

function Settings({ column }: SettingsInterface) {
	const { setColumns } = useContext(ColumnsContext);
	const [parameters, setParameters] = useState(column.settings);

	useEffect(() => {
		//da se posodobi ko zamenjaš column.type
		setParameters(column.settings);
	}, [column]);

	useEffect(() => {
		//za namene posodabljanja useExample; column.settings = parameters ne deluje ker je object reference isti
		setColumns((prevColumns) => {
			return prevColumns.map((prevCol) => {
				if (prevCol === column) {
					return { ...prevCol, settings: parameters };
				}
				return prevCol;
			});
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [parameters]);

	return (
		<>
			{["recordLocator", "weekday", "month", "iban"].includes(column.type) && (
				<IndividualCheckbox parameters={parameters} setParameters={setParameters} />
			)}

			{["cmyk", "hsl", "hwb", "rgb", "isbn", "creditCardNumber", "accountNumber"].includes(column.type) && (
				<IndividualDropdown type={column.type} parameters={parameters} setParameters={setParameters} />
			)}
			{["email"].includes(column.type) && (
				/* format v constants.ts more bit najprej checkbox potem dropdown nastavitev*/
				<>
					<IndividualCheckbox
						parameters={{ [Object.keys(parameters)[0]]: Object.values(parameters)[0] }}
						setParameters={setParameters}
					/>
					<IndividualDropdown
						type={column.type}
						parameters={{ [Object.keys(parameters)[1]]: Object.values(parameters)[1] }}
						setParameters={setParameters}
					/>
				</>
			)}
			{["password", "float"].includes(column.type) && (
				<IndividualNumberInput type={column.type} parameters={parameters} setParameters={setParameters} />
			)}
			{["amount", "int", "lines", "numeric", "octal", "sample"].includes(column.type) && (
				<>
					<IndividualNumberInput
						type={column.type}
						parameters={{ [Object.keys(parameters)[0]]: Object.values(parameters)[0] }}
						setParameters={setParameters}
					/>
					<IndividualNumberInput
						type={column.type}
						parameters={{ [Object.keys(parameters)[1]]: Object.values(parameters)[1] }}
						setParameters={setParameters}
					/>
				</>
			)}
			{["hexadecimal"].includes(column.type) && (
				/* format v constants.ts more bit najprej checkbox potem dropdown nastavitev*/
				<>
					<IndividualNumberInput
						type={column.type}
						parameters={{ [Object.keys(parameters)[0]]: Object.values(parameters)[0] }}
						setParameters={setParameters}
					/>
					<IndividualDropdown
						type={column.type}
						parameters={{ [Object.keys(parameters)[1]]: Object.values(parameters)[1] }}
						setParameters={setParameters}
					/>
				</>
			)}
			{["price"].includes(column.type) && (
				/* format v constants.ts more bit najprej range potem dropdown nastavitev*/
				<>
					<IndividualNumberInput
						type={column.type}
						parameters={{ [Object.keys(parameters)[0]]: Object.values(parameters)[0] }}
						setParameters={setParameters}
					/>
					<IndividualNumberInput
						type={column.type}
						parameters={{ [Object.keys(parameters)[1]]: Object.values(parameters)[1] }}
						setParameters={setParameters}
					/>
					<IndividualDropdown
						type={column.type}
						parameters={{ [Object.keys(parameters)[2]]: Object.values(parameters)[2] }}
						setParameters={setParameters}
					/>
				</>
			)}
			{["between"].includes(column.type) && (
				<>
					<IndividualCalendar
						type={column.type}
						parameters={{ [Object.keys(parameters)[0]]: Object.values(parameters)[0] }}
						setParameters={setParameters}
					/>
					<IndividualCalendar
						type={column.type}
						parameters={{ [Object.keys(parameters)[1]]: Object.values(parameters)[1] }}
						setParameters={setParameters}
					/>
				</>
				
			)}
		</>
	);
}

export default Settings;
