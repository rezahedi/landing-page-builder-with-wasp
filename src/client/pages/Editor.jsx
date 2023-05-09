import { useQuery } from '@wasp/queries'
import getPage from '@wasp/queries/getPage';

const Editor = (props) => {

	const pageId = parseInt(props.match.params.id);
	const { data: page, isFetching, error } = useQuery(getPage, { pageId })

	return (
		<div>
			{page && <h2>{page.title}</h2>}
			{isFetching && 'Fetching...'}
			{error && 'Error: ' + error}
		</div>
	)
}

export default Editor;