
var apiKey = "apiKey", // Read: imintweb.com/2020/06/get-blogger-apikey.html
    blogId = "blogId",
    fields = "items(url,title)", // Read: developers.google.com/blogger/docs/3.0/performance#partial-response
    app = document.getElementById("app"),  // modify or delete
    nextPageToken,
    collection = [];

function getData() {
    var script = document.createElement('script'),
        jsonUrl = "https://www.googleapis.com/blogger/v3/blogs/" + blogId + "/posts" + "?key=" + apiKey + "&maxResults=500&fields=nextPageToken," + fields + "&callback=manageData";
    if (nextPageToken) {
        jsonUrl += "&pageToken=" + nextPageToken;
        nextPageToken = undefined;
    }
    script.type = 'text/javascript';
    script.src = jsonUrl;
    document.getElementsByTagName('head')[0].appendChild(script);
}

function manageData(json) {
    json.items.forEach(function(element, index) {

        // Code with an example. You can delete from here
        var a = document.createElement('a');
        a.href = element.url;
        a.textContent = element.title
        app.appendChild(a);
        // Up to this point

        collection.push(element);
    });
    nextPageToken = json.nextPageToken;
    if (nextPageToken) {
        getData();
    }
}
getData();