import { useEffect, useState } from 'react'
import { useDebounce } from '../../helpers/hooks/useDebounce'
import NewsBanner from '../../components/NewsBanner/NewsBanner'
import { getCategories, getNews } from '../../api/apiNews'
import NewsList from '../../components/NewsLIst/NewsList'
import Skeleton from '../../components/Skeleton/Skeleton'
import Pagination from '../../components/Pagination/Pagination'
import Search from '../../components/Search/Search'
import Categories from '../../components/Categories/Categories'

import styles from './styles.module.css'

const Main = () => {
  const [ news, setNews ] = useState([])
  const [ isLoading, setIsLoading ] = useState(true)
  const [ currentPage, setCurrentPage ] = useState(1)
  const [ categories, setCategories ] = useState([])
  const [ keywords, setKeywords] = useState('')
  const [ currentCategory, setCurrentCategory ] = useState('All')
  const totalPages = 10
  const pageSize = 10
  const debouncedKeywords = useDebounce(keywords, 1500)

  // Функция получения новостей
  const fetchNews= async (currentPage) => {
    try {
      setIsLoading(true)
      const response = await getNews({
        page_number: currentPage,
        page_size: pageSize,
        category: currentCategory === 'All' ? null : currentCategory,
        keywords: debouncedKeywords
      })
      setNews(response.news)
      setIsLoading(false)
    }
    catch (error) {
      console.log(error)
    }
  }
  // Функция получения всех категорий
  const fetchCategories= async () => {
    try {
      const response = await getCategories()
      setCategories(['All', ...response.categories])
    }
    catch (error) {
      console.log(error)
    }
  }
  // Cохранение всех категорий
  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchNews(currentPage)
  }, [currentPage, currentCategory, debouncedKeywords])

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }
  const handleBackPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber)
  }
  return (
    <main className={styles.main}>
      <Categories categories={categories} currentCategory={currentCategory} setCurrentCategory={setCurrentCategory}/>
      <Search keywords={keywords} setKeywords={setKeywords}/>
      {news.length > 0 && !isLoading ? (<NewsBanner item={news[0]}/>) : (<Skeleton type='banner' count={1}/>)}
      <Pagination currentPage={currentPage} handleNextPage={handleNextPage} handleBackPage={handleBackPage} handlePageClick={handlePageClick} totalPages={totalPages}/>
      {news.length > 0 && !isLoading ? (<NewsList news={news}/>) : (<Skeleton type='item' count={10}/>)}
      <Pagination currentPage={currentPage} handleNextPage={handleNextPage} handleBackPage={handleBackPage} handlePageClick={handlePageClick} totalPages={totalPages}/>
    </main>
  )
}

export default Main