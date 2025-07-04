import React from 'react'

const SideMenu = () => {
  return (
    <section className="position-relative w-25 h-100 border-end text-black">
        <div className="container">
            <div className="side-menu">
                <h2>Menu</h2>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/archive">Archive</a></li>
                    <li><a href="/add-note">Add Note</a></li>
                </ul>
            </div>
        </div>
    </section>
  )
}

export default SideMenu