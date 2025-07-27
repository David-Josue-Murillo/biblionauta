import '../../global.css'
import { View } from 'react-native'
import { colors } from '../../src/constants/theme'
import { useSearch } from '../../src/hooks/useSearch'
import {
  CategorySelector,
  FilterOptions,
  SearchBar,
} from '../../src/components/Search/SearchComponents'
import { SearchResults } from '../../src/components/Search/SearchResults'

const filterOptions = ['Todos', 'Título', 'Autor', 'Género', 'Categoría']

export default function SearchScreen() {
  const {
    search,
    setSearch,
    selectedFilter,
    setSelectedFilter,
    selectedCategory,
    setSelectedCategory,
    loading,
    error,
    uniqueCategories,
    filteredBooks,
    handleSearch,
  } = useSearch()

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <SearchBar
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      <FilterOptions
        filterOptions={filterOptions}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        setSelectedCategory={setSelectedCategory}
      />
      <CategorySelector
        selectedFilter={selectedFilter}
        uniqueCategories={uniqueCategories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <SearchResults
        loading={loading}
        error={error}
        filteredBooks={filteredBooks}
      />
    </View>
  )
}
