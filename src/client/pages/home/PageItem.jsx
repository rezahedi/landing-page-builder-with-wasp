import { Link } from 'react-router-dom'
import updatePage from '@wasp/actions/updatePage'

const PageItem = (props) => {

	const handleIsPublishedChange = async (event) => {
		try {
			await updatePage({
				pageId: props.page.id,
				data: { isPublished: event.target.checked }
			})
		} catch (error) {
			window.alert('Error while updating page: ' + error.message)
		}
	}

	const handleEditClick = () => {
		// TODO: open edit page form

	}

	return (
		<div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '1rem' }}>
			<div>
				<input type='checkbox' id={props.page.id} checked={props.page.isPublished} onChange={handleIsPublishedChange} />
			</div>
			<div style={{ flex: "1 1 auto" }}>
				<b>{props.page.title}</b><br />/{props.page.slug}
			</div>
			<div>
				<Link to={`/editor/${props.page.id}`}>Edit</Link>
			</div>
		</div>
	)
}

export default PageItem
