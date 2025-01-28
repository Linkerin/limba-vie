import { css } from '@/styled-system/css';

import coatOfArmsMd from '@/public/icons/moldova_coat_of_arms.svg';

const containerStyles = css({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '0.125rem',
  boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
  height: '1em',
  marginInlineStart: '0.375em',
  overflow: 'hidden',
  verticalAlign: '-10.5%',
  width: 'fit-content'
});

const stripeStyles = css.raw({
  height: '100%',
  width: '0.6667em'
});

const yellowStripeStyles = css.raw({
  backgroundColor: 'hsl(49, 100%, 50%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& > svg': {
    height: '0.466em',
    width: 'auto'
  }
});

function FlagMd() {
  return (
    <span className={containerStyles} role="presentation">
      <span
        className={css(stripeStyles, {
          backgroundColor: 'hsl(216, 100%, 34%)'
        })}
      />
      <span className={css(stripeStyles, yellowStripeStyles)}>
        <svg aria-hidden={true} role="presentation">
          <use href={`${coatOfArmsMd.src}#md-coat`} />
        </svg>
      </span>
      <span
        className={css(stripeStyles, { backgroundColor: 'hsl(348, 92%, 42%)' })}
      />
    </span>
  );
}

export default FlagMd;
