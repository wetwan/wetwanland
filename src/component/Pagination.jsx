/* eslint-disable react/prop-types */

const Pagination = ({activePage, totalPages, setActivePage}) => {
  return (
   <main>
        <div className="flex gap-2 items-center my-4"> 
            <div className="flex max-w-64 gap-4 my-3">
                <button 
                    className="p-2 shadow-md shadow-gray-700 bg-gray-500 sm:w-[100px] rounded-md   "
                     
                    onClick={() => setActivePage (activePage -1)} 
                    disabled={activePage === 1}> prev</button>
                <button 
                    className="p-2 bg-gray-500 sm:w-[100px] rounded-md shadow-md shadow-gray-700 "
                    disabled={activePage === totalPages}
                    onClick={()=> setActivePage (activePage + 1)}> next</button>
            </div>
            <div className="flex gap-4 font-bold text-stone-300 my-3 mx-4">
                <div>
                    <p>{activePage}</p>
                </div>
                <div>
                    <p>of</p>
                </div>
                <div>
                    <p>{totalPages}</p>
                </div>
            </div>
        </div>
   </main>
  )
}

export default Pagination