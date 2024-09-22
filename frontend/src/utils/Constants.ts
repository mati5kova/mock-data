export const listOfLanguages = [
	{ code: "EN", name: "English" },
	{ code: "DE", name: "Deutsch" },
	{ code: "IT", name: "Italiano" },
	{ code: "ES", name: "Español" },
];

export const possibleFieldTypes = [
	{
		category: "Airline",
		subtypes: [
			{ type: "aircraftType" },
			{ type: "airline" },
			{ type: "airplane" },
			{ type: "airport" },
			{ type: "flightNumber" },
			{ type: "recordLocator", settings: { allowNumerics: false } },
			{ type: "seat" },
		],
	},
	{ category: "Animal", subtypes: [{ type: "type" }, { type: "dog" }, { type: "cat" }, { type: "rodent" }] },
	{
		category: "Color",
		subtypes: [
			{ type: "cmyk", settings: { format: "decimal" } },
			{ type: "hsl", settings: { format: "decimal" } },
			{ type: "human" },
			{ type: "hwb", settings: { format: "decimal" } },
			{
				type: "rgb",
				settings: { format: "decimal" },
			},
		],
	},
	{
		category: "Commerce",
		subtypes: [
			{ type: "department" },
			{ type: "isbn", settings: { variant: 13 } },
			{ type: "price", settings: { min: 0, max: 1000, symbol: "€" } },
			{ type: "product" },
			{ type: "productAdjective" },
			{ type: "productDescription" },
			{ type: "productMaterial" },
			{ type: "productName" },
		],
	},
	{
		category: "Datatype",
		subtypes: [{ type: "boolean" }],
	},
	{
		category: "Date",
		subtypes: [
			{ type: "anytime" },
			{
				type: "between",
				settings: { from: "1970-1-1", to: new Date() },
			},
			{ type: "future" },
			{ type: "past" },
			{ type: "month", settings: { abbreviated: false } },
			{ type: "weekday", settings: { abbreviated: false } },
		],
	},
	{
		category: "Finance",
		subtypes: [
			{ type: "accountName" },
			{ type: "accountNumber", settings: { length: 8 } },
			{ type: "amount", settings: { min: 0, max: 1000 } },
			{ type: "bic" },
			{ type: "bitcoinAddress" },
			{ type: "creditCardCVV" },
			{ type: "creditCardIssuer" },
			{
				type: "creditCardNumber",
				settings: { issuer: "visa" },
			},
			{ type: "currency" },
			{ type: "currencyCode" },
			{ type: "currrencyName" },
			{ type: "currrencySymbol" },
			{ type: "ethereumAddress" },
			{ type: "iban", settings: { formatted: false } },
			{ type: "pin" },
		],
	},
	{
		category: "Image",
		subtypes: [{ type: "dataUri" }, { type: "url" }],
	},
	{
		category: "Internet",
		subtypes: [
			{ type: "domainName" },
			{ type: "domainSuffix" },
			{ type: "httpMethod" },
			{ type: "httpStatusCode" },
			{ type: "ipv4" },
			{ type: "ipv6" },
			{ type: "port" },
			{ type: "protocol" },
			{ type: "email", settings: { allowSpecialCharacters: false, provider: "gmail.com" } },
			{ type: "password", settings: { length: 15 } },
		],
	},
	{
		category: "Location",
		subtypes: [
			{ type: "country" },
			{ type: "countryCode" },
			{ type: "city" },
			{ type: "zipCode" },
			{ type: "street" },
			{ type: "streetAddress" },
			{ type: "buildingNumber" },
			{ type: "timeZone" },
		],
	},
	{
		category: "Lorem",
		subtypes: [{ type: "lines", settings: { min: 1, max: 5 } }, { type: "text" }, { type: "word" }],
	},
	{
		category: "Music",
		subtypes: [{ type: "genre" }, { type: "songName" }],
	},
	{
		category: "Number",
		subtypes: [
			{ type: "bigInt" },
			{ type: "binary" },
			{ type: "float", settings: { fractionDigits: 3 } },
			{ type: "hex" },
			{ type: "int", settings: { min: -1000, max: 1000 } },
			{ type: "octal" },
		],
	},
	{
		category: "Person",
		subtypes: [
			{ type: "firstName" },
			{ type: "lastName" },
			{ type: "fullName" },
			{ type: "sex" },
			{ type: "jobTitle" },
			{ type: "jobType" },
		],
	},
	{
		category: "String",
		subtypes: [
			{ type: "binary" },
			{ type: "hexadecimal", settings: { length: 5, casing: "mixed" } },
			{ type: "numeric", settings: { min: 1, max: 64 } },
			{ type: "sample", settings: { min: 1, max: 64 } },
			{ type: "symbol" },
			{ type: "uuid" },
		],
	},
	{
		category: "System",
		subtypes: [
			{ type: "fileExt" },
			{ type: "fileName" },
			{ type: "filePath" },
			{ type: "fileType" },
			{ type: "mimeType" },
		],
	},
	{
		category: "Vehicle",
		subtypes: [
			{ type: "type" },
			{ type: "fuel" },
			{ type: "manufacturer" },
			{ type: "model" },
			{ type: "vehicle" },
			{ type: "vin" },
			{ type: "vrm" },
		],
	},
];

//id ne sme bit 0 zaradi dnd-kit
export const __DEFAULT_COLUMN_STARTER__ = [
	{ id: 1, name: "id", category: "String", type: "uuid", settings: {} },
	{ id: 2, name: "first_name", category: "Person", type: "firstName", settings: {} },
	{ id: 3, name: "last_name", category: "Person", type: "lastName", settings: {} },
	{
		id: 4,
		name: "email",
		category: "Internet",
		type: "email",
		settings: { allowSpecialCharacters: false, provider: "gmail.com" },
	},
];

export const __DEFAULT_COLUMN__ = {
	id: 1,
	name: "new_field",
	category: "String",
	type: "sample",
	settings: { min: 1, max: 64 },
};
