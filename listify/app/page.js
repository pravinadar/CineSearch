import React from 'react'

function page() {
  return (
    <>
      <h1 className='bg-black text-white text-center p-3 text-5xl font-mono font-bold'>Listify</h1>
      <form>
        <input
        type="text"
        className='text-2xl font-mono p-2 m-2 border-2 border-b-gray-800 rounded-xl'
        placeholder='Task'
        />

        <input
        type="text"
        className='text-2xl font-mono p-2 m-2 border-2 border-b-gray-800 rounded-xl'
        placeholder='Description'
        />

        <button className='text-2xl font-mono py-2 px-4 m-4 rounded-xl bg-black text-white hover:bg-gray-700'>
          Add
        </button>
      </form>
    </>
  )
}

export default page
