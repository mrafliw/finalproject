import Button from '../components/Button'
import { useDocumentTitle } from '../lib/customHooks'

function NotFound() {
  useDocumentTitle('Not Found - Spotify')
  return (
    <main className='login'>
      Content not found
      <Button href='/create-playlist'>Go To Content</Button>
    </main>
  )
} 

export default NotFound;