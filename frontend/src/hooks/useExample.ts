/* eslint-disable @typescript-eslint/no-explicit-any */
import { Faker } from "@faker-js/faker";
import { faker as fakerDE } from "@faker-js/faker/locale/de";
import { faker as fakerEN } from "@faker-js/faker/locale/en";
import { faker as fakerES } from "@faker-js/faker/locale/es";
import { faker as fakerIT } from "@faker-js/faker/locale/it";
import { useContext, useEffect, useState } from "react";
import { ColumnsContext, SettingsInterface } from "../routes/app/contexts/ColumnsContext";

interface ExampleInterface {
	category: keyof Faker | string;
	type: string;
	settings: SettingsInterface;
}

function useExample({ category, type, settings }: ExampleInterface) {
	category = category.toLowerCase();
	const { language } = useContext(ColumnsContext);
	const [example, setExample] = useState<string>("");

	useEffect(() => {
		let fakerInstance: Faker | undefined;
		let exampleValue;

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
				//to naredi če nastavitve niso prazne
				try {
					if (["numeric"].includes(type) && category === "string") {
						exampleValue = (fakerInstance[category as keyof Faker] as any)[type]?.({
							length: settings,
						});
						console.log(exampleValue);
					} else {
						exampleValue = (fakerInstance[category as keyof Faker] as any)[type]?.(settings);
					}
				} catch (e) {
					setExample("no example");
				}
			} else {
				try {
					exampleValue = (fakerInstance[category as keyof Faker] as any)[type]?.();
				} catch (e) {
					setExample("no example");
				}
			}

			//check za tiste stvari ki vrnejo objekt/array
			if (typeof exampleValue === "object" && exampleValue !== null) {
				if (exampleValue.name) {
					setExample(exampleValue.name);
				} else {
					//za barve... npr cmyk (format:decimal vrne array številk)
					setExample(JSON.stringify(exampleValue));
				}
				//začasen check če je npr. min > max v nastavitvah (parameters)
			} else if (exampleValue !== undefined) {
				setExample(exampleValue);
			}
		} else {
			setExample("no example");
		}
	}, [type, language, category, settings]);

	return example;
}

export default useExample;
