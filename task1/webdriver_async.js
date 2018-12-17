const webdriver = require("selenium-webdriver");

function createDriver() {
    const driver = new webdriver.Builder()
        .usingServer('http://localhost:4444/wd/hub')
        .withCapabilities(webdriver.Capabilities.chrome())
        .build();
    driver.manage().timeouts().implicitlyWait(5000);
    driver.manage().window().maximize();
    return driver;
}

const browser = createDriver();

function handleFailure(err) {
    console.error('Something went wrong\n', err.stack, '\n');
    closeBrowser();
}

async function signIn(login, password) {
    await browser.findElement(webdriver.By.linkText('Вход')).click()
    await browser.findElement(webdriver.By.id('login_name')).sendKeys(login);
    await browser.findElement(webdriver.By.id('login_password')).sendKeys(password);
    return await browser.findElement(webdriver.By.css('button[title="Войти"]')).click();
}

async function sortByDatePremieres() {
    await browser.findElement(webdriver.By.linkText('дате')).click()
    return await browser.findElement(webdriver.By.css('h2.zagolovki')).getText().then((title) => {
        console.log('The most recent film: ' + title);
    });
}

async function addToBookmarks() {
    return await browser.findElement(webdriver.By.css('h2.zagolovki')).getText().then((title) => {
        console.log('Added to bookmarks: ' + title);
    });
}

async function searchByTitle(text) {
    await browser.findElement(webdriver.By.id('story')).sendKeys(text)
    await browser.findElement(webdriver.By.css('button.fbutton2')).click();
    return await browser.findElement(webdriver.By.css('h2.zagolovki')).getText().then((result) => {
        console.log(result);
    });
}

function closeBrowser() {
    browser.quit();
}

browser.get('https://kinogo.by/').then(async () => {
    await signIn('eugene89', 'eugene89');
    await browser.findElement(webdriver.By.css('a[href="/film/premiere/"]')).click();
    await sortByDatePremieres();
    await browser.findElement(webdriver.By.css('span.izbrannoe')).click();
    await addToBookmarks();
    await searchByTitle('Луна');
    closeBrowser();
}).catch((err) => {
    handleFailure(err);
});