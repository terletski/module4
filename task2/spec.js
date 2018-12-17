// spec.js
const homePage = 'https://onefootball.com/en/home';
const championsLeaguePage = 'https://onefootball.com/en/competition/champions-league-5';
const matchesChampionsLeaguePage = 'https://onefootball.com/en/competition/champions-league-5/matches';
const tableChampionsLeaguePage = 'https://onefootball.com/en/competition/champions-league-5/table';
const kinogo = 'https://kinogo.by/';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;

describe('home page', () => {
  const switchLanguageMenu = element(by.css('span[class="market-selector-title d-none d-lg-block cursor-pointer h5 m-none"]'));
  const languageDe = element(by.css('img[src="/assets/img/market-selector/de.png?rev=ae293a42"]'));
  const searchForm = element(by.className('header-search-input flex-grow-1 flex-shrink-0 text-sm ng-untouched ng-pristine ng-valid'));
  const searchButton = element(by.className('header-search-button p-0 m-0 d-flex flex-row align-items-center flex-grow-0 flex-shrink-0 border-0 noselect'));

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
    const currentLanguage = element(by.css('span[class="market-selector-title d-none d-lg-block cursor-pointer h5 m-none"]'));
    switchLanguage();
    expect(currentLanguage.getText()).toEqual('Deutschland');
  });

  it('should search Premier League', () => {
    searchByLeague('Premier League');
    expect(browser.getTitle()).toContain('Onefootball');
  });

  it('should search latest news', () => {
    const latestNews = element(by.className('of-card-article rounded overflow-hidden bg-gray-lightest text-gray-dark'));
    searchLatestNewshByTeam('Liverpool');
    expect(latestNews.isDisplayed()).toBe(true);
  });

  it('should search latest news', () => {
    const popularPage = element(by.className('col-24 text-gray-dark'));
    expect(popularPage.getText()).toEqual('Popular Pages');
  });
});

describe('champions league page', () => {

  beforeEach(() => {
    browser.get(championsLeaguePage);
  });

  it('should get current title', () => {
    expect(browser.getTitle()).toContain('Champions League - Onefootball');
  });

  it('should get current result of match', () => {
    const result = element(by.css('span.flex-grow-0'));
    browser.get(matchesChampionsLeaguePage);
    expect(result.getText()).toEqual(':');
  });
});

describe('Matches champions league page', () => {

  beforeEach(() => {
    browser.get(matchesChampionsLeaguePage);
  });

  it('should get current result of match', () => {
    const result = element(by.css('span.flex-grow-0'));
    expect(result.getText()).toEqual(':');
  });

  it('should get a table with the match participants', () => {
    const lastMatch = element(by.className('d-block text-gray-darker bg-white rounded p-xs'));
    lastMatch.click();
    browser.wait(() => {
      browser.waitForAngularEnabled(false);
      return browser.isElementPresent(by.className('h4 text-uppercase text-center text-lg-left mb-xlg mt-none'));
    }, 5000);
    const table = element(by.className('h4 text-uppercase text-center text-lg-left mb-xlg mt-none'));
    expect(table.getText()).toContain('table');
  });
});

describe('Table champions league page', () => {

  beforeEach(() => {
    browser.get(tableChampionsLeaguePage);
  });

  it('should get current table', () => {
    const result = element(by.css('h2.h2.p-0.mb-lg'));
    expect(result.getText()).toEqual('Table');
  });

  it('should get counts of tables', () => {
    const count = element.all(by.css('li.d-block.pt-0.pb-0.mb-0.mt-0.flex-grow-1'));
    expect(count.count()).toBe(8);
  });
});
// non-angular https://kinogo.by/
describe('Table champions league page', () => {

  beforeEach(() => {
    browser.get(tableChampionsLeaguePage);
  });

  it('should get current table', () => {
    const result = element(by.css('h2.h2.p-0.mb-lg'));
    expect(result.getText()).toEqual('Table');
  });

  it('should get counts of tables', () => {
    const count = element.all(by.css('li.d-block.pt-0.pb-0.mb-0.mt-0.flex-grow-1'));
    expect(count.count()).toBe(8);
  });
});