SELECT DISTINCT ON (invhist_itemsite_id) invhist_itemsite_id, recalculateinvhist(invhist_id)
FROM invhist
WHERE (invhist_transdate<invhist_created)
ORDER BY invhist_itemsite_id, invhist_transdate;

