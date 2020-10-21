import React, { useState, ChangeEvent, useEffect } from 'react';
import './App.css';
import Editor from './components/Editor';
import List, { IItem } from './components/List';

function App() {

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [disabled, setDisable] = useState(true);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [items, setItems] = useState([...JSON.parse(localStorage.getItem('items')!)]);

  const setActiveItem = (id: string, newItem?: IItem) => {
    setSelectedItem(id);
    let item = items.find(item => item.id === id) || newItem || { title: '', body: '' };
    setTitle(item.title);
    setBody(item.body);
    setDisable(true);
  }

  const setActiveTitle = (title: string) => {
    fetch(`/notes/${selectedItem}`, {
      method: 'PUT',
      body: JSON.stringify({
        body,
        title
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    setTitle(title);
    setItems(items.map(item => {
      if (item.id === selectedItem) {
        return { id: item.id, title, body: item.body }
      } else {
        return item
      }
    }))
  }

  const setActiveBody = (body: string) => {
    fetch(`/notes/${selectedItem}`, {
      method: 'PUT',
      body: JSON.stringify({
        body,
        title
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    setBody(body);
    setItems(items.map(item => {
      if (item.id === selectedItem) {
        return { id: item.id, title: item.title, body }
      } else {
        return item
      }
    }))
  }

  const addNewNote = () => {
    fetch('/notes', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        body: 'Новая заметка', title: 'Текст заметки'
      })
    }).then(async (res) => {
      const {id} = await res.json();
      console.log(id);
      setItems([{ id, title: 'Новая заметка', body: 'Текст заметки' }, ...items]);
      setActiveItem(id, { id, title: 'Новая заметка', body: 'Текст заметки' });
      setDisable(false);
    })
  }

  const enableEditor = () => {
    setDisable(false);
  }

  const removeItem = (id: string) => {
    fetch(`/notes/${id}`, {method: 'delete'}).then(() => {
      let newItems = (items.filter((item: IItem) =>
        item.id !== id
      ))
      setItems(newItems)
      setSelectedItem(null)
    });
  }

  // @ts-ignore
  useEffect(async () => {
    const fetchNotes = async () => {

      const response = await fetch('/notes');
      const result = await response.json();
  
      // @ts-ignore
      setItems(result.map(item => ({...item, id: item._id})));
    }

    fetchNotes();
  }, []);

  return (
    <div className='App'>
      <header className='App__header'>
        <h1 className='App__heading'>
          Заметки
        </h1>
        <button className='App__addButton' onClick={addNewNote}> + </button>
      </header>
      <div className='App__body'>
        <div className='App__action'>
          <List className='App__list' items={items} setItems={setItems} selectedItem={selectedItem} selectedItemChangeCallback={setActiveItem} removeItem={removeItem} setSelectedItem={setSelectedItem} />
        </div>
        {selectedItem && <Editor title={title} titleChangedCallback={setActiveTitle} body={body} bodyChangedCallback={setActiveBody} id={selectedItem} disabled={disabled} disabledChangedCallback={enableEditor} removeItem={removeItem} />}
      </div>
    </div>
  )
}

export default App;