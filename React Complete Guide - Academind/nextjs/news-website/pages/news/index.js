import Link from "next/link";

// "/news"

const News = () => {
    return (<>
        <h1>News</h1>
        <ul>
            <li><Link href="news/1">Article 1</Link></li>
            <li><Link href="news/2">Article 2</Link></li>
        </ul>
    </>)
}

export default News;