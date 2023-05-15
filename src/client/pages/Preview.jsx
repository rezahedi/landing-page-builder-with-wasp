import { useQuery } from '@wasp/queries'
import getPageBySlug from '@wasp/queries/getPageBySlug';

const Preview = (props) => {
	let slug = props.match.params.slug;
	const { data, isFetching, error } = useQuery(getPageBySlug, { slug });

	return (
		<div>
			{data && <div dangerouslySetInnerHTML={{ __html: data.contentHtml }} />}
			{isFetching && 'Fetching...'}
			{error && 'Error: ' + error}
		</div>
	)
}

export default Preview