import { useQuery } from '@wasp/queries'
import getPages from '@wasp/queries/getPages'
import logout from '@wasp/auth/logout.js'

import NewPageForm from './pages/home/NewPageForm'
import PagesList from './pages/home/PagesList'

const MainPage = ({ user }) => {
  const { data: pages, isFetching, error } = useQuery(getPages)

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <NewPageForm />

      {pages && <PagesList pages={pages} />}

      {isFetching && 'Fetching...'}
      {error && 'Error: ' + error}

      <button onClick={logout}> Logout </button>
    </div>
  )
}

export default MainPage
