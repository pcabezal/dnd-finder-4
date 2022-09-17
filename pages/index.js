import ArticleList from '../components/ArticleList'
import {server} from '../config'
import Meta from '../components/Meta'


export default function Home({articles}) {
  return (
    <div>
      <Meta />
      yoyoyo
      <ArticleList articles={articles} />

    </div>
  )
}

export const getStaticProps = async () => {
  const res = await fetch(`${server}/api/articles`)
  const articles = await res.json()

  return {
    props: {
      articles
    }
  }
}