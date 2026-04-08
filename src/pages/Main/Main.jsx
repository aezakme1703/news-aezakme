import { useDebounce } from '../../helpers/hooks/useDebounce'
import NewsBanner from '../../components/NewsBanner/NewsBanner'
import { getCategories, getNews } from '../../api/apiNews'
import NewsList from '../../components/NewsLIst/NewsList'
import Pagination from '../../components/Pagination/Pagination'
import Search from '../../components/Search/Search'
import Categories from '../../components/Categories/Categories'

import styles from './styles.module.css'
import { TOTAL_PAGES, PAGE_SIZE } from '../../constants/constants'
import { useFetch } from '../../helpers/hooks/useFetch'
import { useFilters } from '../../helpers/hooks/useFilters'

const Main = () => {
  const {filters, changeFilter} = useFilters({
        page_number: 1,
        page_size: PAGE_SIZE,
        category: null,
        keywords: ''
  })

  const debouncedKeywords = useDebounce(filters.keywords, 1500)
  const {data, isLoading} = useFetch(getNews, {
        ...filters,
        keywords: debouncedKeywords
  })
  const {data: dataCategories} = useFetch(getCategories)

  const handleNextPage = () => {
    if (filters.page_number < TOTAL_PAGES) {
      changeFilter('page_number', filters.page_number + 1)
    }
  }
  const handleBackPage = () => {
    if (filters.page_number > 1) {
      changeFilter('page_number', filters.page_number - 1)
    }
  }
  const handlePageClick = (pageNumber) => {
      changeFilter('page_number', pageNumber)

  }
  return (
    <main className={styles.main}>
      {dataCategories ? 
        <Categories categories={dataCategories.categories} currentCategory={filters.category} setCurrentCategory={(category) => {
          changeFilter('category', category)
        }}/>
      : null}
      <Search keywords={filters.keywords} setKeywords={(keywords) => {
          changeFilter('keywords', keywords)
        }}/>
      <NewsBanner isLoading={isLoading} item={data && data.news && data.news[0]}/>
      <Pagination currentPage={filters.page_number} handleNextPage={handleNextPage} handleBackPage={handleBackPage} handlePageClick={handlePageClick} totalPages={TOTAL_PAGES}/>
      <NewsList isLoading={isLoading} news={data?.news} />
      <Pagination currentPage={filters.page_number} handleNextPage={handleNextPage} handleBackPage={handleBackPage} handlePageClick={handlePageClick} totalPages={TOTAL_PAGES}/>
    </main>
  )
}

export default Main