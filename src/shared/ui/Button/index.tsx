import { FC, ReactNode } from 'react';

import { styles } from './styles';

interface IButton {
	onClick?: () => void;
	isDisabled?: boolean;
	children?: ReactNode;
}

export const Button: FC<IButton> = ({
	onClick = () => {},
	isDisabled = false,
	children,
}) => (
	<button
		type='button'
		disabled={isDisabled}
		onClick={onClick}
		className={styles.button}
	>
		{children}
	</button>
);
