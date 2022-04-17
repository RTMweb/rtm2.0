import config from '#config'

export default async (req, res) => {
	const KEY = config.GOOGLE_KEY

	const { pathname } = new URL(req.url, `http://${req.headers.host}`)
	const id = pathname.split('/')[1]

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
}

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
