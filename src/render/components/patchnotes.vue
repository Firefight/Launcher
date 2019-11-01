<template lang="pug">
	section
		section.nodrag.patchnotes
			div(v-for="string of strings" v-html="markdown(string)")
</template>

<script>
	const hljs = require('highlight.js')

	const markdown = require("markdown-it")({
		highlight ( str, lang ) {
			if (lang && hljs.getLanguage(lang)) try {
				return hljs.highlight(lang, str).value
			} catch { }

			return ''
		}
	})

	export default {
		data () {
			return {
				strings: [
`
Test *Test* **Test**
# Test
## Test
### Test
\`\`\`js
const abc = "def" || 123;
\`\`\`
`
				]
			}
		},

		methods: {
			markdown ( string ) {
				return markdown.render(string)
			}
		}
	}
</script>

<style lang="sass">
	section.patchnotes
		div > * 
			margin: 0.7rem 0

		p
			color: white
			opacity: 0.9

		pre
			color: white
			background-color: rgb(45,45,45)
			padding: 1rem

			*
				font-family: 'Source Code Pro'

	.hljs
		display: block
		overflow-x: auto
		padding: .5em
		background: #F0F0F0
		color: #444

	.hljs-subst
		color: #444

	.hljs-comment
		color: #888888

	.hljs-keyword, .hljs-attribute, .hljs-selector-tag, .hljs-meta-keyword, .hljs-doctag, .hljs-name
		font-weight: bold

	.hljs-type, .hljs-string, .hljs-number, .hljs-selector-id, .hljs-selector-class, .hljs-quote, .hljs-template-tag, .hljs-deletion
		color: #880000

	.hljs-title, .hljs-section
		color: #880000
		font-weight: bold

	.hljs-regexp, .hljs-symbol, .hljs-variable, .hljs-template-variable, .hljs-link, .hljs-selector-attr, .hljs-selector-pseudo
		color: #BC6060

	.hljs-literal
		color: #78A960

	.hljs-built_in, .hljs-bullet, .hljs-code, .hljs-addition
		color: #397300

	.hljs-meta
		color: #1f7199

	.hljs-meta-string
		color: #4d99bf

	.hljs-emphasis
		font-style: italic

	.hljs-strong
		font-weight: bold

	.hljs-tag, .hljs-subst
		color: #f8f8f2

	.hljs-strong, .hljs-emphasis
		color: #a8a8a2

	.hljs-bullet, .hljs-quote, .hljs-number, .hljs-regexp, .hljs-literal, .hljs-link
		color: #ae81ff

	.hljs-code, .hljs-title, .hljs-section, .hljs-selector-class
		color: #a6e22e

	.hljs-strong
		font-weight: bold

	.hljs-emphasis
		font-style: italic

	.hljs-keyword, .hljs-selector-tag, .hljs-name, .hljs-attr
		color: #f92672

	.hljs-symbol, .hljs-attribute
		color: #66d9ef

	.hljs-params, .hljs-class .hljs-title
		color: #f8f8f2

	.hljs-string, .hljs-type, .hljs-built_in, .hljs-builtin-name, .hljs-selector-id, .hljs-selector-attr, .hljs-selector-pseudo, .hljs-addition, .hljs-variable, .hljs-template-variable
		color: #e6db74

	.hljs-comment, .hljs-deletion, .hljs-meta
		color: #75715e
</style>
