/* eslint-disable @typescript-eslint/no-explicit-any */
import { Faker } from "@faker-js/faker";
import { faker as fakerDE } from "@faker-js/faker/locale/de";
import { faker as fakerEN } from "@faker-js/faker/locale/en";
import { faker as fakerES } from "@faker-js/faker/locale/es";
import { faker as fakerIT } from "@faker-js/faker/locale/it";
import { SettingsInterface } from "../routes/app/contexts/ColumnsContext";

interface ExampleInterface {
	category: keyof Faker | string;
	type: string;
	settings: SettingsInterface;
	language: { code: string };
}

function getExample({ category, type, settings, language }: ExampleInterface): string {
	category = category.toLowerCase();
	let fakerInstance: Faker | undefined;
	let exampleValue: any;
	let example = "";

	switch (language.code) {
		case "EN":
			fakerInstance = fakerEN;
			break;
		case "DE":
			fakerInstance = fakerDE;
			break;
		case "IT":
			fakerInstance = fakerIT;
			break;
		case "ES":
			fakerInstance = fakerES;
			break;
		default:
			fakerInstance = fakerEN;
			break;
	}

	if (fakerInstance && category in fakerInstance) {
		if (Object.keys(settings).length !== 0) {
			try {
				if (["numeric"].includes(type) && category === "string") {
					exampleValue = (fakerInstance[category as keyof Faker] as any)[type]?.({
						length: settings,
					});
				} else {
					exampleValue = (fakerInstance[category as keyof Faker] as any)[type]?.(settings);
				}
			} catch (e) {
				return "no example";
			}
		} else {
			try {
				exampleValue = (fakerInstance[category as keyof Faker] as any)[type]?.();
			} catch (e) {
				return "no example";
			}
		}

		if (typeof exampleValue === "object" && exampleValue !== null) {
			if (exampleValue.name) {
				example = exampleValue.name;
			} else {
				example = JSON.stringify(exampleValue);
			}
		} else if (exampleValue !== undefined) {
			example = exampleValue;
		}
	} else {
		example = "no example";
	}

	return example;
}

export default getExample;
