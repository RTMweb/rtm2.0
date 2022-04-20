import { Client } from '@notionhq/client'
import { useRuntimeConfig } from '#nitro'

const config = useRuntimeConfig()

// Initializing a client
const notion = new Client({
	auth: config.notionKey
})

export default defineEventHandler(async (event) => {
	try {
		const response = await notion.databases.query({
			database_id: event.context.params.db,
			filter: {
				property: 'Status',
				select: {
					equals: 'Live'
				}
			}
		})

		const item = {
			series: response.results[0].properties.series.rich_text[0].plain_text,
			message: response.results[0].properties.message.rich_text[0].plain_text,
			imageLink:
				response.results[0].properties.imageLink.rich_text[0].plain_text,
			video: response.results[0].properties.video.rich_text[0].plain_text,
			youtube: response.results[0].properties.youtube.rich_text[0].plain_text,
			alttext: response.results[0].properties.alttext.rich_text[0].plain_text
		}

		return item
	} catch (error) {
		return {
			statusCode: 500,
			body: error.message
		}
	}
})
