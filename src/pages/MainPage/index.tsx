import { useState } from 'react';

import { Sentence } from 'entities/Sentence';
import { Button } from 'shared/ui/Button';
import { Notification } from 'entities/Notification';

import { styles } from './styles';

const phrase = 'She is eating an apple and and they are eating bread';

const MainPage = () => {
	const sentence = phrase;
	const [isError, setIsError] = useState(true);

	return (
		<div className={styles.page}>
			<div className={styles.container}>
				<h1 className={styles.head}>Translate this sentence</h1>
				<Sentence sentence={sentence} />
				<div className={styles.marginWrapper}>
					<Notification isError={isError} isShow={false} />
				</div>
				<div className={styles.marginWrapper}>
					<Button>Check</Button>
				</div>
			</div>
		</div>
	);
};

export default MainPage;
