import React from 'react'

function Footer({ btnPreview, btnNext }) {
  return (
    <footer>
      <div className="pagination">
        <button onClick={btnPreview}>Preview</button>
        <button onClick={btnNext} id="btnSiguiente">
          Next
        </button>
      </div>
    </footer>
  )
}

export default Footer
