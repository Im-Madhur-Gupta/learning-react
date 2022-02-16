import { useRouter } from "next/router";

// "/news/something"

const NewsItem = () => {
    const router = useRouter();
    const newsId = router.query.newsid;
    console.log(newsId);
    return <h1>News Item</h1>
}

export default NewsItem;