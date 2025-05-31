import { useRef, useState, FormEvent } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useCloseModal } from 'src/ui/radio-group/hooks/useCloseModal';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import {
	ArticleState,
	ArticleStateKey,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';

interface IArticleParamsFrom {
	onApplyFormData: (options: ArticleState) => void;
}

export const ArticleParamsForm = ({ onApplyFormData }: IArticleParamsFrom) => {
	const dialogRef = useRef<HTMLDivElement>(null);
	const [articleParams, setArticleParams] = useState(defaultArticleState);

	const { isOpen, onToggleModal } = useCloseModal(dialogRef);

	const onChange = (options: OptionType, optionName: ArticleStateKey) =>
		setArticleParams((prevState) => ({
			...prevState,
			[optionName]: options,
		}));

	const onReset = () => {
		setArticleParams(defaultArticleState);
		onApplyFormData(defaultArticleState);
	};

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onApplyFormData(articleParams);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onToggleModal} />
			<aside
				ref={dialogRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} onReset={onReset} onSubmit={onSubmit}>
					<Text as='h2' size={31} weight={800} uppercase dynamicLite>
						Задайте параметры
					</Text>
					<Select
						selected={articleParams.fontFamilyOption}
						onChange={(options) => onChange(options, 'fontFamilyOption')}
						options={fontFamilyOptions}
						title='Шрифт'
					/>
					<RadioGroup
						selected={articleParams.fontSizeOption}
						name='radio'
						onChange={(options) => onChange(options, 'fontSizeOption')}
						options={fontSizeOptions}
						title='Размер шрифта'
					/>
					<Select
						selected={articleParams.fontColor}
						onChange={(options) => onChange(options, 'fontColor')}
						options={fontColors}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={articleParams.backgroundColor}
						onChange={(options) => onChange(options, 'backgroundColor')}
						options={backgroundColors}
						title='Цвет фона'
					/>
					<Select
						selected={articleParams.contentWidth}
						onChange={(options) => onChange(options, 'contentWidth')}
						options={contentWidthArr}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
