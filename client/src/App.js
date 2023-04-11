import './App.css';
import { useEffect, useState } from "react"
import axios from "axios"

const config = {
  headers: {
    "Content-type": "application/json",
  },
};

function App() {
  const [text, setText] = useState();
  const [notes, setNotes] = useState();

  useEffect(() => {
    const getNotes = async () => {
      try {
        const res = await axios.get("http://localhost:9000/get-notes", config);
        console.log(res)
        setNotes(res.data);
      } catch (error) {
        console.log(error)
      }
    }
    getNotes()
  }, [],[notes])

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:9000/add", { text }, config);
      console.log(res);
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="container p-5 my-5">
      <div class="mb-3">
        <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
        <textarea value={text} onChange={(e) => setText(e.target.value)} class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
      </div>
      <button onClick={handleSubmit} type="button" class="btn btn-primary">Primary</button>
      <div className="mt-5">
        <div class="list-group">
          {notes?.map((curr, i) => {
            return (
              <a key={i} href="#" class="list-group-item list-group-item-action" aria-current="true">
                <p class="mb-1">{curr.notes} 😄</p>
                <small>Dated : {curr.date}</small>
              </a>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
