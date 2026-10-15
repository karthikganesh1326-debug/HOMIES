import React from 'react'

function Premium() {
  return (
    <div className="container py-5 my-5 border border-dark rounded-3"
     style={{ maxWidth: "430px" }}>

      {/* Header */}
      <div className="text-center mb-4">

        <i className="bi bi-patch-check-fill text-primary fs-2"></i>

        <h3 className="fw-bold mt-2 mb-1">
          Premium
        </h3>

        <p className="text-secondary mb-0">
          Get verified and unlock premium features.
        </p>

      </div>


      {/* Premium content */}
      <div
        className="mx-auto border rounded-4 p-4"
        style={{ maxWidth: "430px" }}
      >

        {/* Price */}
        <div className="text-center mb-4">

          <span className="fs-1 fw-bold">
            ₹10
          </span>

        </div>


        {/* Feature */}
        <div className="d-flex align-items-center mb-4">

          <i className="bi bi-patch-check-fill text-primary fs-5 me-3"></i>

          <div>
            <div className="fw-semibold">
              Verified badge
            </div>

            <small className="text-secondary">
              Get a verified badge beside your username
            </small>
          </div>

        </div>


        {/* Button */}
        <button className="btn btn-primary w-100 rounded-3">
          Upgrade to Premium
        </button>

      </div>

    </div>
  )
}

export default Premium