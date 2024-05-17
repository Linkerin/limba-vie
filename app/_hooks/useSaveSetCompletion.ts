import ssrLocalStorage from '../_services/SsrLocalStorage';

function useSaveSetCompletion(setId: number | null | undefined) {
  if (!setId) return false;

  const key = 'lvCompletedSets';
  const completedSets = ssrLocalStorage.getItem(key);

  if (!completedSets) {
    ssrLocalStorage.setItem(key, JSON.stringify([setId]));
  } else {
    const completedSetsArr = JSON.parse(completedSets);
    completedSetsArr.push(setId);
    const uniqueSetIds = Array.from(new Set(completedSetsArr));
    ssrLocalStorage.setItem(key, JSON.stringify(uniqueSetIds));
  }

  return true;
}

export default useSaveSetCompletion;
