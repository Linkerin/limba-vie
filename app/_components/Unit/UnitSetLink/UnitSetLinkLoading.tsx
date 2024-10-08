import Skeleton from '../../_ui/Skeleton/Skeleton';

import { css } from '@/styled-system/css';

const size = '5.5rem';
const styles = css.raw({
  height: size,
  width: size
});

function UnitSetLinkLoading() {
  return <Skeleton css={styles} />;
}

export default UnitSetLinkLoading;
