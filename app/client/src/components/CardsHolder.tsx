import Card from './Card'
import { useGetAllMemes } from '../services'

function CardsHolder() {
  const { data, loading } = useGetAllMemes()
  return (
    <div className="my-8 flex flex-col gap-y-8 items-center justify-center">
      {!loading && data.map(meme => <Card key={meme.id} {...meme} />)}

      <button className="bg-black bg-opacity-10 lg:w-1/2 md:w-5/6 backdrop text-white px-3 py-1.5 rounded focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-40 hover:bg-opacity-30 text-lg">
        <i className="fa fa-plus-circle"></i> Load More...
      </button>
    </div>
  )
}

export default CardsHolder
