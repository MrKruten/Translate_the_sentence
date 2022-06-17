import { useEffect } from 'react';
import { useStore } from 'effector-react';

import { Sentence, SentenceModel } from 'entities/Sentence';
import { DropList } from 'widgets/DropList';

import { styles } from './styles';

const phrases = {
	ru: 'Я люблю хоккей, но у меня нет любимой команды',
	en: 'I like hockey, but I dont`t have a favorite team',
	__typename: 'Sentence',
};

const MainPage = () => {
	const isLoading = useStore(SentenceModel.loading);
	useEffect(() => {
		SentenceModel.getAllSentences();
	}, []);

	if (isLoading) {
		return <h1>Loading...</h1>;
	}

	return (
		<div className={styles.page}>
			<div className={styles.container}>
				<h1 className={styles.head}>Translate this sentence</h1>
				<Sentence />
				<div className={styles.marginWrapperWords}>
					<DropList />
				</div>
			</div>
		</div>
	);
};

export default MainPage;
