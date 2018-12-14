// spec.js
const url = 'https://onefootball.com/en/home'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;

describe('swich language', function() {
  const switchLanguageMenu = element(by.css('span[class="market-selector-title d-none d-lg-block cursor-pointer h5 m-none"]'));
  const languageDe = element(by.css('img[src="/assets/img/market-selector/de.png?rev=ae293a42"]'));
  const currentLanguage = element(by.css('span[class="market-selector-title d-none d-lg-block cursor-pointer h5 m-none"]'));

  function switchLanguage() {
    switchLanguageMenu.click();
    languageDe.click();
  }
  
  beforeEach(function() {
    browser.get(url);
  });
  
  it('should switch to Deutschland', function() {
    switchLanguage();
    expect(currentLanguage.getText()).toEqual('Deutschland');
  });     
});

describe('swich language', function() {
  const searchForm = element(by.className('header-search-input flex-grow-1 flex-shrink-0 text-sm ng-untouched ng-pristine ng-valid'));
  const searchButton = element(by.className('header-search-button p-0 m-0 d-flex flex-row align-items-center flex-grow-0 flex-shrink-0 border-0 noselect'));

  function searchByLeague(league) {
    searchForm.sendKeys(league);
    searchButton.click();  
  }

  beforeEach(function() {
    browser.get(url);
  });

  it('should search Premier League', function() {
    searchByLeague('Premier League');
    expect(browser.getTitle()).toContain('Onefootball');
  }); 
}); 