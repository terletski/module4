const webdriver = require("selenium-webdriver");
const until = webdriver.until;
const homePage = 'https://kinogo.by/';


function createDriver() {
    const driver = new webdriver.Builder()
        .usingServer('http://localhost:4444/wd/hub')
        .withCapabilities(webdriver.Capabilities.chrome())
        .build();
    driver.manage().timeouts().implicitlyWait(10000);
    driver.manage().window().maximize();
    return driver;
}

const browser = createDriver();

function handleFailure(err) {
    console.error('Something went wrong\n', err.stack, '\n');
    closeBrowser();
}

async function signIn(login, password) {
    browser.get(homePage);
    await browser.findElement(webdriver.By.linkText('Вход')).click();
    await browser.findElement(webdriver.By.id('login_name')).sendKeys(login);
    await browser.findElement(webdriver.By.id('login_password')).sendKeys(password);
    await browser.findElement(webdriver.By.css('button[title="Войти"]')).click();
    return await browser.findElement(webdriver.By.id('logbtn')).getText();
}

async function sortByDatePremieres() {
    await browser.findElement(webdriver.By.css('a[href="/film/premiere/"]')).click();
    await browser.findElement(webdriver.By.linkText('дате')).click();
    return await browser.wait(until.elementLocated(webdriver.By.css('h2.zagolovki'))).getText();
}

async function addToBookmarks() {
    await browser.wait(until.elementLocated(webdriver.By.css('span.izbrannoe')),10000).click();
    return await browser.findElement(webdriver.By.css('h2.zagolovki')).isDisplayed();
}

async function searchByTitle(text) {
    await browser.findElement(webdriver.By.id('story')).sendKeys(text);
    await browser.findElement(webdriver.By.css('button.fbutton2')).click();
    return await browser.findElement(webdriver.By.css('h2.zagolovki')).getText();
}

async function searchByTitle(text) {
    await browser.findElement(webdriver.By.id('story')).sendKeys(text);
    await browser.findElement(webdriver.By.css('button.fbutton2')).click();
    return await browser.findElement(webdriver.By.css('h2.zagolovki')).getText();
}

function closeBrowser() {
    browser.quit();
}

module.exports = {
    handleFailure,
    signIn,
    sortByDatePremieres,
    addToBookmarks,
    searchByTitle,
    closeBrowser
}