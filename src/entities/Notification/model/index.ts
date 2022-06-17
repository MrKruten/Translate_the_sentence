import { createEvent, restore } from 'effector';

const setIsErrorNotification = createEvent<boolean>();

const $isErrorNotification = restore(setIsErrorNotification, false);

const setIsShowNotification = createEvent<boolean>();

const $isShowNotification = restore(setIsShowNotification, false);

export const NotificationModel = {
	setIsErrorNotification,
	$isErrorNotification,
	$isShowNotification,
	setIsShowNotification,
};
