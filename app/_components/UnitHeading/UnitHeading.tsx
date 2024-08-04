import Image from 'next/image';

import { capitalizeWord, getImageUrl } from '@/app/_lib/utils';
import { Tables } from '@/app/_lib/supabase.types';

import styles from './UnitHeading.module.css';

interface UnitHeadingProps {
  image: Tables<'units_view'>['image'];
  name: Tables<'units_view'>['name'];
}

function UnitHeading({ image, name }: UnitHeadingProps) {
  return (
    <div className={styles.heading}>
      {name && <h2>{capitalizeWord(name)}</h2>}
      <Image
        alt={`Decorative image of a ${image}`}
        src={getImageUrl(image, 256, {
          folder: 'limba_units',
          format: 'svg',
          q: 'auto',
          sanitize: true
        })}
        width={90}
        height={90}
        fetchPriority="high"
        role="presentation"
        unoptimized
      />
    </div>
  );
}

export default UnitHeading;
