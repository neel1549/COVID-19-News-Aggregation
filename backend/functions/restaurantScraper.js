async function scrape(keyword) {
  try {
    const puppeteer = require("puppeteer");
    const browser = await puppeteer.launch({ slowMo: 5 });
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
    await page.waitFor(2000);

    const data = await page.evaluate(() => {
      let restaurantDescription = document.querySelector(
        "#rhs > div > div.kp-blk.knowledge-panel.Wnoohf.OJXvsb > div > div.ifM9O > div > div.SALvLe.farUxc.mJ2Mod > div > div.mod.NFQFxe > c-wiz > div > div > div > span"
      ).innerText;
      let restaurantSelect = {};
      document.getElementsByClassName("REGfue").childNodes.forEach((item) => {
        const text = item.childNodes[1].textContent;

        if (item.childNodes[0].className === "FEyy9b bttvrb NMm5M") {
          restaurantSelect[text] = false;
        } else {
          restaurantSelect[text] = true;
        }
      });

      return {
        details: [restaurantDescription, restaurantSelect],
      };
    });

    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

exports.scrape = scrape;
