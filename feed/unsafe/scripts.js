const feeds = {
    smbc: "https://www.smbc-comics.com/comic/rss",
    xkcd: "https://xkcd.com/rss.xml",
    buttersafe: "http://feeds.feedburner.com/buttersafe",
    pbf: "https://pbfcomics.com/comics/rss",
    jsph: "https://www.jspowerhour.com/comics.rss"
};

async function fetchRSSFeed(url, feedId) {
    const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
    const data = await response.json();
    const parser = new DOMParser();
    const xml = parser.parseFromString(data.contents, "text/xml");
    const items = xml.querySelectorAll("item");
    
    let html = '';
    items.forEach((el, index) => {
        if (index >= 3) return;  // Limit to 3 comics per feed
        const title = el.querySelector("title").textContent;
        const link = el.querySelector("link").textContent;
        const description = el.querySelector("description").textContent;
        
        html += `
            <div class="feed-item">
                <h3><a href="${link}" target="_blank">${title}</a></h3>
                <p>${description}</p>
            </div>
        `;
    });

    document.getElementById(`${feedId}-feed`).innerHTML = html;
}

async function loadFeeds() {
    for (const [feedId, url] of Object.entries(feeds)) {
        await fetchRSSFeed(url, feedId);
    }
}

function jumpToFeed() {
    const select = document.getElementById("feed-select");
    const feedId = select.value;
    document.getElementById(feedId).scrollIntoView({ behavior: "smooth" });
}

loadFeeds();
