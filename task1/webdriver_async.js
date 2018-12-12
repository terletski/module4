const webdriver = require("selenium-webdriver");

function createDriver() {
    const driver = new webdriver.Builder()
        .usingServer('http://localhost:4444/wd/hub')
        .withCapabilities(webdriver.Capabilities.chrome())
        .build();
    driver.manage().timeouts().setScriptTimeout(10000);
    return driver;
}

const browser = createDriver();


function handleFailure(err) {
    console.error('Something went wrong\n', err.stack, '\n');
    closeBrowser();
}

function findResult() {
    browser.findElements(webdriver.By.css('#serverSideDataTable_info')).then(function (result) {
            console.log('Result: ' + result[1])
    });
}

function closeBrowser() {
    browser.quit();
}

browser.get('https://www.copart.com/');
browser.findElement(webdriver.By.css("a[data-uname='homePageFindAVehicle']")).click();
// browser.findElement(webdriver.By.css("a[data-uname='vehicleFinderTab']")).click();
browser.findElement(webdriver.By.id("input-search")).sendKeys('Ferrari');
browser.findElement(webdriver.By.className("btn btn-lightblue marginleft15")).click();

browser.wait(findResult, 3000)
    // .then(clickLink)
    // .then(getRequest)
    // .then(logQuestionTitle)
    .then(closeBrowser, handleFailure);



