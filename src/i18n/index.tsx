import React, { type ReactNode, useState, createContext } from "react";
import { IntlProvider } from "react-intl";
import enMessages from "../locales/en.json";
import frMessages from "../locales/fr.json";

type Messages = {
	[key: string]: { [key: string]: string };
};

const messages: Messages = {
	en: enMessages,
	fr: frMessages,
};

const getBrowserLocale = (): string => {
	const locale = navigator.language.split("-")[0]; // Get language code
	return messages[locale] ? locale : "en"; // Default to English if not supported
};

type LocaleContextType = {
	locale: string;
	setLocale: (locale: string) => void;
};

export const LocaleContext = createContext<LocaleContextType>({
	locale: "en",
	setLocale: () => {},
});

export const I18nProvider = ({ children }: { children: ReactNode }) => {
	const [locale, setLocale] = useState(getBrowserLocale());

	return (
		<LocaleContext.Provider value={{ locale, setLocale }}>
			<IntlProvider locale={locale} messages={messages[locale]}>
				{children}
			</IntlProvider>
		</LocaleContext.Provider>
	);
};
