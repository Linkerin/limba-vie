import { capitalizeWord } from '@/app/_lib/utils';
import ListItemLink from '../../ListItemLink/ListItemLink';
import type { Tables } from '@/app/_lib/supabase.types';

function SetItemLink({ set }: { set: Tables<'sets'>['set'] }) {
  const capitalizedSet = capitalizeWord(set);

  return (
    <ListItemLink
      aria-label={`To ${capitalizedSet} words set`}
      href={`/set/${encodeURIComponent(set)}`}
      target="_self"
    >
      {capitalizedSet}
    </ListItemLink>
  );
}

export default SetItemLink;
