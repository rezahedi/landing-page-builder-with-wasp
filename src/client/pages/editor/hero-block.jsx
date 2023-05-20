export default {
	id: 'hero',
	label: 'Hero',
	select: true,
	content: {
		components: [
			{
				tagName: 'section',
				style: {
					'background': '#000000',
					// 'padding': '50px',
				},
				stylable: [
					'padding',
					'background',
					'background-color'
				],
				unstylable: [
					'width',
					'box-shadow',
					'color',
					'min-height'
				],
				components: [{
					tagName: 'h1',
					content: 'Hero Title',
					style: {
						'color': 'white',
					},
					stylable: [
						'color', 'padding'
					],
				}, {
					tagName: 'p',
					content: 'Hero Text',
					style: {
						'color': 'white',
					}
				}, {
					tagName: 'button',
					content: 'Hero Button',
					style: {
						'background-color': 'blue',
						'color': 'white',
						'padding': '10px',
						'border-radius': '5px',
						'border': 'none',
						'cursor': 'pointer',
					}
				}],
			}
		],
		style: {
			'margin': '50px',
			'text-align': 'center'
		}
	},
	selected: (block, editor) => {
		console.log('clicked');
	},
}