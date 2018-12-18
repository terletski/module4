const webdriver = require('./webdriver_async');
const chai = require('chai');
chai.use(require('chai-as-promised'));
const expect = chai.expect;

describe('Test Kinogo.by', () => {

    it('should get text', async () => {
        await webdriver.signIn('eugene89', 'eugene89').then(currentLogin => {
            expect(currentLogin).to.equal('eugene89');
        })
        await webdriver.sortByDatePremieres().then(title => {
            expect(title).to.contain('20');
        })
        await webdriver.addToBookmarks().then(flag => {
            expect(flag).to.true;
        })
        await webdriver.searchByTitle('Луна').then(text => {
            expect(text).to.contain('Луна');
        })
        webdriver.closeBrowser();
    })
})