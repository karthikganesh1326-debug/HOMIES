import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Register() {

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function register(e) {
    e.preventDefault()

    console.log(email)
    console.log(username)
    console.log(password)

    navigate('/home')
  }

  return (
    <div className="container-fluid min-vh-100">

      <div className="row min-vh-100">

        {/* LEFT SIDE */}
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center border-end
          mt-n5"
        style={{ transform: 'translateY(-9px)' }}>

          <h1 className="fw-bold mb-4">
            HOMIES
          </h1>

          <h2 className="text-center fw-normal">
            See everyday moments from
            <br />
            your <span className="text-primary">close friends.</span>
          </h2>

          <img
            src="/assets/register.png"
            alt="HOMIE"
           className="img-fluid "
            style={{ width: '300px',marginTop: '80px'}}
          />

        </div>


        {/* RIGHT SIDE */}
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">

          <div style={{ width: '420px', maxWidth: '90%' }}>

            <h3 className="fw-bold mb-2">
              Sign up for HOMIES
            </h3>

            <p className="text-muted text-center mb-4">
              Sign up to see photos and videos from your friends.
            </p>


            <form onSubmit={register}>

              {/* Email */}
              <input
                type="email"
                className="form-control form-control-lg mb-3 rounded-3"
                placeholder="Mobile number or email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />


              {/* Username */}
              <input
                type="text"
                className="form-control form-control-lg mb-3 rounded-3"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />


              {/* Password */}
              <input
                type="password"
                className="form-control form-control-lg mb-3 rounded-3"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />


              {/* Register */}
              <button
                type="submit"
                className="btn btn-primary btn-lg w-100 rounded-pill"
              >
                Sign up
              </button>

            </form>


            {/* OR */}
            <div className="d-flex align-items-center gap-3 my-4">

              <hr className="flex-grow-1" />

              <span className="text-muted">
                OR
              </span>

              <hr className="flex-grow-1" />

            </div>


           


            {/* Login */}
            <div className="border p-4 text-center mt-4">

              <span>
                Have an account?
              </span>

              <button
                className="btn btn-link fw-bold text-decoration-none"
                onClick={() => navigate('/')}
              >
                Log in
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Register