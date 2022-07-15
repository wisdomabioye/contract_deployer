import { appInfo } from '../app.config';

const Footer = () => {
	const { name, currentYear, domain, authorDomain } = appInfo;
	return (
		<footer className="text-center py-4 px-1">
			<h4 className="h6">
				&copy; { currentYear }, <a className="text-decoration-none" href={domain}>{ name }</a> <br /> 
				Contact: <a className="text-decoration-none" href={authorDomain} target="_blank" rel="noreferrer">{ authorDomain }</a>
			</h4>
		</footer>
	)
}

export default Footer;
