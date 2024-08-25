import Image from 'next/image';
import { css } from '@/styled-system/css';

import lostConnectionImg from '@/public/images/lost_connection.webp';

const imgStyles = css({
  height: '35dvh',
  marginInline: 'auto',
  width: 'auto'
});

const headingStyles = css({
  marginBlockEnd: 'token(spacing.4, 1rem)'
});

const pStyles = css({
  fontSize: 'xl',
  marginBlockStart: 'token(spacing.6, 1.5rem)'
});

function Offline() {
  return (
    <section>
      <Image
        className={imgStyles}
        alt="A bit crazy taur that messed up with Internet cables"
        src={lostConnectionImg}
      />
      <h1 className={headingStyles}>Ooops, you are offline</h1>
      <p>
        Didn&apos;t you accidentally turn on airplane mode? Or maybe you can
        switch from mobile network to WiFi?
      </p>
      <p className={pStyles}>We are waiting for your return online!</p>
    </section>
  );
}

export default Offline;
