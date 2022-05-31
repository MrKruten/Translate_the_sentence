import { FC } from 'react';

import { ReactComponent as User } from 'shared/images/User.svg';

import { styles } from './style';

interface ISentence {
	sentence: Array<string>;
}

export const Sentence: FC<ISentence> = ({ sentence }) => (
	<div className={styles.container}>
		<div className={styles.personImg}>
			<User />
		</div>
		<div className={styles.sentence}>
			{sentence.map((word, id) => (
				<span className={styles.word} key={`${word}-${id + 1}`}>
					{word}
				</span>
			))}
		</div>
	</div>
);
