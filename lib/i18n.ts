import enMessages from "../locale/en.json";
import frMessages from "../locale/fr.json";
import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";

type MessagesMap = {
	[K in Locale]: typeof enMessages;
};

const messages: MessagesMap = {
	en: enMessages,
	fr: frMessages,
} as const;

export const locales = ['en', 'fr'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export default getRequestConfig(async ({ locale }) => {
	const cookieStore = await cookies();
	const cookieLocale = cookieStore.get("locale")?.value;

	const finalLocale: Locale = (locales.includes(cookieLocale as Locale)
		? (cookieLocale as Locale)
		: (locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale));

	return {
		locale: finalLocale,
		messages: messages[finalLocale],
	};
});