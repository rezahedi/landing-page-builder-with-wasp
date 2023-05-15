import { useQuery } from '@wasp/queries'
import getPage from '@wasp/queries/getPage';
import updatePageContent from '@wasp/actions/updatePageContent'
import { useEffect, useState } from 'react';
import 'grapesjs/dist/css/grapes.min.css';
import './editor.css';
import grapesjs from 'grapesjs';


const Editor = (props) => {
	const [editor, setEditor] = useState(null);
	let pageId = parseInt(props.match.params.id);
	const { data, isFetching, error } = useQuery(getPage, { pageId });
	const [page, setPage] = useState(null);

	const handlePreview = () => {
		window.location.href = `/${page.slug}`;
	}

	useEffect(() => {
		if (data) {
			setPage(data);
		}
	}, [data]);

	useEffect(() => {

		// Prevents the editor from being initialized before the page's data is fetched
		if (page === null || editor !== null) return;

		let myEditor = grapesjs.init({
			// Indicate where to init the editor. You can also pass an HTMLElement
			container: '#gjs',
			// Get the content for the canvas directly from the element
			// As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
			fromElement: true,
			// Size of the editor
			height: '300px',
			width: 'auto',
			// Disable the storage manager for the moment
			storageManager: false,
			// Avoid any default panel
			panels: { defaults: [] },
			blockManager: {
				appendTo: '#blocks',
				blocks: [
					{
						id: 'section', // id is mandatory
						label: '<b>Section</b>', // You can use HTML/SVG inside labels
						attributes: { class: 'gjs-block-section' },
						content: `<section>
						<h1>This is a simple title</h1>
						<div>This is just a Lorem text: Lorem ipsum dolor sit amet</div>
					</section>`,
					}, {
						id: 'text',
						label: 'Text',
						content: '<div data-gjs-type="text">Insert your text here</div>',
					}, {
						id: 'image',
						label: 'Image',
						// Select the component once it's dropped
						select: true,
						// You can pass components as a JSON instead of a simple HTML string,
						// in this case we also use a defined component type `image`
						content: { type: 'image' },
						// This triggers `active` event on dropped components and the `image`
						// reacts by opening the AssetManager
						activate: true,
					}, {
						id: 'hero',
						label: 'Hero',
						select: true,
						content: `<section class="hero">
						<h1 class="hero-title">Hero Title</h1>
						<p class="hero-subtitle">Hero Subtitle</p>
						<button class="hero-button">Hero Button</button>
						</section>`,
						activate: true,
					}, {
						id: 'social',
						label: 'Social',
						select: true,
						content: `<section class="social">
						<a href="https://www.facebook.com/" target="_blank" class="social-link"><i class="fab fa-facebook-f"></i> Facebook</a>
						<a href="https://www.instagram.com/" target="_blank" class="social-link"><i class="fab fa-instagram"></i> Instagram</a>
						<a href="https://www.twitter.com/" target="_blank" class="social-link"><i class="fab fa-twitter"></i> Twitter</a>
						<a href="https://www.linkedin.com/" target="_blank" class="social-link"><i class="fab fa-linkedin-in"></i> Linkedin</a>
						</section>`,
						activate: true,
					}, {
						id: 'footer',
						label: 'Footer',
						select: true,
						content: `<footer>
						<p class="footer-text">Footer Text</p>
						</footer>`,

						activate: true,
					}
				]
			},
			plugins: [(editor) => {
				editor.Storage.add('inline', {
					load() {
						return JSON.parse((page ? page.content : '{}'));
					},
					async store(data) {
						await updatePageContent({
							pageId,
							data: {
								content: JSON.stringify(data),
								// contentHtml: `<html><head><style>${editor.getCss()}</style></head><body>${editor.getHtml()}</body></html>`
								contentHtml: editor.getHtml()
							}
						});
					}
				})
			}],
			storageManager: { type: 'inline' },
			// storageManager: {
			// 	type: 'local', // Type of the storage, available: 'local' | 'remote'
			// 	autosave: true, // Store data automatically
			// 	autoload: true, // Autoload stored data on init
			// 	stepsBeforeSave: 10, // If autosave enabled, indicates how many changes are necessary before store method is triggered
			// 	options: {
			// 		local: { // Options for the `local` type
			// 			key: 'waspProject', // The key for the local storage
			// 		},
			// 		remote: {
			// 			headers: {}, // Custom headers for the remote storage request
			// 			urlStore: 'https://your-server/endpoint/store', // Endpoint URL where to store data project
			// 			urlLoad: 'https://your-server/endpoint/load', // Endpoint URL where to load data project
			// 		}
			// 	}
			// }
		});

		myEditor.Panels.addPanel({
			id: 'panel-top',
			el: '.panel__top',
		});
		myEditor.Panels.addPanel({
			id: 'basic-actions',
			el: '.panel__basic-actions',
			buttons: [
				{
					id: 'undo',
					className: 'btn-undo',
					label: '<i class="fa fa-undo"></i>',
					command(editor) {
						editor.UndoManager.undo();
					},
					attributes: { title: 'Undo (CTRL/CMD + Z)' },
				}, {
					id: 'redo',
					className: 'btn-redo',
					label: '<i class="fa fa-repeat"></i>',
					command(editor) {
						editor.UndoManager.redo();
					},
					attributes: { title: 'Redo (CTRL/CMD + SHIFT + Z)' },
				},
				// {
				// 	id: 'save-db',
				// 	className: 'btn-save-db',
				// 	label: 'Save',
				// 	context: 'save-db',
				// 	async command(editor) {
				// 		editor.store();
				// 	}
				// }, {
				// 	id: 'back',
				// 	className: 'btn-back',
				// 	label: 'Back to Pages',
				// 	context: 'back',
				// 	command(editor) {
				// 		window.location.href = "/";
				// 	}
				// }
			],
		});
		setEditor(myEditor);
	}, [page]);

	return (
		<>
			<div>
				<button onClick={() => handlePreview()}><i className="fa fa-eye"></i> Preview</button>
				<button onClick={() => editor.store()}><i className="fa fa-save"></i> Save</button>
				<button onClick={() => window.location.href = "/"} ><i className="fa fa-arrow-left"></i> Back</button>

			</div>
			{isFetching && <div>Loading...</div>}
			{error && <div>Error loading data!</div>}
			<h2>{page && page.title}</h2>
			<div className="panel__top">
				<div className="panel__basic-actions"></div>
			</div>
			<div className="editor">
				<div id="gjs"></div>
				<div id="blocks"></div>
			</div>
		</>
	)
}

export default Editor;