import React from 'react'
import './Footer.css'

function Footer({ btnPreview, btnNext }) {
  return (
    <footer>
      <p>
        Diseñado por{' '}
        <a
          href="https://www.linkedin.com/in/maríaeugeniacosta"
          rel="noreferrer"
          target="_blank"
        >
          María Eugenia Costa
        </a>
      </p>
    </footer>
  )
}

export default Footer
