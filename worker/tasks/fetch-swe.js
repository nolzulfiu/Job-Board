const fetch = require('node-fetch');
const moment = require('moment');

const redis = require("redis");
const client = redis.createClient();

const { promisify } = require("util");
const setAsync = promisify(client.set).bind(client);

const yesterday = moment().subtract(1, 'day').format('YYYY-MM-DDThh-mm-ss');

const baseURL = `https://jobsearch.api.jobtechdev.se/search?published-after=${yesterday}&q=Developer%2C%20Sk%C3%A5ne&sort=pubdate-desc&limit=100`;

async function fetchSwe() {

    const allJobs= [];

    const head = {
        method: 'GET', 
        accept: 'application/json',
        headers: {'api-key' : 'Yidyd1x4MDNBXHhhZVx4ODk4XHhhOVx4YzBcblx4YjBceDg3XHhiOVx4OTNceDA2REgxXHgwY1x4YWIn'}
    };


    //fetch all pages
    const res = await fetch(baseURL, head);
    const jobs = await res.json();
    allJobs.push(...jobs.hits);
    
    resultCount = allJobs.length;
    console.log('got ', resultCount, 'jobs');


    //set in jobs
    const success = await setAsync('swe', JSON.stringify(allJobs));

    console.log({success});
}

module.exports = fetchSwe;

fetchSwe();