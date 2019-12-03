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

  await page.waitForSelector('#ui-id-7')
  await page.click('#ui-id-7')

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
  */

  await page.waitForSelector('#profileItem_18667_tr .filter-item');

  const levels = _.uniqBy(await page.evaluate(() => {
    const inputs = [...document.querySelectorAll('#profileItem_18667_tr .filter-item')]
    return inputs.map(input => ({ id: input.children[0].getAttribute('id'), label: input.textContent.trim().split(' - ')[1] }))
  }), 'id')

  const topics = _.uniqBy(await page.evaluate(() => {
    const inputs = [...document.querySelectorAll('#profileItem_19577_tr .filter-item')]
    return inputs.map(input => ({ id: input.children[0].getAttribute('id'), label: input.textContent.trim() }))
  }), 'id')

  //console.log(days)
  //console.log(hotels)
  console.log(levels)
  console.log(topics)

  /*
  for (day of days) {*/
    for (level of levels) {
      for (topic of topics) {
        //const dayId = day.id.replace('day_', '');
        //const hotelId = hotel.id.replace('profileItem_728_', '')
        const levelId = level.id.replace('profileItem_18667_', '')
        const topicId = topic.id.replace('profileItem_19577_', '')

        await page.goto(`https://google.fr`)
        //await page.goto(`https://www.portal.reinvent.awsevents.com/connect/search.ww#loadSearch-searchPhrase=&searchType=session&tc=0&sortBy=daytime&dayID=${dayId}&p=&i(10041)=${levelId}&i(728)=${hotelId}`)
        //console.log(`https://www.portal.reinvent.awsevents.com/connect/search.ww#loadSearch-searchPhrase=&searchType=session&tc=0&sortBy=daytime&dayID=${dayId}&p=&i(10041)=${levelId}&i(728)=${hotelId}`)
        
        await page.goto(`https://www.portal.reinvent.awsevents.com/connect/search.ww#loadSearch-searchPhrase=&searchType=session&tc=0&sortBy=daytime&p=&i(18667)=${levelId}&i(19577)=${topicId}`)
        console.log(`https://www.portal.reinvent.awsevents.com/connect/search.ww#loadSearch-searchPhrase=&searchType=session&tc=0&sortBy=daytime&p=&i(18667)=${levelId}&i(19577)=${topicId}`)

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

        await sleep(10)

        //if (options.length > 0) {
          const html = await page.evaluate(() => {
            return document.querySelector('#searchResult').innerHTML
          })


          //fs.writeFileSync(`sessions/all.html`, html)
          //console.log(`sessions/all.html` /*, options.length*/);

          fs.writeFileSync(`sessions/${level.label}_${topicId}.html`, html)
          console.log(`sessions/${level.label}_${topicId}.html`, options.length);
        //}
        
      }
    }
  /*}*/


  await browser.close()
})()