import React, { useState } from 'react'
import axios from 'axios'

import loadedData from '../../language.json'
import BrazilFlag from '../flags/brazil.svg'
import USAFlag from '../flags/usa.svg'

const styles = {
  saveContainer: {
    alignItems: 'center',
    display: 'flex',
    margin: '30px',
  },
  block: {
    borderBottom: '1px solid #ccc',
    padding: '30px',
  },
  title: {
    fontSize: '24px',
    color: '#2c5899',
    marginBottom: '10px',
  },
  languageContainer: {
    alignItems: 'center',
    display: 'flex',
    marginBottom: '10px',
  },
}

function getFlag(language) {
  if (language === 'pt-br') return <BrazilFlag style={{ width: '40px' }} />
  if (language === 'en') return <USAFlag style={{ width: '40px' }} />
}

function handleSubmit(data) {
  return axios.post('http://localhost:3333/save', data)
}

const App = () => {
  const [data, setData] = useState(loadedData)
  const [hasSaved, setHasSaved] = useState(false)

  function handleSaveClick() {
    handleSubmit(data).then(() => {
      setHasSaved(true)
      setTimeout(() => setHasSaved(false), 3000)
    })
  }

  function handleChange(word, language, value) {
    setData({
      ...data,
      [word]: {
        ...data[word],
        [language]: value,
      },
    })
  }

  return (
    <div>
      <div style={styles.saveContainer}>
        <button onClick={() => handleSaveClick(data)}>Save</button>
        {hasSaved && <p className="saved-text">Saved</p>}
      </div>
      <ul>
        {Object.keys(data).map((key) => (
          <Word key={key} data={data} word={key} onChange={handleChange} />
        ))}
      </ul>
    </div>
  )
}

const Word = ({ data, word, onChange }) => (
  <li style={styles.block}>
    <h1 style={styles.title}>{word}</h1>
    <ul>
      {Object.keys(data[word]).map((language) => (
        <li key={language} style={styles.languageContainer}>
          {getFlag(language)}{' '}
          <input
            type="text"
            value={data[word][language]}
            onChange={(e) => onChange(word, language, e.target.value)}
          />
        </li>
      ))}
    </ul>
  </li>
)

export default App
