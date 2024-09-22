import { useContext, useEffect, useState } from "react";
import { ColumnsContext } from "../routes/app/contexts/ColumnsContext";

type CategoryCounts = {
	[category: string]: number;
};

function useCategoryCount() {
	const { search, possibleFieldTypes } = useContext(ColumnsContext);
	const [categoryCounts, setCategoryCounts] = useState<CategoryCounts>({});

	useEffect(() => {
		const updatedCounts: CategoryCounts = {};

		possibleFieldTypes.forEach((dt) => {
			const filteredSubtypes = dt.subtypes.filter(
				(sub) => search === "" || sub.type.toLowerCase().includes(search.toLowerCase())
			);
			updatedCounts[dt.category] = filteredSubtypes.length;
		});

		setCategoryCounts(updatedCounts);
	}, [search, possibleFieldTypes]);

	return categoryCounts;
}

export default useCategoryCount;
