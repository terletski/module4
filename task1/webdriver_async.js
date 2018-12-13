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

function signIn (login, password) {
    return browser.findElement(webdriver.By.linkText('Вход')).click().then(() => {    
    return browser.findElement(webdriver.By.id('login_name')).sendKeys(login);
    }).then(() => {
        return browser.findElement(webdriver.By.id('login_password')).sendKeys(password);
    }).then(() => {
        return browser.findElement(webdriver.By.css('button[title="Войти"]')).click();
    });
}

function sortByDatePremieres() {
    return browser.findElement(webdriver.By.linkText('дате')).click().then(() => {    
    return browser.findElement(webdriver.By.css('h2.zagolovki')).getText();
    }).then((title) => {
        console.log('The most recent film: ' + title);
    });
}

function addToBookmarks() { 
    return browser.findElement(webdriver.By.css('h2.zagolovki')).getText().then((title) => {
        console.log('Added to bookmarks: ' + title);
    });
}

function searchByTitle(text) {
    return browser.findElement(webdriver.By.id('story')).sendKeys(text).then(() => {    
    return browser.findElement(webdriver.By.css('button.fbutton2')).click();
    }).then(() => {
        return browser.findElement(webdriver.By.css('h2.zagolovki')).getText().then(function (result) {
            console.log(result);   
        });
    });
}

function closeBrowser() {
    browser.quit();
}

browser.get('https://kinogo.by/').then(() => {
    return signIn('eugene89', 'eugene89');
}).then(() => {
    return browser.findElement(webdriver.By.css('a[href="/film/premiere/"]')).click();
}).then(() => {
    return sortByDatePremieres();
}).then(() => {
    return browser.findElement(webdriver.By.css('span.izbrannoe')).click();
}).then(() => {
    return addToBookmarks();
}).then(() => {
    return searchByTitle('Луна');
}).then(() => {
    closeBrowser();
}).catch((err) => {
    handleFailure(err);
});
