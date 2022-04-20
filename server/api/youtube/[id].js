import { useRuntimeConfig } from '#nitro'

const config = useRuntimeConfig().public

export default defineEventHandler(async (event) => {
	const KEY = config.googleKey

	const id = event.context.params.id

	if (!id) {
		const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=25&playlistId=PLnoMLl1eIRc6mMrN3Tq5BbVREowKsiP2e&key=${KEY}`

		const response = await $fetch(url)
		const videos = youtubeNormalize(response)
		return videos
	}

	const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=25&playlistId=${id}&key=${KEY}`

	const response = await $fetch(url)
	const videos = youtubeNormalize(response)
	return videos
})
const youtubeNormalize = (data) => {
	let videos = []
	data.items.map((item) => {
		videos.push({
			id: item.id,
			resourceId: item.snippet.resourceId.videoId,
			image: item.snippet.thumbnails.high.url,
			title: item.snippet.title.split('|')[0],
			description: item.snippet.description,
			pastor: item.snippet.title.split('|')[2],
			date: new Date(item.contentDetails.videoPublishedAt).toLocaleDateString(
				'en-gb',
				{ year: 'numeric', month: 'long', day: 'numeric' }
			)
		})
	})
	return videos
}
