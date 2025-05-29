TODO:
Add cron job which will precanculated in redis initial without selecting filters with values
Add cron job which for every category pregenerate produdcts ids in redis with default sorting
Caching getByCategoryId and  getByCategoryIdFilters endpoint, for reduce canculation of repeated query