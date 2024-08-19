import { css } from '@/styled-system/css';

import coatOfArmsMd from '@/public/icons/moldova_coat_of_arms.svg';

const containerStyles = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '0.25rem',
  boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
  height: '1.875rem',
  overflow: 'hidden',
  width: 'fit-content'
});

const stripeStyles = css.raw({
  height: '100%',
  width: '1.25rem'
});

const yellowStripeStyles = css.raw({
  backgroundColor: 'hsl(49, 100%, 50%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& > svg': {
    height: '0.875rem',
    width: 'auto'
  }
});

function FlagMd() {
  return (
    <div className={containerStyles}>
      <div
        className={css(stripeStyles, {
          backgroundColor: 'hsl(216, 100%, 34%)'
        })}
      />
      <div className={css(stripeStyles, yellowStripeStyles)}>
        <svg aria-hidden={true} role="presentation">
          <use href={`${coatOfArmsMd.src}#md-coat`} />
        </svg>
      </div>
      <div
        className={css(stripeStyles, { backgroundColor: 'hsl(348, 92%, 42%)' })}
      />
    </div>
  );
}

export default FlagMd;
