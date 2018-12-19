const webdriver = require('./webdriver_async');
const chai = require('chai');
chai.use(require('chai-as-promised'));
const expect = chai.expect;

describe('Test KinoGo.by', () => {

    beforeEach(() => {
        webdriver.openPage();
    })

    it('should check log in', async () => {
        await webdriver.signIn('eugene89', 'eugene89').then(currentLogin => {
            expect(currentLogin).to.equal('eugene89', 'Authorization failed');
        })
    })
    it('should check sort by date premieres', async () => {
        await webdriver.sortByDatePremieres().then(title => {
            expect(title).to.contain('20', 'Sort by date premieres failed');
        })
    })
    it('should check adding movie to bookmarks', async () => {
        await webdriver.addToBookmarks().then(flag => {
            expect(flag, 'The movie did not add to bookmarks').to.be.true;
        })
    })
    it('should check search by title movies', async () => {
        await webdriver.searchByTitle('Луна').then(text => {
            expect(text).to.contain('Луна', 'Search by title failed');
        })
    })
    it('should check profile editing', async () => {
        await webdriver.editProfile('eugene89').then(info => {
            expect(info).to.equal('eugene89', 'Profile editing failed');
        }).then(() => {
            webdriver.closeBrowser();
        }).catch((err) => {
            webdriver.handleFailure(err);
        });
    })
})