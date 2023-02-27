// const { chromium } = require('playwright')
const { load } = require('cheerio')
// const axios = require('axios')
// const { Actor, ApifyClient } = require('apify')
// const { CheerioCrawler } = require('crawlee')
// const { HttpsProxyAgent } = require('hpagent')
const https = require('https');
const http = require('http');
// const { ApifyClient } = require('apify-client');
const { CrawlingAPI, ScraperAPI, LeadsAPI, ScreenshotsAPI, ProxyCrawlAPI } = require('proxycrawl');
const token = '6Cue4sFzl9KBjJqoUYOkKg'
const parse = require('./lib/parse.js')
const { Readability } = require('@mozilla/readability')
var { JSDOM } = require('jsdom');
const fs = require("fs");

const express = require("express");
const axios = require('axios');
const app = express();

app.listen(3000, () => {
  console.log("Application started and Listening on port 3000");
});

const url = 'https://medium.com/@yam-yam-architect/solution-architecture-foundations-fb4af948bb02?source=explore---------1-98--------------------cb2e81b3_4350_4125_a8fe_ead27a97ca25-------15'
const url2 = `http://www.paulgraham.com/guidetoinvestors.html`
const url3 = `https://medium.com/developer-purpose/how-senior-engineers-review-code-3573c3647f3f?source=explore---------0-98--------------------0ce0ca29_2512_4ebd_9e14_00aa81a76619-------15`
const url4 = `https://medium.com/tech-career/l8-explains-career-of-software-engineers-5969a8ae0351`
const opts = Object.assign(
  // defaults
  {
    userAgent: 'MetadataScraper',
    maxRedirects: 10,
    timeout: 10000,
    ensureSecureImageRequest: true,
    sourceMap: {},
    decode: undefined,
    encode: undefined
  }
)

 const play = async () => {



  const newToken = 'hEOHjfQZploqwmGa7rBQ8A'
  const api = new CrawlingAPI({ token: newToken });






  const crawlbaseToken = '6Cue4sFzl9KBjJqoUYOkKg';
  const auth = `Basic ${Buffer.from(crawlbaseToken).toString('base64')}`;

  const crawlConfig = {
    pageWait: 5000,
    ajaxWait: true
  }

  return api.get(url2, crawlConfig).then(response => {
    return response.body

  }).catch(error => console.error);
}

const parseHtml = async (html) => {

  // const data = await parse(url2, html, opts)
  // console.log(data)
  const doc = new JSDOM(html)
  // const $ = load(html, { xmlMode: true }); // xmlMode: true is a workaround for many cheerio bugs.
  const filename = 'jiopogi.js'
  // fs.writeFileSync(filename, html);

  // $('script:not([src])').map(x => {
  //   console.log({
  //     data: $('script:not([src])')[x].children[x].data
  //   })
  // })

  let reader = new Readability(doc.window.document);
  let article = reader.parse();
  // console.log("data", data)
  // console.log("reader", article)
  // console.log("html", html)
  // console.log("article.content done", article.content)
  console.log("article", article)
  return article.content
}

