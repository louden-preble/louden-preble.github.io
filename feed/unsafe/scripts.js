// scripts.js
const feedUrls = [
    "https://www.smbc-comics.com/comic/rss",
    "https://xkcd.com/rss.xml",
    "http://feeds.feedburner.com/buttersafe",
    "https://pbfcomics.com/comics/rss",
    "https://www.jspowerhour.com/comics.rss"
];

async function fetchRSSFeed(url) {
    const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
    const data = await response.json();
    const parser = new DOMParser();
    const xml = parser.parseFromString(data.contents, "text/xml");
    const items = xml.querySelectorAll("item");
    
    let html = '';
    items.forEach(el => {
        const title = el.querySelector("title").textContent;
        const link = el.querySelector("link").textContent;
        const description = el.querySelector("description").textContent;
        
        html += `
            <div class="feed-item">
                <h2><a href="${link}" target="_blank">${title}</a></h2>
                <p>${description}</p>
            </div>
        `;
    });

    document.getElementById("feed").innerHTML += html;
}

async function loadFeeds() {
    for (const url of feedUrls) {
        await fetchRSSFeed(url);
    }
}

loadFeeds();
