const cheerio = require('cheerio');
const fs = require('fs');
const _ = require('lodash');
const moment = require('moment');

let sessions = [];

fs.readdirSync("sessions").forEach(fileName => {
    //const [day, hotel, level] = fileName.split("_").map(n => n.replace(".html", "")); //?
    const [day, hotel, level] = ["unknown","unknown","unknown"]

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
        const times = $('.availableSessions', elem).text().replace(rooms, '').replace('Session enrollment has not yet begun.', '')//?
        const start = moment('-08:00 ' +times, 'Z ddd MMM DD, h:m a').toDate() //?
        
        sessions.push({id, abbr, title, abstract, type, day, hotel, level, rooms: rooms.replace(' – ', ''), times, start})
    })
})

sessions = _.sortBy(_.uniqBy(sessions, 'id'), ['day', 'hotel', 'start']);

fs.writeFileSync('src/sessions.json', JSON.stringify(sessions, null, 4))