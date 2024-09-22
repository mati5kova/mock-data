interface SettingsWrapperProps {
	children: React.ReactNode;
}

function SettingsWrapper(props: SettingsWrapperProps) {
	return <div className="h-full w-full flex flex-row items-center">{props.children}</div>;
}

export default SettingsWrapper;
