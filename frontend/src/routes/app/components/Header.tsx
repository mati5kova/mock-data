import logo from "../../../assets/mock-data-high-resolution-logo-transparent.svg";

function Header() {
	return (
		<header className="w-full h-16 bg-white p-2 drop-shadow-sm">
			<img className="h-full" src={logo} alt="Mock data logo"></img>
		</header>
	);
}

export default Header;
