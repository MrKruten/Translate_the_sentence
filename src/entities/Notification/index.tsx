import { FC } from 'react';

import { styles } from './styles';

interface INotification {
	isError: boolean;
	isShow: boolean;
}

export const Notification: FC<INotification> = ({ isError, isShow }) => {
	if (!isShow) {
		return null;
	}

	return (
		<div className={styles.notification} data-success={!isError}>
			{isError ? 'Something wrong' : 'Success'}
		</div>
	);
};
