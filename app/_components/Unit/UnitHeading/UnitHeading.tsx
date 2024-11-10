import Image from 'next/image';
import { css } from '@/styled-system/css';

import { capitalizeWord, getImageUrl } from '@/app/_lib/utils/utils';
import type { Tables } from '@/app/_services/supabase/supabase.types';

const containerStyles = css({
  display: 'flex',
  flexWrap: 'nowrap',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: 'token(spacing.4, 1rem)',
  marginBlockEnd: 'token(spacing.4, 1rem)',
  width: '100%',

  '& > img': {
    height: 'min(18dvw, 128px)',
    width: 'auto'
  }
});

const headingStyles = css({
  color: 'main',
  margin: '0rem'
});

interface UnitHeadingProps {
  image: Tables<'units_view'>['image'];
  name: Tables<'units_view'>['name'];
}

function UnitHeading({ image, name }: UnitHeadingProps) {
  return (
    <div className={containerStyles}>
      {name && <h2 className={headingStyles}>{capitalizeWord(name)}</h2>}
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
