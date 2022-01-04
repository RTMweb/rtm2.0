import colors from 'windicss/colors'
import plugin from 'windicss/plugin'

module.exports = {
	attributify: true,
	purge: [
		'./components/**/*.{vue,js}',
		'./layouts/**/*.vue',
		'./pages/**/*.vue',
		'./plugins/**/*.{js,ts}',
		'./nuxt.config.{js,ts}'
	],
	darkMode: false, // or 'media' or 'class'
	theme: {
		container: {
			center: true
		},
		extend: {
			colors: {
				accent: '#d9e021',
				accentLight: '#ffff5f',
				accentDark: '#a4ae00',
				primary: '#0060A6',
				primaryLight: '#0060A6',
				primaryDark: '#528dd8',
				secondary: '#4D4D4D',
				secondaryLight: '#797979',
				secondaryDark: '#252525',
				white: '#FAFAFA'
			},
			fontFamily: {
				sofia: ['sofia-pro', 'ui-sans-serif', 'system-ui', '-apple-system'],
				proxy: ['proxima-nova', 'ui-sans-serif', 'system-ui', '-apple-system']
			}
		}
	},
	variants: {
		extend: {}
	},
	// shortcuts: {
	// 	btn: 'font-proxy font-medium py-2 px-4 uppercase rounded-sm',
	// 	'btn-yellow': 'bg-accent-100 text-secondary hover:bg-lime-300',
	// 	'btn-outline': 'border-2 border-solid border-white'
	// },
	plugins: [
		plugin(({ addComponents }) => {
			const buttons = {
				'.btn': {
					padding: '.5rem 1rem',
					borderRadius: '.25rem',
					fontSize: '.8rem',
					fontWeight: '500',
					textTransform: 'uppercase',
					letterSpacing: '.1rem',
					boxShadow: '0 1px 2px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.12)',
					'&:focus': {
						outline: 'none'
					},
					'&:hover': {
						transform: 'translateY(-2px)'
					}
				},
				'.btn-yellow': {
					backgroundColor: '#d9e021',
					color: '#4D4D4D',
					'&:hover': {
						backgroundColor: '#a4ae00'
					}
				},
				'.btn-outline': {
					border: '1.5px solid #FAFAFA',
					color: '#FAFAFA',
					boxShadow: 'none',
					'&:hover': {
						backgroundColor: 'rgba(253,253,253,.2)'
					}
				}
			}
			addComponents(buttons)
		}),
		require('windicss/plugin/aspect-ratio')
	]
}
