interface IAuthor {
    avatar: string;
    name: string;
    date: Date;
}

export interface INewsItem {
    title: string;
    content: string;
    url: string;
    authors: IAuthor[];
    thumbnail: { url: string };
}

export const newsItemsData: INewsItem[] = [
    {
        title: "Breaking News: Market Hits Record Highs",
        content: "The stock market reached record highs today, with major indices closing at unprecedented levels...",
        url: "/news/market-hits-record-highs",
        authors: [
            {
                avatar: "/assets/images/home-page/default-user.png",
                name: "Ayat AlBqoor",
                date: new Date(2022, 0, 1),
            },
        ],
        thumbnail: { url: "/assets/images/home-page/category-1.jpg" },
    },
    {
        title: "Tech Giants Release Latest Gadgets",
        content: "Today, several major tech companies unveiled their latest gadgets and innovations at the annual tech expo...",
        url: "/news/tech-giants-release-gadgets",
        authors: [
            {
                avatar: "/assets/images/home-page/default-user.png",
                name: "Jane Smith",
                date: new Date(2022, 1, 15),
            },
        ],
        thumbnail: { url: "/assets/images/home-page/category-2.jpg" },
    },
    {
        title: "New Study Reveals Climate Change Impact",
        content: "A new study published in the journal Nature reveals significant impacts of climate change on global weather patterns...",
        url: "/news/climate-change-impact",
        authors: [
            {
                avatar: "/assets/images/home-page/default-user.png",
                name: "Michael Brown",
                date: new Date(2022, 2, 10),
            },
        ],
        thumbnail: { url: "/assets/images/home-page/category-3.jpg" },
    },
    {
        title: "Sports Update: Local Team Wins Championship",
        content: "In an exciting finale, the local team clinched the championship title with a last-minute goal...",
        url: "/news/local-team-wins-championship",
        authors: [
            {
                avatar: "/assets/images/home-page/default-user.png",
                name: "Emily Johnson",
                date: new Date(2022, 3, 5),
            },
        ],
        thumbnail: { url: "/assets/images/home-page/category-6.jpg" },
    },
    {
        title: "Health Alert: New Virus Outbreak Reported",
        content: "Health officials have reported a new outbreak of a virus in several regions, urging the public to take precautionary measures...",
        url: "/news/new-virus-outbreak",
        authors: [
            {
                avatar: "/assets/images/home-page/default-user.png",
                name: "David Wilson",
                date: new Date(2022, 4, 20),
            },
        ],
        thumbnail: { url: "/assets/images/home-page/category-7.jpg" },
    },
];
