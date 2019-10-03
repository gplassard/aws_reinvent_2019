const cheerio = require('cheerio');
const fs = require('fs');
const _ = require('lodash');
const moment = require('moment-timezone');

let sessions = [];
const tracksMap = {
'ADM': 'Advertising and Marketing',
'ENT': 'Enterprise',
'OIG': 'Oil & Gas',
'AIM': 'Artificial Intelligence & Machine Learning',
'EUC': 'End User Computing & Business Apps',
'OPN': 'Open Source',
'ALX': 'Alexa',
'FSI': 'Financial Services',
'PNU': 'Power & Utilities',
'ANT': 'Analytics',
'GAM': 'Games/Game Tech',
'RET': 'Retail',
'API': 'Application Integration',
'GPS': 'Global Partner Summit',
'ROB': 'Robotics',
'ARC': 'Architecture',
'HLC': 'Healthcare',
'SEC': 'Security, Compliance, and Identity',
'ARV': 'AR/VR',
'IOT': 'IoT',
'STG': 'Storage',
'AUT': 'Automotive',
'LFS': 'Life Sciences',
'STP': 'Startup',
'BLC': 'Blockchain',
'MDS': 'Media Solutions',
'SVS': 'Serverless',
'CMP': 'Compute',
'MFG': 'Manufacturing',
'TLC': 'Telecommunications',
'CMY': 'AWS Community',
'MGT': 'Management Tools & Governance',
'TRH': 'Travel & Hospitality',
'CON': 'Containers',
'MKT': 'Marketplace',
'WIN': 'Windows & .Net',
'DAT': 'Databases',
'MOB': 'Mobile ',
'WPS': 'Public Sector',
'DOP': 'DevOps',
'NET': 'Networking & Content Delivery',
'WPT': 'We Power Tech'
};

fs.readdirSync("sessions").forEach(fileName => {
    const [level] = fileName.split("_").map(n => n.replace(".html", "")); //?
    const [hotel, day] = ["unknown","unknown"]

    const file = fs.readFileSync('sessions/' + fileName, {encoding: 'utf-8'});
    const $ = cheerio.load(file)
        
    $('.sessionRow').each((index, elem) => {
        const id = $(elem).attr('id') //?
        const abbr = $('.abbreviation', elem).text().replace(" - ", "") //?
        const title = $('.title', elem).text() //?
        const abstract = $('.abstract', elem).text().replace("View Less", "") //?
        const type = $('.type', elem).text() //?
        const speaker = $('.speakers', elem).text() //?
        const rooms = $('.sessionRoom', elem).text() //?
        const track = tracksMap[abbr.substring(0,3)];
        const times = $('.availableSessions', elem).text().replace(rooms, '').replace('Session enrollment has not yet begun.', '')//?
        
        const parseableStart = '-08:00 ' + times.replace(/-.*/, '') //?
        const start = moment(parseableStart, 'Z ddd MMM DD, h:m a').tz('America/Los_Angeles') //?
        const parseableEnd = '-08:00 ' + times.replace(/, \d+:\d+ ([AP]M) -/, '') //?
        const end = moment( parseableEnd, 'Z ddd MMM DD h:m a').tz('America/Los_Angeles') //?
        //const dayFromDate = start.locale('en').format('ddd');

        sessions.push({id, abbr, title, abstract, type, track, day, hotel, level, rooms: rooms.replace(' – ', ''), times, start, end})
    })
})

sessions = _.sortBy(_.uniqBy(sessions, 'id'), ['day', 'hotel', 'start']);

fs.writeFileSync('src/sessions.json', JSON.stringify(sessions, null, 4))