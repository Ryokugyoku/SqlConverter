// i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(initReactI18next) // react-i18nextを初期化
  .use(HttpBackend) // バックエンドとしてhttp-backendを使用
  .use(LanguageDetector) // 言語検出機能を使用
  .init({
    fallbackLng: 'en', // デフォルトの言語を設定
    debug: true, // 開発中はデバッグ情報を有効に
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage', 'cookie'],
    },
    backend: {
      loadPath: '/locales/{{lng}}/translate.json', // 翻訳ファイルのパス
    },
  });

export default i18n;