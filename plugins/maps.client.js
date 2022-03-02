import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
	let mapLoaded = false
	let mapWaiting = null

	const KEY = nuxtApp.$config.GOOGLE_KEY
	addScript()
	return {
		provide: {
			maps: (ref, long, lat) => {
				showMap(ref, long, lat)
			}
		}
	}

	function addScript() {
		const script = document.createElement('script')
		script.src = `https://maps.googleapis.com/maps/api/js?key=${KEY}&libraries=places&callback=initGoogleMaps`
		script.async = true
		window.initGoogleMaps = initGoogleMaps
		document.head.appendChild(script)
	}

	function initGoogleMaps() {
		mapLoaded = true
		if (mapWaiting) {
			const { canvas, lat, lng } = mapWaiting
			renderMap(canvas, lat, lng)
			mapWaiting = null
		}
	}

	function showMap(canvas, lat, lng) {
		if (mapLoaded) renderMap(canvas, lat, lng)
		else mapWaiting = { canvas, lat, lng }
	}

	function renderMap(canvas, lat, lng) {
		const mapOptions = {
			zoom: 10,
			center: new window.google.maps.LatLng(lat, lng),
			disableDefaultUI: true,
			zoomControl: true,
			mapId: 'd8bcc146f72e92c9'
		}
		const locations = [
			[{ lat: 27.9939396, lng: -82.4855715 }, 'Tampa Campus', 'tampa'],
			[
				{ lat: 28.193279, lng: -82.3782233 },
				'Wesley Chapel Campus',
				'wesleychapel'
			]
		]
		const map = new window.google.maps.Map(canvas, mapOptions)

		locations.forEach(([position, title, route], i) => {
			const marker = new window.google.maps.Marker({
				position,
				map,
				title: `${i + 1}. ${title}`,
				// label: { text: `${title}`, className: 'marker' },
				optimized: false
			})

			const content = `<div class="flex flex-col">
                        <h2>${title}</h2>
                        <a href="http://localhost:3000/campus/${route}">LEARN</a>
                      </div>`

			const infowindow = new window.google.maps.InfoWindow({
				content
			})
			marker.setMap(map)
			infowindow.open({
				anchor: marker,
				map
			})

			marker.addListener('click', () => {
				app.router.push({ path: `#` })
			})
		})
	}
})
