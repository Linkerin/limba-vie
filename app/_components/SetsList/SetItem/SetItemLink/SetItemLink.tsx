import { capitalizeWord } from '@/app/_lib/utils';
import ListItemLink from '../../../_ui/ListItemLink/ListItemLink';
import type { Tables } from '@/app/_lib/supabase.types';

function SetItemLink({ set }: { set: Tables<'sorted_sets'>['set'] }) {
  if (!set) return null;

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
