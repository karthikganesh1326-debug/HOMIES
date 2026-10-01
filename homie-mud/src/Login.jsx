import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {

  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function login(e) {
    e.preventDefault()

    console.log(username)
    console.log(password)

    navigate('/home')
  }

  return (
    <div className="container-fluid min-vh-100">

      <div className="row min-vh-100">

        {/* LEFT SIDE */}
        <div className="col-md-6   d-flex flex-column justify-content-center align-items-center border-end  mt-n5
        "style={{ transform: 'translateY(0px)' }}>


          <h1 className="fw-bold mt-4 ">
            HOMIES
          </h1>

          <h2 className="text-center fw-normal">
            See everyday moments from
            <br />
            your <span className="text-primary">close friends.</span>
          </h2>

          <img
            src="/assets/login.png"
            alt="HOMIE"
            className="img-fluid "
            style={{ width: '400px',marginTop: '80px'} }
 
          
          />

        </div>


        {/* RIGHT SIDE */}
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">

          <div style={{ width: '420px', maxWidth: '90%' }}>

            <h3 className="fw-bold mb-4">
              Log into HOMIES
            </h3>

            <form onSubmit={login}>

              {/* Username */}
              <input
                type="text"
                className="form-control form-control-lg mb-3 rounded-3"
                placeholder="Mobile number, username or email"
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

              {/* Login */}
              <button
                type="submit"
                className="btn btn-primary btn-lg w-100 rounded-pill"
              >
                Log in
              </button>

            </form>


            {/* Forgot password */}
            <div className="text-center mt-4">
              <span>
                Forgot password?
              </span>
            </div>


            {/* OR */}
            <div className="d-flex align-items-center gap-3 my-4">

              <hr className="flex-grow-1" />

              <span className="text-muted">
                OR
              </span>

              <hr className="flex-grow-1" />

            </div>


        


            {/* Register */}
            <button
              className="btn btn-outline-primary w-100 btn-lg rounded-pill mt-3"
              onClick={() => navigate('/register')}
            >
              Create new account
            </button>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Login