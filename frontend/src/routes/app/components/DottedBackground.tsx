function DottedBackground() {
	return (
		<div
			className="absolute -z-50 bg-gray-100 h-full w-full "
			style={{
				backgroundImage: "radial-gradient(#e5e7eb 1px, transparent 1px)",
				backgroundSize: "16px 16px",
			}}
		></div>
	);
}

export default DottedBackground;
