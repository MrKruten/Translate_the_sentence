import { FC } from 'react';
import { useStore } from 'effector-react';

import { ReactComponent as User } from 'shared/images/User.svg';

import { SentenceModel } from '../model';

import { styles } from './style';

export const Sentence: FC = () => {
	const sentence = useStore(SentenceModel.$sentence);

	return (
		<div className={styles.container}>
			<div className={styles.personImg}>
				<User />
			</div>
			<div className={styles.sentence}>
				{sentence.ru.split(' ').map((word, id) => (
					<span className={styles.word} key={`${word}-${id + 1}`}>
						{word}
					</span>
				))}
			</div>
		</div>
	);
};
