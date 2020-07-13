import React from 'react'
import axios from 'axios'

import data from '../../language.json'
import BrazilFlag from '../flags/brazil.svg'
import USAFlag from '../flags/usa.svg'

const styles = {
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

function handleClick() {
  axios.post('http://localhost:3333/save', data)
}

const App = () => (
  <div>
    <button onClick={handleClick}>Save</button>
    <ul>
      {Object.keys(data).map((key) => (
        <Word key={key} word={key} />
      ))}
    </ul>
  </div>
)

const Word = ({ word }) => (
  <li style={styles.block}>
    <h1 style={styles.title}>{word}</h1>
    <ul>
      {Object.keys(data[word]).map((language) => (
        <li key={language} style={styles.languageContainer}>
          {getFlag(language)} <input type="text" value={data[word][language]} />
        </li>
      ))}
    </ul>
  </li>
)

export default App
