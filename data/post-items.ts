import { IPost } from "@/types";

export const postData: IPost[] = [
    {
        _id: "60d0fe4f5311236168a109ca", // ID tĩnh 1
        title: "Breaking News: Market Hits Record Highs",
        content: `
        Aenean sodales lacus est, at ultricies augue eleifend sit amet. Be yourself everyone else is already taken. 
        Vivamus aliquet sit amet nisi non faucibus. Orci varius natoque penatibus et magnis dis parturient montes.
        
        ## Start your Morning with Smiles
        Integer egestas ipsum eget metus sodales consectetur. Nullam ultricies posuere cursus. Duis vitae lorem porta, 
        venenatis nibh ac, laoreet massa.
  
        ### Ordered and unordered list
        - At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
          1. Itaque earum rerum hic tenetur a sapiente delectus
          2. which of us ever undertakes laborious physical exercise
        - Et harum quidem rerum facilis est et expedita distinctio
  
        Mauris malesuada ligula in interdum pharetra. Vivamus purus orci, molestie vel erat sed, consectetur posuere ligula.
      `,        
        url: "/news/market-hits-record-highs",
        authors: [
            {
                avatar: "/assets/images/home-page/default-user.png",
                name: "Ayat AlBqoor",
                date: new Date(2022, 0, 1),
            },
        ],
        thumbnail: {
            public_id: "home-page/category-1", 
            url: "/assets/images/home-page/category-1.jpg",
        },
    },
    {
        _id: "60d0fe4f5311236168a109cb", // ID tĩnh 2
        title: "Tech Giants Release Latest Gadgets",
        content: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
        
        ## Explore New Horizons
        Cras justo velit, ultrices vel vehicula eu, viverra in turpis. Donec lobortis at lorem ac semper. 
        Mauris malesuada ligula in interdum pharetra.
  
        - Sed condimentum neque ligula, id dapibus enim ornare id.
        - Duis porttitor, risus vehicula convallis sagittis, ligula nisi iaculis libero.
  
        Mauris eget lectus et nisi commodo tristique. Aenean eget ornare dui.
      `,
        url: "/news/tech-giants-release-gadgets",
        authors: [
            {
                avatar: "/assets/images/home-page/default-user.png",
                name: "Jane Smith",
                date: new Date(2022, 1, 15),
            },
        ],
        thumbnail: {
            public_id: "home-page/category-2",
            url: "/assets/images/home-page/category-2.jpg",
        },
    },
    {
        _id: "60d0fe4f5311236168a109cc", // ID tĩnh 3
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
        thumbnail: {
            public_id: "home-page/category-3",
            url: "/assets/images/home-page/category-3.jpg",
        },
    },
    {
        _id: "60d0fe4f5311236168a109cd", // ID tĩnh 4
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
        thumbnail: {
            public_id: "home-page/category-6",
            url: "/assets/images/home-page/category-6.jpg",
        },
    },
    {
        _id: "60d0fe4f5311236168a109ce", // ID tĩnh 5
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
        thumbnail: {
            public_id: "home-page/category-7",
            url: "/assets/images/home-page/category-7.jpg",
        },
    },
];
