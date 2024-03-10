
export default function SearchForm({ onSubmit }) {

  return (
    <div>
          <form onSubmit={(e)=> onSubmit(e)}>
            <input type="text" placeholder='Search movies' id="search"/>
            <button>Search</button>
        </form>
    </div>
  )
}
