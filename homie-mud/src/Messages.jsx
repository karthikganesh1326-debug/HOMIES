import React from 'react'

function Messages() {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center text-center"
      style={{ height: "100vh" }}
    >

      <i className="bi bi-chat-dots fs-1 text-secondary mb-3"></i>

      <h3 className="fw-semibold">
        Messages
      </h3>

      <p className="text-secondary mb-1">
        We're currently working on this feature.
      </p>

      <p className="text-secondary">
        Stay tuned for updates!
      </p>

    </div>
  )
}

export default Messages