import { createContext } from "react";

export interface SettingsInterface {
	[key: string]: string | number | boolean | Date | undefined;
}

export interface SettingsTypesInterface {
	type?: string;
	parameters: SettingsInterface;
	setParameters: React.Dispatch<React.SetStateAction<SettingsInterface>>;
}

export interface IndividualColumnInterface {
	id: number;
	name: string;
	category: string;
	type: string;
	settings: SettingsInterface;
}

export interface PossibleFieldTypesInterface {
	category: string;
	subtypes: {
		type: string;
		settings?: SettingsInterface;
	}[];
}

interface ColumnsContextInterface {
	language: {
		code: string;
		name: string;
	};
	setLanguage: React.Dispatch<React.SetStateAction<{ name: string; code: string }>>;

	columns: IndividualColumnInterface[];
	setColumns: React.Dispatch<React.SetStateAction<IndividualColumnInterface[]>>;

	possibleFieldTypes: PossibleFieldTypesInterface[];

	activeOverlay: boolean;
	setActiveOverlay: React.Dispatch<React.SetStateAction<boolean>>;

	search: string;
	setSearch: React.Dispatch<React.SetStateAction<string>>;

	currentSelectingTypeForColumnId: number;
	setCurrentSelectingTypeForColumnId: React.Dispatch<React.SetStateAction<number>>;

	localPossibleFieldTypes: PossibleFieldTypesInterface[];
	setLocalPossibleFieldTypes: React.Dispatch<React.SetStateAction<PossibleFieldTypesInterface[]>>;
}

export const ColumnsContext = createContext<ColumnsContextInterface>({
	possibleFieldTypes: [{ category: "", subtypes: [{ type: "", settings: {} }] }],
	language: {
		name: "",
		code: "",
	},
	setLanguage: () => {},

	columns: [],
	setColumns: () => {},

	activeOverlay: false,
	setActiveOverlay: () => {},

	search: "",
	setSearch: () => {},

	currentSelectingTypeForColumnId: 0,
	setCurrentSelectingTypeForColumnId: () => {},

	localPossibleFieldTypes: [{ category: "", subtypes: [{ type: "", settings: {} }] }],
	setLocalPossibleFieldTypes: () => {},
});
