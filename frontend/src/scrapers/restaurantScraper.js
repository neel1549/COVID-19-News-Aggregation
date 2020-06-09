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

    await page.waitForSelector(".i0vbXd");
    page.click(".i0vbXd");

    await page.waitForNavigation();
    page.once("load", () => console.log("Page loaded!"));
    await page.waitFor(2000);

    const data = await page.evaluate(() => {
      let restaurantNames = document.getElementsByClassName("dbg0pd");
      restaurantNames = Array.from(restaurantNames).map((item) => {
        return item.innerText;
      });

      let restaurantImages = document.getElementsByClassName("b9tNq");
      restaurantImages = Array.from(restaurantImages).map((item) => {
        if (typeof item.firstChild !== "undefined") {
          return item.firstChild.src;
        }
      });

      let restaurantDetails = document.getElementsByClassName(
        "rllt__details lqhpac"
      );
      restaurantDetails = Array.from(restaurantDetails).map((item) => {
        let interDetails = [];
        for (var i = 1; i < item.children.length; i++) {
          if (i == 4 || (i == 3 && item.children.length == 4)) {
            let openDict = {};
            for (
              var j = 0;
              j < item.children[i].children[0].children.length;
              j++
            ) {
              if (j % 2 == 0) {
                for (var k = 0; k < 2; k++) {
                  if (
                    item.children[i].children[0].children[j].children[0]
                      .children[0].children[0].src ==
                    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAOVBMVEUAAAD/AADYMCTbLiT/MwDZLyXZMCXZMCTYLyTYLiTZLyXYLiPYLyXYMCXZLyTZLyTZMCTZMCTZLyTtMV/0AAAAE3RSTlMABKtUBbT//LJOrkj5+/j+r7aoVQEegwAAAKFJREFUeAHtlDUSxDAQBIUjM/3/rwepqk2b2hP3MrgH6pUP0YFi8MynrBKBL8oJDRpJpXWV2iKpQ4N+kDS2FT9KGnp3bsE8WzDPFn9g7C/wiFTmpxbUhAOLA54aP/QHPIxWmgYc44GFhIvCijPzByHYwJ4StGmasGgeBLTVMDjDahiWz7DepgOynyg/gbJvseCoIr+Z40e2pnuvcvPu1fP0BdTsCq8gHj6QAAAAAElFTkSuQmCC"
                  ) {
                    openDict[
                      item.children[i].children[0].children[
                        j
                      ].children[1].innerText
                    ] = false;
                  } else {
                    openDict[
                      item.children[i].children[0].children[
                        j
                      ].children[1].innerText
                    ] = true;
                  }
                }
              }
            }
            interDetails.push(openDict);
          } else {
            interDetails.push(item.children[i].innerText);
          }
        }
        return interDetails;
      });

      return {
        names: restaurantNames,
        images: restaurantImages,
        details: restaurantDetails,
      };
    });

    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
}
exports.scrape = scrape;
//scrape("restaurants near Campbell")
