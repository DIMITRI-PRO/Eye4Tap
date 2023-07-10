import { useTranslation } from "react-i18next";

export const renderListText = (trad, incrementor, limit, key) => {
  const { t } = useTranslation();
  if (!key || !limit || !incrementor || !trad) return null;

  const result = [];

  for (let i = 1; i < limit + 1; i += 1) {
    result.push(`${trad}.${incrementor}-${i}`);
  }

  return (
    result &&
    result.map((el, index) => {
      const keyList = `${key} ${index}`;
      return (
        <li key={keyList} className={`ninja ${key}`}>
          {t(el)}
        </li>
      );
    })
  );
};
