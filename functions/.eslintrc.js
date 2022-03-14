module.exports = {
	root: true,
	env: {
		es6: true,
		node: true
	},
	extends: ['eslint:recommended', 'google'],
	rules: {
		quotes: ['error', 'single'],
		semi: ['error', 'never'],
		'quote-props': ['error', 'as-needed'],
		'no-tabs': ['error', { allowIndentationTabs: true }],
		'object-curly-spacing': ['error', 'always'],
		indent: ['error', 'tab'],
		'comma-dangle': ['error', 'never']
	}
}
