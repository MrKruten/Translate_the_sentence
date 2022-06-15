import { Sentence } from 'entities/Sentence';
import { DropList } from 'widgets/DropList';

import { styles } from './styles';

const phrases = {
	ru: 'Я люблю хоккей, но у меня нет любимой команды',
	en: 'I like hockey, but I dont`t have a favorite team',
};

const MainPage = () => {
	const sentence = phrases;

	return (
		<div className={styles.page}>
			<div className={styles.container}>
				<h1 className={styles.head}>Translate this sentence</h1>
				<Sentence sentence={sentence.ru} />
				<div className={styles.marginWrapperWords}>
					<DropList sentence={sentence.en} />
				</div>
			</div>
		</div>
	);
};

export default MainPage;
