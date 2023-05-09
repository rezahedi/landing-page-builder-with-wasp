import PageItem from './PageItem'

const PagesList = (props) => {
	if (!props.pages?.length) return 'No pages'
	return props.pages.map((page, idx) => <PageItem page={page} key={idx} />)
}

export default PagesList