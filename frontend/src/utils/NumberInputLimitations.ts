export function NumberInputLimitations(type: string = "") {
	//prva številka je spodnja meja, druga številka je zgornja meja
	let limitation: number[];
	switch (type) {
		case "password":
			limitation = [1, 32];
			break;
		case "float":
			limitation = [1, 16];
			break;
		case "price":
		case "amount":
			limitation = [0, 1000000];
			break;
		case "int":
			limitation = [-9007199254740991, 9007199254740991];
			break;
		case "lines":
			limitation = [1, 24];
			break;
		case "sample":
		case "numeric":
			limitation = [1, 64];
			break;
		case "hexadecimal":
			limitation = [1, 32];
			break;

		default:
			limitation = [1, 2];
			break;
	}
	return limitation;
}
