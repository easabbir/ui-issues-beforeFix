import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";
import { LocaleContext } from "../../i18n";
import styles from "./LanguageSelector.module.css";

const LanguageSelector = () => {
	const { locale, setLocale } = useContext(LocaleContext);

	return (
		<div className={styles.containerRemote}>
			<select
				value={locale}
				onChange={(e) => setLocale(e.target.value)}
				className={styles.select}
			>
				<option value="en">English</option>
				<option value="fr">Français</option>
			</select>
			<p className={styles.paragraph}>
				<FormattedMessage id="app.title" />
			</p>
			<p className={styles.paragraph}>
				<FormattedMessage id="app.greeting" values={{ name: "Alice" }} />
			</p>
		</div>
	);
};

export default LanguageSelector;
