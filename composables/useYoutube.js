import { useFetch } from '@vueuse/core'

const config = useRuntimeConfig()
const KEY = config.GOOGLE_KEY

const useYouTube = async () => {
	const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=25&playlistId=PLnoMLl1eIRc6mMrN3Tq5BbVREowKsiP2e&key=${KEY}`

	const { isFetching, error, data } = await useFetch(url)

	return { isFetching, error, data }
}

export default { isFetching, error, data }
