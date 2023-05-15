import createPage from '@wasp/actions/createPage'

const NewPageForm = (props) => {

	const handleSubmit = async (event) => {
		event.preventDefault()
		try {
			const title = event.target.title.value
			const slug = event.target.slug.value
			const description = event.target.description.value
			event.target.reset()
			await createPage({ title, slug, description })
		} catch (err) {
			window.alert('Error: ' + err.message)
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label for="title">Title:</label>
				<input type="text" name='title' id="title" />
			</div>
			<div>
				<label for="slug">Slug:</label>
				<input type="text" name='slug' id="slug" />
			</div>
			<div>
				<label for="description">Description:</label>
				<textarea name='description' id="description"></textarea>
			</div>
			<input type='submit' value='Create page' />
		</form>
	)
}

export default NewPageForm