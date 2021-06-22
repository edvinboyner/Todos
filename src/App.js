import React, { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return JSON.parse(localStorage.getItem('list'));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: '',
    type: '',
  });
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      // display alert
      showAlert(true, 'danger', 'please enter value');
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName('');
      setEditID(null);
      setIsEditing(false);
      showAlert(true, 'success', `value changed`);
    } else {
      showAlert(true, 'success', `${name} added to the list`);
      const newItem = {
        id: new Date().getTime().toString(),
        title: name,
        done: false,
      };
      setList([...list, newItem]);
      setName('');
    }
  };

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg });
  };

  const clearList = () => {
    showAlert(true, 'danger', 'empty list');
    setList([]);
  };

  const deleteItem = (id) => {
    showAlert(true, 'danger', 'item removed');
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };

  const toggleItem = (id) => {
    const newList = list.map((item) => {
      if (item.id === id) {
        const updatedItem = {
          ...item,
          done: !item.done,
        };
        showAlert(
          true,
          `${updatedItem.done ? 'success' : 'danger'}`,
          `${updatedItem.done ? 'Task Completed' : 'Task unCompleted'}`
        );
        return updatedItem;
      }
      return item;
    });
    setList(newList);
  };

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  return (
    <>
      <section className='section-center'>
        <form className='grocery-form' onSubmit={handleSubmit}>
          <h3>What should I do today?</h3>
          <div className='form-control'>
            <input
              type='text'
              className='grocery'
              placeholder='Go to the gym?'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button className='submit-btn' type='submit'>
              {isEditing ? 'edit' : 'submit'}
            </button>
          </div>
        </form>
        {list.length > 0 && (
          <div className='grocery-container'>
            <List
              items={list}
              remove={deleteItem}
              editItem={editItem}
              toggleItem={toggleItem}
            />
            <button className='clear-btn' onClick={clearList}>
              clear items
            </button>
          </div>
        )}
      </section>
      <div className='alertdiv'>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
      </div>
    </>
  );
}

export default App;
