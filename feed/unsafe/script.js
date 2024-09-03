// scripts.js
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

    document.getElementById("feed").innerHTML = html;
}

fetchRSSFeed("https://example.com/rss-feed.xml");
