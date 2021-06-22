import React from 'react'
import { FaCheckCircle, FaCircle, FaEdit, FaTrash } from 'react-icons/fa'

const List = ({ items, remove, editItem, toggleItem }) => {
  return (
    <div className='grocery-list'>
      {items.map((item) => {
        const { id, title, done } = item
        return (
          <article key={id} className='grocery-item'>
            <p
              className='title'
              onClick={() => toggleItem(id)}
              // style={{ width: '100%', borderStyle: 'dotted' }}
            >
              {title}
            </p>
            <div>
              <button
                type='button'
                style={{ borderStyle: 'dotted' }}
                className='check-btn'
                onClick={() => toggleItem(id)}
              >
                {done ? <FaCheckCircle /> : <FaCircle />}
              </button>
              <button
                type='button'
                className='edit-btn'
                onClick={() => editItem(id)}
              >
                <FaEdit />
              </button>
              <button
                type='button'
                className='delete-btn'
                onClick={() => remove(id)}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        )
      })}
    </div>
  )
}

export default List
