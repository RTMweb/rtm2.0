import { defineStore, acceptHMRUpdate } from 'pinia'
// import { useFetch } from '@vueuse/core'

// const config = useRuntimeConfig()
// const KEY = config.GOOGLE_KEY

// const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=25&playlistId=PLnoMLl1eIRc6mMrN3Tq5BbVREowKsiP2e&key=${KEY}`

// // const { isFetching, error, data } = await useFetch(url)
// try {
// 	const { data } = await useAsyncData('videos', () => $fetch(url))

// 	messages.value = data.value.items.map((item) => {
// 		return {
// 			id: item.id,
// 			resourceId: item.snippet.resourceId.videoId,
// 			image: item.snippet.thumbnails.high.url,
// 			title: item.snippet.title.split('|')[0]
// 		}
// 	})
// } catch (err) {
// 	console.log(err)
// }

// const handleClick = async (msg) => {
// 	current.value = msg
// 	currentSeries.value = msg.id
// 	const config = useRuntimeConfig()
// 	const KEY = config.GOOGLE_KEY

// 	const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=25&playlistId=${msg.id}&key=${KEY}`
// 	try {
// 		const { data } = await useFetch(url)

// 		messages.value = data.value.items.map((item) => {
// 			const months = [
// 				'January',
// 				'February',
// 				'March',
// 				'April',
// 				'May',
// 				'June',
// 				'July',
// 				'August',
// 				'September',
// 				'October',
// 				'November',
// 				'December'
// 			]

// 			const month = months[+item.snippet.title.split('|')[3].split('.')[0] - 1]
// 			const day = item.snippet.title.split('|')[3].split('.')[1]
// 			const year = item.snippet.title.split('|')[3].split('.')[2]

// 			return {
// 				id: item.id,
// 				resourceId: item.snippet.resourceId.videoId,
// 				image: item.snippet.thumbnails.high.url,
// 				title: item.snippet.title.split('|')[0],
// 				description: item.snippet.description,
// 				pastor: item.snippet.title.split('|')[2],
// 				date: month + ' ' + day + ', 20' + year
// 			}
// 		})
// 	} catch (err) {
// 		console.log(err)
// 	}
// }

export const useStore = defineStore('storeId', {
	// arrow function recommended for full type inference
	state: () => {
		return {
			// all these properties will have their type inferred automatically
			counter: 10,
			name: 'Eduardo',
			isAdmin: true
		}
	},
	actions: {
		hit() {
			this.counter++
		}
	},

	getters: {
		getCount: (state) => state.counter,
		getUser: (state) => {
			state.name
		}
	}
})
