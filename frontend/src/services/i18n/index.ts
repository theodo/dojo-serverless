import keys from 'lodash/keys';
import { createIntl, createIntlCache } from 'react-intl';

import en from './en.json';

type Message = string | NestedDictionary;
interface NestedDictionary {
  [x: string]: Message;
}
interface FlattenedDictionary {
  [x: string]: string;
}

export const flattenMessages = (
  nestedMessages: NestedDictionary,
  prefix = '',
): FlattenedDictionary =>
  keys(nestedMessages).reduce((messages: FlattenedDictionary, key) => {
    const value = nestedMessages[key];
    const prefixedKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'string') {
      messages[prefixedKey] = value;
    } else {
      Object.assign(messages, flattenMessages(value, prefixedKey));
    }

    return messages;
  }, {});

const locales = {
  en: flattenMessages(en),
};

export const cache = createIntlCache();
export const intl = createIntl(
  {
    locale: 'en-EN',
    messages: locales.en,
  },
  cache,
);
