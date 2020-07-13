async function scrape(keyword) {
  try {
    console.log(keyword);
    const puppeteer = require("puppeteer");
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto("https://www.google.com");
    await page.type(
      "#tsf > div:nth-child(2) > div.A8SBwf > div.RNNXgb > div > div.a4bIc > input",
      keyword
    );
    page.keyboard.press(String.fromCharCode(13));

    await page.waitForNavigation();
    console.log("Server Started:Webscraping");
    page.once("load", () => console.log("Page loaded!"));

    const data = await page.evaluate(() => {
      let restaurantDescription = "";
      if (document.getElementsByClassName("Yy0acb") !== null) {
        restaurantDescription = document.getElementsByClassName("Yy0acb")[0]
          .innerText;
      }

      let restaurantSelect = {};
      document
        .getElementsByClassName("REGfue")[0]
        .childNodes.forEach((item) => {
          const text = item.childNodes[1].textContent;

          if (item.childNodes[0].className === "FEyy9b bttvrb NMm5M") {
            restaurantSelect[text] = false;
          } else {
            restaurantSelect[text] = true;
          }
        });

      return [restaurantDescription, restaurantSelect];
    });
    return data;
  } catch (err) {
    return ["", {}];
  }
}

exports.scrape = scrape;
