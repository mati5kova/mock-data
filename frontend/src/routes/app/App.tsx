import { useState } from "react";
import { __DEFAULT_COLUMN_STARTER__, listOfLanguages, possibleFieldTypes } from "../../utils/Constants";
import ActiveOverlay from "./components/ActiveOverlay";
import ColumnsList from "./components/ColumnsList";
import DottedBackground from "./components/DottedBackground";
import DownloadSettingsAndPreview from "./components/DownloadSettingsAndPreview";
import Header from "./components/Header";
import LanguageSelector from "./components/LanguageSelector";
import SectionContainer from "./components/SectionContainer";
import SelectTypeModal from "./components/modal/SelectTypeModal";
import { ColumnsContext, PossibleFieldTypesInterface } from "./contexts/ColumnsContext";

function App() {
	const [language, setLanguage] = useState(listOfLanguages[0]);
	const [activeOverlay, setActiveOverlay] = useState(false);
	const [columns, setColumns] = useState(__DEFAULT_COLUMN_STARTER__);
	const [search, setSearch] = useState("");
	const [currentSelectingTypeForColumnId, setCurrentSelectingTypeForColumnId] = useState(0);
	const [localPossibleFieldTypes, setLocalPossibleFieldTypes] = useState(
		possibleFieldTypes as PossibleFieldTypesInterface[]
	);

	const dataToSend = {
		language,
		columns,
	};

	return (
		<ColumnsContext.Provider
			value={{
				columns,
				setColumns,
				possibleFieldTypes,
				language,
				setLanguage,
				activeOverlay,
				setActiveOverlay,
				search,
				setSearch,
				currentSelectingTypeForColumnId,
				setCurrentSelectingTypeForColumnId,
				localPossibleFieldTypes,
				setLocalPossibleFieldTypes,
			}}
		>
			<DottedBackground />
			<ActiveOverlay />
			<SelectTypeModal />
			<main className="h-screen w-screen overflow-x-hidden overflow-y-scroll font-sans">
				<Header />
				<div className="flex items-center flex-col flex-wrap gap-12 py-12">
					<SectionContainer>
						<div className="w-full h-6 flex justify-between mb-7">
							<div className="flex flex-row relative top-5 left-12 font-bold text-gray-500 text-opacity-70">
								<div className="w-48 mr-5">FIELD NAME</div>
								<div className="w-48 mr-5">TYPE</div>
								<div className="w-80 mr-7">EXAMPLE</div>
								<div className="">SETTINGS</div>
							</div>
							<div>
								<button
									role="button"
									className="mr-4 px-2"
									onClick={() => console.log(JSON.stringify(dataToSend))}
								>
									print
								</button>
								<LanguageSelector />
							</div>
						</div>
						<ColumnsList />
					</SectionContainer>

					<SectionContainer>
						<DownloadSettingsAndPreview />
					</SectionContainer>
				</div>
			</main>
		</ColumnsContext.Provider>
	);
}

export default App;
