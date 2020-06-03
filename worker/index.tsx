var CronJob = require('cron').CronJob;

const fetchSwe = require('./tasks/fetch-swe.tsx');

var job = new CronJob('* * * * *', fetchSwe, null, true, 'America/Los_Angeles');
job.start();