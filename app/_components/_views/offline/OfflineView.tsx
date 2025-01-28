/* eslint-disable @next/next/no-img-element */

import OfflineRefreshButton from './OfflineRefreshButton/OfflineRefreshButton';

import {
  containerStyles,
  headingStyles,
  imgStyles,
  pStyles
} from './OfflineView.styles';

function OfflineView() {
  return (
    <section className={containerStyles}>
      <img
        className={imgStyles}
        alt="A bit crazy taur that messed up with Internet cables"
        src="/images/lost_connection.webp"
      />
      <h1 className={headingStyles}>Ooops, you are offline</h1>
      <p>
        Didn&apos;t you accidentally turn on airplane mode? Or maybe you can
        switch from mobile network to WiFi?
      </p>
      <p className={pStyles}>We are waiting for your return online!</p>
      <OfflineRefreshButton />
    </section>
  );
}

export default OfflineView;
