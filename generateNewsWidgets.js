
newsWidgetData = [
    {
        title: "Announcement Title",
        date: "Nov 2022",
        content: "Congratulations to the JWST Transiting Exoplanet Community Early Release Science Program Team, including Luis and Mike, for their publication series on the transmission spectrum of the hot Jupiter WASP-39b!",
        links: ["TEST LINK 1", "TEST LINK 2"],
        images: ["TEST IMAGE 1", "TEST IMAGE 2"]
    },
    {
        title: "New Grad Welcome 2022",
        date: "Aug 2022",
        content: "A warm welcome to our new first year graduate students, Yoav Rotman (from University of Maryland) and Krishna Kanumalla (from University of Amsterdam)",
        links: [],
        images: []
    },
    {
        title: "Congratulations to Joe Zalesky",
        date: "Aug 2022",
        content: "Congratulations to Joe Zalesky for defending his PhD thesis, A Uniform Atmospheric Retrieval Analysis of Ultra-Cool Brown Dwarfs!",
        links: [],
        images: []
    },
    {
        title: "Congratulations to Peter Smith",
        date: "Jul 2022",
        content: "Congratulations to Peter Smith for being awarded a 2022 NASA FINESST with the project entitled Innovations in Characterizing Exoplanet Atmospheres with High Resolution Cross-Correlation Spectroscopy!",
        links: [],
        images: []
    }
];

function generateNewsWidgetCard(announcementTitle, announcementDate, announcementContent, announcementLinks, announcementImages) {
    var card = document.createElement("div");
    card.classList.add("card");
    card.style.marginBottom = "20px";

    var cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    var cardText = document.createElement("div");
    cardText.classList.add("card-text");

    var cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");

    var cardDate = document.createElement("h6");
    cardDate.classList.add("card-subtitle");
    cardDate.style.color = "#6c757d";
    cardDate.style.float = "right";
    cardDate.style.marginTop = "-32px";

    var cardContent = document.createElement("p");
    cardContent.classList.add("card-text");

    cardTitle.innerHTML = announcementTitle;
    cardDate.innerHTML = announcementDate;
    cardContent.innerHTML = announcementContent;

    card.appendChild(cardBody);
    cardBody.appendChild(cardText);
    cardText.appendChild(cardTitle);
    cardText.appendChild(cardDate);
    cardText.appendChild(document.createElement("hr"));
    cardText.appendChild(document.createElement("br"));
    cardText.appendChild(cardContent);

    if (announcementLinks != null) {
        announcementLinks.forEach(function (link) {
            var cardLink = document.createElement("a");
            cardLink.classList.add("card-link");
            cardLink.innerHTML = link;
            cardLink.style.color = "#007bff";
            cardLink.href = link;
            cardText.appendChild(cardLink);
        });
    }

    cardText.appendChild(document.createElement("br"));

    if (announcementImages != null) {
        announcementImages.forEach(function (image) {
            var cardImage = document.createElement("img");
            cardImage.classList.add("card-img-top");
            cardImage.src = image;
            cardImage.style.padding = "20px";
            cardImage.style.width = "40%";
            cardText.appendChild(cardImage);
        });
    }

    //ADD TO PAGE
    var newsWidget = document.getElementById("newsThread");
    newsWidget.appendChild(card);
}

newsWidgetData.forEach(function (announcement) {
    generateNewsWidgetCard(announcement.title, announcement.date, announcement.content, announcement.links, announcement.images);
});
