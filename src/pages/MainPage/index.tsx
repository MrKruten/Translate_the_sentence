import { Sentence } from 'entities/Sentence';
import { styles } from './styles';

const phrase = 'She is eating an apple and and they are eating bread';

const MainPage = () => {
	const sentence = phrase.split(' ');
	return (
		<div className={styles.page}>
			<div className={styles.container}>
				<h1 className={styles.head}>Translate this sentence</h1>
				<Sentence sentence={sentence} />
			</div>
		</div>
	);
};

export default MainPage;
