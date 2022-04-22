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
			database_id: 'fb2e040f13644553a71011b80bcb0625',
			filter: {
				property: 'Status',
				select: {
					equals: 'Live'
				}
			},
			sorts: [
				{
					property: 'order',
					direction: 'ascending'
				}
			]
		})

		const tiles = normalize(response)

		return tiles
	} catch (error) {
		return {
			statusCode: 500,
			body: error.message
		}
	}
})

const normalize = (data) => {
	let tiles = []
	data.results.map((item) => {
		tiles.push({
			id: item.id,
			title: item.properties.title.rich_text[0]
				? item.properties.title.rich_text[0].plain_text
				: null,
			subTitle: item.properties.subTitle.rich_text[0]
				? item.properties.subTitle.rich_text[0].plain_text
				: null,
			smallTitle: item.properties.smallTitle.rich_text[0]
				? item.properties.smallTitle.rich_text[0].plain_text
				: null,
			bgImg: item.properties.bgImg.rich_text[0]
				? item.properties.bgImg.rich_text[0].plain_text
				: null,
			link: item.properties.link.rich_text[0]
				? item.properties.link.rich_text[0].plain_text
				: null,
			view: item.properties.view.rich_text[0]
				? item.properties.view.rich_text[0].plain_text
				: false
		})
	})
	return tiles
}
