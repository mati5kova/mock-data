interface SectionContainerProps {
	children: React.ReactNode;
}

function SectionContainer(props: SectionContainerProps) {
	return (
		<>
			<div className="min-h-fit h-auto w-5/6 rounded-md bg-gray-200 p-4 opacity-80 text-zinc-800">
				{props.children}
			</div>
		</>
	);
}

export default SectionContainer;
