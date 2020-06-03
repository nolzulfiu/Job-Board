const fetchnode = require('node-fetch');
const moment = require('moment');

const redis = require("redis");
const client = redis.createClient();

const { promisify } = require("util");
const setAsync = promisify(client.set).bind(client);

//how many days before to get data for
const before = moment().subtract(1, 'week').format('YYYY-MM-DDThh:mm:ss');

const baseURL = `https://jobsearch.api.jobtechdev.se/search?published-after=${before}&q=developer&limit=100&sort=pubdate-desc`;

async function FetchSwe() {

    const allJobs= [];

    const head = {
        method: 'GET', 
        accept: 'application/json',
        headers: {'api-key' : 'Yidyd1x4MDNBXHhhZVx4ODk4XHhhOVx4YzBcblx4YjBceDg3XHhiOVx4OTNceDA2REgxXHgwY1x4YWIn'}
    };


    //fetch all pages
    const res = await fetchnode(baseURL, head);
    const jobs = await res.json();
    console.log({jobs});
    if(jobs.message == 'Internal Server Error' || jobs.total.value == 0) {
        
    } else {
        allJobs.push(...jobs.hits);

        console.log('got ', allJobs.length, 'jobs');
            
        //set in jobs
        const success = await setAsync('swe', JSON.stringify(allJobs));
    
        console.log({success});
    }

}

module.exports = FetchSwe;

FetchSwe();