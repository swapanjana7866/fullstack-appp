import React from 'react'
import { useState,useEffect} from 'react'
import axios from "axios"

const App = () => {  
const  [notes,setNotes] = useState([])
console.log("Hello swapan")
function fetchNotes(){
    axios.get("http://localhost:3000/api/notes")
  .then(res=>{
    setNotes(res.data.notes)
    
  })
}

useEffect(()=>{
 fetchNotes()
},[])
  
function handleSubmit(e){
  e.preventDefault()
  const {title,description}= e.target.elements
  console.log(title.value,description.value)
  axios.post("http://localhost:3000/api/notes",{
    title:title.value,
    description:description.value
  })
  .then(res=>{
    console.log(res.data)
    fetchNotes()
  })
}


function handleUpdateNote(noteId) {
    axios.patch("http://localhost:3000/api/notes/" + noteId, {
      title: "Updated Title",
      description: "Updated Description"
    })
      .then(res => {
        console.log(res.data)
        fetchNotes()
      })
  }




function handleDeleteNote(noteId){
  axios.delete("http://localhost:3000/api/notes/"+noteId)
  .then(res=>{
    console.log(res.data);
    fetchNotes()
    
  })
}
 
  return (
    <>
    <form className ='note-create-from' onSubmit={handleSubmit}>
      <input name='title' type="text" placeholder='Enter your title' /> 
      <input  name='description' type="text" placeholder='Enter your description' />
      <button>create note</button>
    </form>

    <div className="notes">
      {
        notes.map(note=>{
          return<div className='note'>
            <h1>{note.title}</h1>
            <p>{note.description}</p>
            <button onClick={()=>{handleDeleteNote(note._id)}}>delete</button>
            <button onClick={() => handleUpdateNote(note._id)}>update</button>
                  
          </div>
        })
      }
    </div>
    </>
 
  )
}

export default App

















