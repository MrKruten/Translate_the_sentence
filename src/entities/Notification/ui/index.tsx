import { FC } from 'react';
import { useStore } from 'effector-react';

import { NotificationModel } from '../model';

import { styles } from './styles';

export const Notification: FC = () => {
	const isError = useStore(NotificationModel.$isErrorNotification);
	return (
		<div className={styles.notification} data-is-success={!isError}>
			{isError ? 'Something wrong' : 'Success'}
		</div>
	);
};
