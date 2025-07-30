import { Pressable } from 'react-native'
import { COLORS } from '../../constants/colors'
import { ReadingStats as ReadingStatsData } from '../../mocks/bookshelfData'
import { ReadingStatsHeader } from '../bookshelf/ReadingStatsHeader'
import { ReadingGoalProgress } from '../bookshelf/ReadingGoalProgress'
import { ReadingStatsMain } from '../bookshelf/ReadingStatsMain'
import { ReadingStatsMonth } from '../bookshelf/ReadingStatsMonth'
import { formatNumber } from '../../utils/bookshelf/readingStatsHelpers'

interface ReadingStatsProps {
  stats: ReadingStatsData
  onPress?: () => void
}

export function ReadingStats({ stats, onPress }: ReadingStatsProps) {
  return (
    <Pressable
      className="mx-4 mb-6 rounded-2xl p-6"
      style={{
        backgroundColor: COLORS.background.secondary,
        borderWidth: 1,
        borderColor: COLORS.border.primary,
      }}
      onPress={onPress}
      accessible
      accessibilityLabel="Estadísticas de lectura"
      accessibilityHint="Toca para ver estadísticas detalladas"
    >
      <ReadingStatsHeader onPress={onPress} />
      <ReadingGoalProgress goalProgress={stats.goalProgress} readingGoal={stats.readingGoal} />
      <ReadingStatsMain
        totalBooks={stats.totalBooks}
        totalPages={stats.totalPages}
        readingStreak={stats.readingStreak}
        formatNumber={formatNumber}
      />
      <ReadingStatsMonth
        booksThisMonth={stats.booksThisMonth}
        pagesThisMonth={stats.pagesThisMonth}
        averageRating={stats.averageRating}
        formatNumber={formatNumber}
      />
    </Pressable>
  )
}
