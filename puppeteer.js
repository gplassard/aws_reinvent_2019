const puppeteer = require('puppeteer');
const _ = require('lodash');
const fs = require('fs');

const sleep = seconds =>
  new Promise(resolve => setTimeout(resolve, (seconds || 1) * 1000));

(async () => {
  const browser = await puppeteer.launch({ headless: false })
  console.log("browser launched")
  const page = await browser.newPage()

  function elementExist(selector) {
    return page.waitForSelector(selector, { visible: true, timeout: 1000 }).then(s => true, e => false);
  }

  await page.setViewport({ width: 800, height: 600 })

  await page.goto('https://www.portal.reinvent.awsevents.com/connect/publicDashboard.ww')

  console.log("site opened")

  await page.waitForSelector('.square > #loginForm > #fieldsetLoginForm > .formRow:nth-child(3) > label')
  await page.click('.square > #loginForm > #fieldsetLoginForm > .formRow:nth-child(3) > label')

  await page.waitForSelector('.square > #loginForm > #fieldsetLoginForm > .formRow > .formContent > #loginPassword')
  await page.click('.square > #loginForm > #fieldsetLoginForm > .formRow > .formContent > #loginPassword')

  await page.waitForSelector('.square > #loginForm > #fieldsetLoginForm > .formRow > .formContent > #loginUsername')
  await page.click('.square > #loginForm > #fieldsetLoginForm > .formRow > .formContent > #loginUsername')

  await page.waitForSelector('.amazon2015 > #templateMain > #templateContent > #centerCol > .rows')
  await page.click('.amazon2015 > #templateMain > #templateContent > #centerCol > .rows')

  await page.type('#loginUsername', process.env.username)
  await page.type('#loginPassword', process.env.password)

  await page.waitForSelector('.square > #loginForm > #fieldsetLoginForm > .formRow > .formContent > #loginButton')
  await page.click('.square > #loginForm > #fieldsetLoginForm > .formRow > .formContent > #loginButton')

  console.log("logged in")

  await page.waitForSelector('nav > #mainNav > #ui-id-5 > .ui-menu-item > #ui-id-6')
  await page.click('nav > #mainNav > #ui-id-5 > .ui-menu-item > #ui-id-6')

  /*
  console.log("before days")
  await page.waitForSelector('#schedulableDays_tr > div.formContent.filter-list-scroll > div')
  console.log("after days")

  const days = _.uniqBy(await page.evaluate(() => {
    const inputs = [...document.querySelectorAll('#schedulableDays_tr .filter-item')]
    return inputs.map(input => ({ id: input.children[0].getAttribute('id'), label: input.textContent.trim() })).filter(d => d.label != 'Sunday')
  }), 'id')

  const hotels = _.uniqBy(await page.evaluate(() => {
    const inputs = [...document.querySelectorAll('#profileItem_728_tr .filter-item')]
    return inputs.map(input => ({ id: input.children[0].getAttribute('id'), label: input.textContent.trim() }))
  }), 'id')

  const levels = _.uniqBy(await page.evaluate(() => {
    const inputs = [...document.querySelectorAll('#profileItem_10041_tr .filter-item')]
    return inputs.map(input => ({ id: input.children[0].getAttribute('id'), label: input.textContent.trim().replace(/\d+\s-\s/, '') }))
  }), 'id')

  console.log(days)
  console.log(hotels)
  console.log(levels)
  */

  /*
  for (day of days) {
    for (hotel of hotels) {
      for (level of levels) {
        const dayId = day.id.replace('day_', '');
        const hotelId = hotel.id.replace('profileItem_728_', '')
        const levelId = level.id.replace('profileItem_10041_', '')

        await page.goto(`https://google.fr`)
        await page.goto(`https://www.portal.reinvent.awsevents.com/connect/search.ww#loadSearch-searchPhrase=&searchType=session&tc=0&sortBy=daytime&dayID=${dayId}&p=&i(10041)=${levelId}&i(728)=${hotelId}`)
        console.log(`https://www.portal.reinvent.awsevents.com/connect/search.ww#loadSearch-searchPhrase=&searchType=session&tc=0&sortBy=daytime&dayID=${dayId}&p=&i(10041)=${levelId}&i(728)=${hotelId}`)
        */
        while (await elementExist('#getMoreResults')) {
          await page.click('#getMoreResults')
          await sleep(1);
        }

        
        console.log('no more results')
        
        const showMores = await page.$$('.moreLink')
        for (showMore of showMores) {
          await showMore.click();
        }

        console.log('no more show mores')

        const options = await page.$$('.expandSessionImg')
        for (option of options) {
          await option.click();
        }

        await sleep(5)

        //if (options.length > 0) {
          const html = await page.evaluate(() => {
            return document.querySelector('#searchResult').innerHTML
          })


          fs.writeFileSync(`sessions/all.html`, html)
          console.log(`sessions/all.html` /*, options.length*/);

          //fs.writeFileSync(`sessions/${day.label}_${hotel.label}_${level.label}.html`, html)
          //console.log(`sessions/${day.label}_${hotel.label}_${level.label}.html`, options.length);
        //}
        /*
      }
    }
  }*/


  await browser.close()
})()