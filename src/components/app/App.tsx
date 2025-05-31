import { CSSProperties, useState } from 'react';
import clsx from 'clsx';
import { Article } from 'components/article';
import { ArticleParamsForm } from 'components/article-params-form';
import styles from 'src/styles/index.module.scss';
import { ArticleState, defaultArticleState } from 'src/constants/articleProps';

const App = () => {
	const [articleSettings, setArticleSettings] =
		useState<ArticleState>(defaultArticleState);

	/**
	 * Применяет переданные настройки, обновляя глобальное состояние.
	 * @param options Объект, содержащий полный набор настроек.
	 */
	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articleSettings.fontFamilyOption.value,
					'--font-size': articleSettings.fontSizeOption.value,
					'--font-color': articleSettings.fontColor.value,
					'--container-width': articleSettings.contentWidth.value,
					'--bg-color': articleSettings.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onApplyFormData={setArticleSettings} />
			<Article />
		</main>
	);
};

export default App;
