import { useEffect, useState, RefObject } from 'react';

// Хук для управления состоянием модального окна
export function useCloseModal(dialogRef: RefObject<HTMLDivElement | null>) {
	const [isOpen, setIsOpen] = useState(false); // Переключатель состояния

	useEffect(() => {
		// Обработчик, который срабатывает, когда кликают мышкой
		const handleClickOutside = (event: MouseEvent): void => {
			if (
				dialogRef.current &&
				!dialogRef.current.contains(event.target as Node)
			) {
				setIsOpen(false); // Если кликнули вне окна, закрываем его
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside); // Убираем слушатель кликов
		};
	}, [isOpen, dialogRef]);
	return {
		isOpen, // Текущее состояние окна
		onToggleModal: () => setIsOpen((prevState) => !prevState), // Функция для открытия/закрытия окна
	};
}
