import identicon from "identicon.js";

export const imageData = (data: any, option = {}) => {
	const options = {
		size: 10,
		format: "svg",
		...option
	}

	const iconData = new identicon(data, options).toString();

	return `data:image/svg+xml;base64,${iconData}`;
}

const ImageIcon = (props: any) => {
	const {data} = props;
	const options = {
		...props
	}
	const iconData = imageData(data, options);
	return (
		<img width={options.size} alt={data} height={options.size} src={iconData} style={{borderRadius: "50%"}} {...props}/>
	)
}

export default ImageIcon;