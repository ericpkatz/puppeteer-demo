const { expect } = require('chai');
const puppeteer = require('puppeteer');

const app = require('../../server/app'); 

const port = process.env.PORT || 3001;

let server;
before(()=> server = app.listen(port, ()=> console.log(`listening on port ${port}`)));

after(()=> server.close());

let browser, page

beforeEach(async()=> {
  browser = await puppeteer.launch();
  page = await browser.newPage();
});
afterEach(async()=> await browser.close());

describe('e2e', ()=> {
  describe('home page', ()=> {
    it('has an input and a form', async()=> {
      await page.goto(`http://localhost:${port}`);
      await page.waitForSelector('h1');
      const title = await page.$eval('h1', el => el.innerHTML);
      expect(title).to.equal('Hello World');
      await page.waitForSelector('input[name="secret"]');
      await page.type('input[name="secret"]', 'foo bar bazz quq');
      await page.click('button');

      await page.waitForNavigation();

      await page.waitForSelector('#secret');
      const secret = await page.$eval('#secret', el=>el.innerHTML);
      expect(secret).to.equal('FOO BAR BAZZ QUQ');
    });
  });
});
