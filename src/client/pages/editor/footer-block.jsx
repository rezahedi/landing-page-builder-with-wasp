export default {
	id: 'footer',
	label: 'Footer',
	select: true,
	content: {
		components: [{
			tagName: 'footer',
			components: `<p>Footer Text</p>`,
			stylable: [
				'padding',
				'background',
				'background-color',
				'color'
			],
			style: {
				'background': '#000000',
				'padding': '50px',
			},
		}],
	},
};