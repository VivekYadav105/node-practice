const puppeteer = require('puppeteer')
const fs = require('fs')

async function fetchCountries(){
    const browser = await puppeteer.launch({
        xecutablePath: `C:\Program Files\Google\Chrome\Application\chrome.exe`,
    });
    const page = await browser.newPage();
    await page.goto("https://www.imdb.com/calendar/?ref_=nv_mv_cal")
    await page.screenshot({path:"example.png",fullPage:true});
    await page.pdf({path:"calander.pdf",format:"A4"});
    const html = page.content();
    const pageTitle = await page.evaluate(()=>document.title);
    const countryList = await page.evaluate(()=>{
        return Array.from(document.querySelectorAll("#country-selector option")).map((i)=>{
            return {code:i.value,name:i.innerText}
        })
    })
    console.log(countryList);
    await browser.close();
}

async function fetchMovies(code,type="MOVIE"){
    //type = MOVIE ,TV ,TV_EPISODE
    const browser =await puppeteer.launch({xecutablePath:"C:\Program Files\Google\Chrome\Application\chrome.exe"});
    const page = await browser.newPage();
    await page.goto(`https://www.imdb.com/calendar/?ref_=rlm&region=${code}&type=MOVIE`);
    const pageTitle = await page.evaluate(()=>document.querySelector("hgroup h3.ipc-title__text").innerText)
    const movieList = await page.evaluate(()=>Array.from(document.querySelectorAll(".sc-f56042d2-1.kgXUZB"),(i)=>(
        {
            date:i.querySelector("h3.ipc-title__text").innerText,
            movies:Array.from(i.querySelectorAll("li.ipc-metadata-list-summary-item"),(ele)=>({
                name:ele.querySelector("a.ipc-metadata-list-summary-item__t").innerText,
                href:ele.querySelector("a.ipc-metadata-list-summary-item__t").href,
                genre:Array.from(i.querySelectorAll("ul.ipc-metadata-list-summary-item__tl li.ipc-inline-list__item"),(g)=>g.innerText)
                // img:ele.querySelector("img").src
        }))
        }
        )))

    // console.log(pageTitle)
    movieList.forEach((i)=>{
        console.log(i.movies)
    })
    await browser.close()

}

fetchCountries();
fetchMovies(code="IN",type="MOVIE");