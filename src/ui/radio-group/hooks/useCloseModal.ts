import { useState } from 'react';

// Хук для управления состоянием модального окна
export function useCloseModal() {
	const [isOpen, setIsOpen] = useState(false); // Переключатель состояния

	return {
		isOpen, // Текущее состояние окна
		onToggleModal: () => setIsOpen((prevState) => !prevState), // Функция для открытия/закрытия окна
	};
}
