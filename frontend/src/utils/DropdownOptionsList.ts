export function DropdownOptionsList(type: string = "") {
	let dropdownSelectOptions: string[] | number[];
	switch (type) {
		case "cmyk":
		case "hsl":
		case "hwb":
			dropdownSelectOptions = ["decimal", "binary", "css"];
			break;
		case "rgb":
			dropdownSelectOptions = ["decimal", "binary", "css", "hex"];
			break;
		case "isbn":
			dropdownSelectOptions = [13, 10];
			break;
		case "creditCardNumber":
			dropdownSelectOptions = [
				"visa",
				"mastercard",
				"jcb",
				"american_express",
				"diners_club",
				"discover",
				"maestro",
			];
			break;
		case "email":
			dropdownSelectOptions = [
				"gmail.com",
				"yahoo.com",
				"hotmail.com",
				"outlook.com",
				"att.net",
				"aol.com",
				"msn.com",
			];
			break;
		case "accountNumber":
			dropdownSelectOptions = [8, 9, 10, 11, 12];
			break;
		case "hexadecimal":
			dropdownSelectOptions = ["mixed", "lower", "upper"];
			break;
		case "price":
			dropdownSelectOptions = ["€", "$", "£", "¥", "₣"];
			break;
		default:
			dropdownSelectOptions = [""];
			break;
	}
	return dropdownSelectOptions;
}
