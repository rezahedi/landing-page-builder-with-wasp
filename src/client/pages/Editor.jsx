import { useQuery } from '@wasp/queries'
import getPage from '@wasp/queries/getPage';
import updatePageContent from '@wasp/actions/updatePageContent'
import { useEffect, useState } from 'react';
import 'grapesjs/dist/css/grapes.min.css';
import './editor.css';
import grapesjs from 'grapesjs';
// Always import GrapeJs Plugins after importing grapesjs
import plugin from 'grapesjs-style-bg';
import 'grapick/dist/grapick.min.css';

import blocks from './editor/blocks';

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
			height: 'auto',
			width: 'auto',
			// Disable the storage manager for the moment
			storageManager: false,
			// Avoid any default panel
			panels: { defaults: [] },
			blockManager: {
				appendTo: '#blocks',
				blocks: blocks
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
			}, plugin],
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
			selectorManager: {
				appendTo: '#blocks'
			},
			styleManager: {
				appendTo: '#blocks',
				sectors: [{
					name: 'Dimension',
					open: false,
					buildProps: ['width', 'min-height', 'padding'],
					properties: [
						{
							id: 'width',
							name: 'Width',
							property: 'width',
							type: 'integer',
							units: ['px', '%'],
							default: 'auto',
							min: 0,
						},
						{
							id: 'min-height',
							name: 'Min Height',
							property: 'min-height',
							type: 'integer',
							units: ['px', '%'],
							default: 'auto',
							min: 0,
						},
					]
				}, {
					name: 'Extra',
					open: false,
					buildProps: ['color', 'background', 'box-shadow', 'custom-prop'],
					properties: [
						{
							id: 'box-shadow',
							name: 'Box Shadow',
							property: 'box-shadow',
							type: 'shadow',
						},
						{
							id: 'custom-prop',
							name: 'Custom Property',
							property: 'font-size',
							type: 'select',
							default: '32px',
							// List of options, available only for 'select' and 'select-block'
							options: [
								{ value: '12px', name: 'Tiny' },
								{ value: '18px', name: 'Medium' },
								{ value: '32px', name: 'Big' },
							],
						},
					]
				}]
			},
		});

		myEditor.on('component:selected', model => {
			console.log('selected', model);
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
		<div className="editor-wrapper">
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
		</div>
	)
}

export default Editor;