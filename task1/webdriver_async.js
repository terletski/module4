var webdriver = require("selenium-webdriver");

function createDriver() {
    var driver = new webdriver.Builder()
        .usingServer('http://localhost:4444/wd/hub')
        .withCapabilities(webdriver.Capabilities.chrome())
        .build();
    driver.manage().timeouts().setScriptTimeout(10000);
    return driver;
}

var browser = createDriver();

function logTitle() {
    browser.getTitle().then(function (title) {
        console.log('Current Page Title: ' + title);
    });
}


function logQuestionTitle() {
    browser.findElement(webdriver.By.css("#question-header h1")).then(function (el) {
        el.getText().then(function (text) {
            console.log('Current Question Title: ' + text)
        });
    });
}

function clickLink(link) {
    link.click();
}

function handleFailure(err) {
    console.error('Something went wrong\n', err.stack, '\n');
    closeBrowser();
}

function findMostRelevant() {
    return browser.findElements(webdriver.By.css('.result-link a')).then(function (result) {
        return result[0];
    });
}

function closeBrowser() {
    browser.quit();
}

browser.get('https://stackoverflow.com/');
browser.findElement(webdriver.By.name('q')).sendKeys('webdriverjs');
browser.findElement(webdriver.By.xpath("//button[@type='submit']")).click();

browser.wait(findMostRelevant, 2000)
    .then(clickLink)
    .then(logTitle)
    .then(logQuestionTitle)
    .then(closeBrowser, handleFailure);



