'use client'

import React from 'react'

const ArticuloAcademico = ({ link, titulo, autor}) => {
  return (
    <div  className='flex flex-col items-center  px-4 py-2 rounded-lg border-t-[10px] border-primary bg-white text-primary shadow-md shadow-gray-600'>
        <h6 className='text-xl font-semibold'>{titulo}</h6>
        <span className='text-gray-600'>{autor}</span>
    </div>
  )
}

export default ArticuloAcademico