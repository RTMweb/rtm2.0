import { defineStore } from 'pinia'

export const useSeriesStore = defineStore({
	state: () => {
		return {
			currentMessage: 'hello'
		}
	}
})
