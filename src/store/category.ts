import { acceptHMRUpdate, defineStore } from 'pinia'

export const useCategoryId = defineStore('genre', () => {
  /**
   * Current Genre of the user.
   */
  const savedGenre = ref('')
  const previousGenres = ref(new Set<string>())

  const usedGenres = computed(() => Array.from(previousGenres.value))
  const otherGenres = computed(() => usedGenres.value.filter(Genre => Genre !== savedGenre.value))

  /**
   * Changes the current Genre of the user and saves the one that was used
   * before.
   *
   * @param Genre - new Genre to set
   */
  function setNewGenre(Genre: string) {
    if (savedGenre.value)
      previousGenres.value.add(savedGenre.value)

    savedGenre.value = Genre
  }

  return {
    setNewGenre,
    otherGenres,
    savedGenre,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useCategoryId, import.meta.hot))
