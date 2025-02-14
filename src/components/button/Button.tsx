import { I18nProvider } from "@/i18n";
import React from "react";
import { FormattedMessage } from "react-intl";
import LanguageSelector from "../languageSelector/LanguageSelector";
import styles from "./Button.module.css";

function Button() {
	return (
		<I18nProvider>
			<div className={styles.containerRemote}>
				<button type="button" className={styles.button}>
					<FormattedMessage id="button.clickme" />
				</button>
				<LanguageSelector />
			</div>
		</I18nProvider>
	);
}

export default Button;
