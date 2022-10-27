import * as styles from './styles.css';
import { Font } from '~/models';
import { observer } from 'mobx-react-lite';

type FontCardProps = {
  font: Font;
};

export const FontCard = observer<FontCardProps>(({ font }) => {
  return (
    <div className={styles.container}>
      <h2>{font.name}</h2>
      <h2>Panagram Panagram</h2>
      {/* Tags */}
    </div>
  );
});
