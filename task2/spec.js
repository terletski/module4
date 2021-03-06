const homePage = 'https://onefootball.com/en/home';
const championsLeaguePage = 'https://onefootball.com/en/competition/champions-league-5';
const matchesChampionsLeaguePage = 'https://onefootball.com/en/competition/champions-league-5/matches';
const tableChampionsLeaguePage = 'https://onefootball.com/en/competition/champions-league-5/table';
const kinogo = 'https://kinogo.by/';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;

describe('home page', () => {
  const switchLanguageMenu = element(by.css('span[class*="market"]'));
  const languageDe = element(by.css('img[alt="de"]'));
  const searchForm = element(by.css('input[class*="header-search"]'));
  const searchButton = element(by.css('button[class*="header-search"]'));

  switchLanguage = () => {
    switchLanguageMenu.click();
    languageDe.click();
  }

  searchByLeague = league => {
    searchForm.sendKeys(league);
    searchButton.click();
  }

  searchLatestNewshByTeam = team => {
    searchForm.sendKeys(team);
    searchButton.click();
  }

  beforeEach(() => {
    browser.get(homePage);
  });

  it('should switch to Deutschland', () => {
    const currentLanguage = element(by.css('span[class*="market"]'));
    switchLanguage();
    expect(currentLanguage.getText()).toEqual('Deutschland', 'Switch to Deutschland failed');
  });

  it('should search Premier League', () => {
    searchByLeague('Premier League');
    expect(browser.getTitle()).toContain('Onefootball', 'Search by premier league failed');
  });

  it('should check to search latest news', () => {
    const latestNews = element(by.css('a[class*="of"]'));
    searchLatestNewshByTeam('Liverpool');
    expect(latestNews.isDisplayed()).toBe(true, 'Searching latest news by Liverpool failed');
  });

  it('should check popular pages', () => {
    const popularPage = element(by.className('col-24 text-gray-dark'));
    expect(popularPage.getText()).toEqual('Popular Pages', 'Show popular pages failed');
  });
});

describe('champions league page', () => {

  beforeEach(() => {
    browser.get(championsLeaguePage);
  });

  it('should check current title', () => {
    expect(browser.getTitle()).toContain('Champions League - Onefootball', 'Incorrect title');
  });
});

describe('Matches champions league page', () => {

  beforeEach(() => {
    browser.get(matchesChampionsLeaguePage);
  });

  it('should check current result of match', () => {
    const result = element(by.css('span.flex-grow-0'));
    expect(result.getText()).toEqual(':', 'Incorrect result of match');
  });

  it('should check the table with the match participants', () => {
    const until = protractor.ExpectedConditions;
    const table = element(by.className('h4 text-uppercase text-center'));
    browser.executeScript(`
    element = document.querySelector('.d-block.text-gray-darker');
    element.click();
    `);
    browser.wait(until.urlContains('period'), 5000);
    expect(table.getText()).toContain('table', 'Incorrect table');
  });
});

describe('Table champions league page', () => {

  beforeEach(() => {
    browser.get(tableChampionsLeaguePage);
  });

  it('should check the current table', () => {
    const result = element(by.className('h2 p-0 mb-lg'));
    expect(result.getText()).toEqual('Table', 'Incorrect table');
  });

  it('should check counts of tables', () => {
    const count = element.all(by.css('li[class*="d-block pt"]'));
    expect(count.count()).toBe(8, 'Incorrect counts of tables');
  });
});
// non - angular https://kinogo.by/
describe('Kinogo page', () => {

  beforeEach(() => {
    browser.waitForAngularEnabled(false);
    browser.get(kinogo);
  });

  it('should check log in', () => {
    element(by.linkText('Вход')).click();
    element(by.id('login_name')).sendKeys('eugene89');
    element(by.id('login_password')).sendKeys('eugene89');
    element(by.css('button[title="Войти"]')).click();
    const login = element(by.id('logbtn'));
    expect(login.getText()).toEqual('eugene89', 'Log in failed');
  });

  it('should check getting title by searching movies', () => {
    element(by.id('story')).sendKeys('Во все тяжкие (1-5 сезон)');
    element(by.css('button.fbutton2')).click();
    const title = element.all(by.css('h2.zagolovki'));
    expect(title.getText()).toContain('Во все тяжкие (1-5 сезон)', 'Incorrect searching by title');
  });
});