import React from 'react'

function Join() {


  function join() {
    window.open(
    "https://mail.google.com/mail/?view=cm&fs=1&to=karthikganesh1326@gmail.com&su=Join%20Request&body=Hello,%20I%20would%20like%20to%20join.",
      "_blank" 
    )
  }






  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center text-center"
      style={{ minHeight: "100vh" }}
    >

      <i className="bi bi-people-fill fs-1 text-primary mb-3"></i>

      <h1 className="fw-bold">
        Join Our Team
      </h1>

      <p className="text-secondary mt-2" style={{ maxWidth: "500px" }}>
        Join our team and start building something amazing.
        Work with us, share your ideas, and help shape the future
        of our platform.
      </p>

      <div className="d-flex gap-3 mt-3">

        <button className="btn btn-primary px-4 rounded-pill" onClick={join}>
          Join Us
        </button>


      </div>

    </div>
  )
}

export default Join