import { GetStaticPaths, GetStaticProps } from 'next';
import { newsItemsData } from '@/data/news-items';
import { useRouter } from 'next/router';
import NextImage from 'next/image';
import { FaCalendarAlt } from "react-icons/fa";

interface IAuthor {
    avatar: string;
    name: string;
    date: Date;
}

interface INewsItem {
    title: string;
    content: string;
    url: string;
    authors: IAuthor[];
    thumbnail: { url: string };
}

interface Props {
    news: INewsItem;
}

const NewsArticle: React.FC<Props> = ({ news }) => {
    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container my-8">
            <h1 className="text-3xl font-bold mb-4">{news.title}</h1>
            <div className="relative w-full h-96 mb-4">
                <NextImage src={news.thumbnail.url} alt={news.title} layout="fill" objectFit="cover" />
            </div>
            <div className="mt-4">
                <p>{news.content}</p>
            </div>
            <div className="mt-4">
                {news.authors.map((author, index) => (
                    <div key={index} className="flex items-center gap-1">
                        <img src={author.avatar} alt={author.name} className="w-6 h-6 rounded-full" />
                        <span>{author.name}</span>
                        <span className="ml-2 flex items-center gap-1">
                            <FaCalendarAlt className="-mt-[2px]" size={16} /> {author.date.toLocaleDateString()}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = newsItemsData.map((news) => ({
        params: { slug: news.url.split('/').pop() },
    }));

    return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const news = newsItemsData.find((item) => item.url.endsWith(params?.slug as string));

    return {
        props: {
            news: news || null,
        },
    };
};

export default NewsArticle;
