import { DiaryEntry, NewDiaryEntry, NonSensisitiveDiaryEntry } from '../types'
import diaryData from './diaries.json'

const diaries: DiaryEntry[] = diaryData as DiaryEntry[] // Obliga  a que este archivo ocupe la interfaz definida y es mejor evitar la aserciond e datos;

export const getEntries = (): DiaryEntry[] => diaries

export const findById = (id: number): NonSensisitiveDiaryEntry | undefined => {
  const entry = diaries.find((d) => d.id === id)
  if (entry) {
    const { comment, ...restOfDiary } = entry
    return restOfDiary
  }
  return entry
}

export const getEntriesWithoutSensitiveInfo =
  (): NonSensisitiveDiaryEntry[] => {
    return diaries.map(({ id, date, weather, visibility }) => {
      return {
        id,
        date,
        weather,
        visibility,
      }
    })
  }

export const addDiary = (newDiaryEntry: NewDiaryEntry): DiaryEntry => {
  const newDiary = {
    id: Math.max(...diaries.map((d) => d.id)) + 1,
    ...newDiaryEntry,
  }

  diaries.push(newDiary)
  return newDiary
}
