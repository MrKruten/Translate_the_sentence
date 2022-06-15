import { FC } from 'react';

import { styles } from './styles';

interface INotification {
	isError: boolean;
}

export const Notification: FC<INotification> = ({ isError }) => {
	return (
		<div className={styles.notification} data-success={!isError}>
			{isError ? 'Something wrong' : 'Success'}
		</div>
	);
};
