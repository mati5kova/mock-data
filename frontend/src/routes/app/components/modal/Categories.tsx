import { useContext, useEffect, useState } from "react";
import useCategoryCount from "../../../../hooks/useCategoryCount";
import { ColumnsContext } from "../../contexts/ColumnsContext";
import IndividualTypePill from "./IndividualTypePill";

function Categories() {
	const { possibleFieldTypes, search, setSearch, localPossibleFieldTypes, setLocalPossibleFieldTypes } =
		useContext(ColumnsContext);

	const categoryCounts = useCategoryCount();
	const [underlinedCategory, setUnderlinedCategory] = useState({ category: "", value: false });

	//za potrebe stylinga IndividualTypePill (flex-grow)
	const [categorySearchActive, setCategorySearchActive] = useState(false);

	const handleCategoryClick = (category: string) => {
		setUnderlinedCategory({ category: category, value: true });
		setCategorySearchActive(true);
		setSearch("");
		setLocalPossibleFieldTypes(possibleFieldTypes);
		setLocalPossibleFieldTypes((prev) => prev.filter((p) => p.category === category));
	};

	const handleAllClick = () => {
		setSearch("");
		setUnderlinedCategory({ category: "", value: false });
		setCategorySearchActive(false);
		setLocalPossibleFieldTypes(possibleFieldTypes);
	};

	useEffect(() => {
		//zaradi searcha -> da se zbriše underline na kategoriji (če je)
		if (localPossibleFieldTypes == possibleFieldTypes) {
			setCategorySearchActive(false);
			setUnderlinedCategory({ category: "", value: false });
		}
	}, [localPossibleFieldTypes, possibleFieldTypes]);

	return (
		<div className="w-full h-full mt-5 border-t flex">
			<ul>
				<li
					className="w-32 pb-1 pt-1 first:pt-3 text-gray-500 text-opacity-90 font-semibold cursor-pointer"
					onClick={handleAllClick}
				>{`All (${possibleFieldTypes.reduce((total, current) => total + current.subtypes.length, 0)})`}</li>

				{possibleFieldTypes.map((dt, index) => {
					return (
						<li
							key={index}
							className={`w-32 pb-1 pt-1 first:pt-3 text-gray-500 text-opacity-90 font-semibold cursor-pointer ${underlinedCategory.value && underlinedCategory.category === dt.category && "underline underline-offset-[3px]"}`}
							onClick={() => handleCategoryClick(dt.category)}
						>{`${dt.category} (${categoryCounts[dt.category] || 0})`}</li>
					);
				})}
			</ul>
			<div className="mt-3 p-5 h-[65vh] w-full bg-gray-100 border border-gray-100 rounded-md flex flex-row flex-wrap gap-3 content-start overflow-y-auto">
				{localPossibleFieldTypes.flatMap((dt, index) =>
					dt.subtypes
						.filter((sub) => search === "" || sub.type.toLowerCase().includes(search.toLowerCase()))
						.map((sub) => (
							<IndividualTypePill
								key={`${index}-${sub.type}-${sub.settings}`}
								category={dt.category}
								type={sub.type}
								settings={sub.settings}
								categorySearchActive={categorySearchActive}
							/>
						))
				)}
			</div>
		</div>
	);
}

export default Categories;
