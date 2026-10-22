import React, { useState, useEffect } from "react"
import axios from "axios"

function Userprofiletemplate({
  Userprofiledata,
  userPosts,
  following,
  setfollowing,
  userreels
}) {

  const [edit, setedit] = useState(false)
  const [activeTab, setactiveTab] = useState("posts")

  const [selectedPost, setselectedPost] = useState(null)
  const [selectedReel, setselectedReel] = useState(null)

  // popup open / close
  const [showfollow, setshowfollow] = useState(false)

  // followers / following tab
  const [follow, setfollow] = useState("followers")

  // all users
  const [user, setuser] = useState([])

  const [profile, setprofile] = useState(Userprofiledata)


  // ================= FETCH ALL USERS =================

  useEffect(() => {

    axios
      .get("http://localhost:3000/userprofile")
      .then((response) => {
        setuser(response.data)
      })
      .catch((error) => {
        console.log(error)
      })

  }, [])


  // ================= FOLLOWERS LIST =================

  const userfollowers = user.filter((user) =>

    Userprofiledata.user.followers.some(
      (id) => Number(id) === Number(user.user.id)
    )

  )


  // ================= FOLLOWING LIST =================

  const userfollowing = user.filter((user) =>

    Userprofiledata.user.following.some(
      (id) => Number(id) === Number(user.user.id)
    )

  )


  // ================= EDIT PROFILE =================

  function editbtn() {
    setedit(true)
  }


  function cancelbtn() {
    setedit(false)
    setprofile(Userprofiledata)
  }


  function handle(e) {

    setprofile((prev) => ({

      ...prev,

      user: {

        ...prev.user,

        [e.target.name]: e.target.value

      }

    }))

  }


  function handleimage(e) {

    const selectedimage = e.target.files[0]

    if (selectedimage) {

      setprofile((prev) => ({

        ...prev,

        user: {

          ...prev.user,

          [e.target.name]:
            URL.createObjectURL(selectedimage)

        }

      }))

    }

  }


  const savebtn = async () => {

    await axios.put(
      `http://localhost:3000/userprofile/${Userprofiledata.id}`,
      profile
    )

    console.log("updated")

    setedit(false)

  }


  // ================= FOLLOW =================

  const currentuser = 101

  const followuser =
    Number(Userprofiledata.user.id)


  const isfollowing =
    following.some(
      (id) => Number(id) === followuser
    )


  const ismyprofile =
    Number(Userprofiledata.user.id) === currentuser


  async function followbtn() {

    const getcurrentuser =
      await axios.get(
        `http://localhost:3000/userprofile/${currentuser}`
      )


    const getfollowuser =
      await axios.get(
        `http://localhost:3000/userprofile/${followuser}`
      )


    const isfollowing =
      getcurrentuser.data.user.following.some(
        (id) => Number(id) === followuser
      )


    // ================= UNFOLLOW =================

    if (isfollowing) {

      const updatecurrentuserfollowing = {

        ...getcurrentuser.data,

        user: {

          ...getcurrentuser.data.user,

          following:
            getcurrentuser.data.user.following.filter(
              (id) => Number(id) !== followuser
            )

        }

      }


      await axios.put(
        `http://localhost:3000/userprofile/${currentuser}`,
        updatecurrentuserfollowing
      )


      const updatefollowuserfollowerlist = {

        ...getfollowuser.data,

        user: {

          ...getfollowuser.data.user,

          followers:
            getfollowuser.data.user.followers.filter(
              (id) => Number(id) !== currentuser
            )

        }

      }


      await axios.put(
        `http://localhost:3000/userprofile/${followuser}`,
        updatefollowuserfollowerlist
      )

    }


    // ================= FOLLOW =================

    else {

      const updatecurrentuserfollowing = {

        ...getcurrentuser.data,

        user: {

          ...getcurrentuser.data.user,

          following: [
            ...getcurrentuser.data.user.following,
            followuser
          ]

        }

      }


      await axios.put(
        `http://localhost:3000/userprofile/${currentuser}`,
        updatecurrentuserfollowing
      )


      const updatefollowuserfollowerlist = {

        ...getfollowuser.data,

        user: {

          ...getfollowuser.data.user,

          followers: [
            ...getfollowuser.data.user.followers,
            currentuser
          ]

        }

      }


      await axios.put(
        `http://localhost:3000/userprofile/${followuser}`,
        updatefollowuserfollowerlist
      )

    }


    // ================= UPDATE SHARED STATE =================

    if (isfollowing) {

      setfollowing((prev) =>

        prev.filter(
          (id) => Number(id) !== followuser
        )

      )

    }

    else {

      setfollowing((prev) =>

        prev.includes(followuser)
          ? prev
          : [...prev, followuser]

      )

    }

  }


  // ================= REMOVE USER =================

  async function deleteuser(userid) {

    const currentuserid = 101


    // Get current user

    const currentuserResponse =
      await axios.get(
        `http://localhost:3000/userprofile/${currentuserid}`
      )

    const currentuser =
      currentuserResponse.data


    // Get selected user

    const selecteduserResponse =
      await axios.get(
        `http://localhost:3000/userprofile/${userid}`
      )

    const selecteduser =
      selecteduserResponse.data


    // =================================================
    // REMOVE FROM FOLLOWERS
    // =================================================

    if (follow === "followers") {

      // Remove selected user from MY followers

      const updatedCurrentUser = {

        ...currentuser,

        user: {

          ...currentuser.user,

          followers:
            currentuser.user.followers.filter(
              (id) =>
                Number(id) !== Number(userid)
            )

        }

      }


      // Remove ME from selected user's following

      const updatedSelectedUser = {

        ...selecteduser,

        user: {

          ...selecteduser.user,

          following:
            selecteduser.user.following.filter(
              (id) =>
                Number(id) !== Number(currentuserid)
            )

        }

      }


      // Update current user

      await axios.put(
        `http://localhost:3000/userprofile/${currentuserid}`,
        updatedCurrentUser
      )


      // Update selected user

      await axios.put(
        `http://localhost:3000/userprofile/${userid}`,
        updatedSelectedUser
      )


      // Update popup list immediately

      setuser((prev) =>

        prev.filter(
          (user) =>
            Number(user.user.id) !== Number(userid)
        )

      )

    }


    // =================================================
    // REMOVE FROM FOLLOWING
    // =================================================

    if (follow === "following") {

      // Remove selected user from MY following

      const updatedCurrentUser = {

        ...currentuser,

        user: {

          ...currentuser.user,

          following:
            currentuser.user.following.filter(
              (id) =>
                Number(id) !== Number(userid)
            )

        }

      }


      // Remove ME from selected user's followers

      const updatedSelectedUser = {

        ...selecteduser,

        user: {

          ...selecteduser.user,

          followers:
            selecteduser.user.followers.filter(
              (id) =>
                Number(id) !== Number(currentuserid)
            )

        }

      }


      // Update current user

      await axios.put(
        `http://localhost:3000/userprofile/${currentuserid}`,
        updatedCurrentUser
      )


      // Update selected user

      await axios.put(
        `http://localhost:3000/userprofile/${userid}`,
        updatedSelectedUser
      )


      // Update shared following state

      setfollowing((prev) =>

        prev.filter(
          (id) =>
            Number(id) !== Number(userid)
        )

      )


      // Update popup list immediately

      setuser((prev) =>

        prev.filter(
          (user) =>
            Number(user.user.id) !== Number(userid)
        )

      )

    }

  }


  return (

    <div
      className="container mt-4"
      style={{
        maxWidth: "935px"
      }}
    >


      {/* ================= PROFILE HEADER ================= */}

      <div className="p-3">

        <div className="d-flex align-items-center">


          {/* PROFILE IMAGE */}

          <img
            src={profile.user.profile}
            alt=""
            className="rounded-circle"
            width="150"
            height="150"
            style={{
              objectFit: "cover"
            }}
          />


          {/* PROFILE INFORMATION */}

          <div className="ms-5 flex-grow-1">


            {/* USERNAME + BUTTON */}

            <div className="d-flex align-items-center gap-3 mb-3">

              <h4 className="mb-0">
                {profile.user.username}
              </h4>


              {ismyprofile ? (

                <button
                  className="btn btn-light border fw-semibold"
                  onClick={editbtn}
                >
                  Edit profile
                </button>

              ) : (

                <button
                  className="btn btn-primary fw-semibold"
                  onClick={followbtn}
                >
                  {isfollowing
                    ? "Following"
                    : "Follow"
                  }
                </button>

              )}

            </div>


            {/* ================= STATS ================= */}

            <div className="d-flex gap-4 mb-3">


              {/* POSTS */}

              <span>

                <strong>
                  {userPosts.length}
                </strong>{" "}
                posts

              </span>


              {/* FOLLOWERS */}

              <span
                style={{
                  cursor: "pointer"
                }}
                onClick={() => {

                  setfollow("followers")

                  setshowfollow(true)

                }}
              >

                <strong>
                  {Userprofiledata.user.followers.length}
                </strong>{" "}
                followers

              </span>


              {/* FOLLOWING */}

              <span
                style={{
                  cursor: "pointer"
                }}
                onClick={() => {

                  setfollow("following")

                  setshowfollow(true)

                }}
              >

                <strong>
                  {Userprofiledata.user.following.length}
                </strong>{" "}
                following

              </span>


            </div>


            {/* NAME + BIO */}

            <div>

              <strong>
                {profile.user.name}
              </strong>

              <div>
                {profile.user.bio}
              </div>

            </div>


            {/* ================= EDIT PROFILE ================= */}

            {edit && (

              <div
                className="card border rounded-3 p-4 mt-3"
                style={{
                  maxWidth: "400px",
                  zIndex: "1050"
                }}
              >

                <h5 className="fw-bold mb-3">
                  Edit profile picture
                </h5>


                <input
                  type="file"
                  accept="image/*"
                  className="form-control mb-3"
                  name="profile"
                  onChange={handleimage}
                />


                <h5 className="fw-bold mb-3">
                  Edit Username
                </h5>


                <input
                  type="text"
                  className="form-control mb-3"
                  name="username"
                  value={profile.user.username}
                  onChange={handle}
                />


                <h5 className="fw-bold mb-3">
                  Edit name
                </h5>


                <input
                  type="text"
                  className="form-control mb-3"
                  name="name"
                  value={profile.user.name}
                  onChange={handle}
                />


                <h5 className="fw-bold mb-3">
                  Edit bio
                </h5>


                <input
                  type="text"
                  className="form-control mb-3"
                  name="bio"
                  value={profile.user.bio}
                  onChange={handle}
                />


                <div className="d-flex gap-2">

                  <button
                    className="btn btn-primary"
                    onClick={savebtn}
                  >
                    Save
                  </button>


                  <button
                    className="btn btn-light border"
                    onClick={cancelbtn}
                  >
                    Cancel
                  </button>

                </div>

              </div>

            )}

          </div>

        </div>

      </div>


      {/* ================= POSTS / REELS TABS ================= */}

      <div
        className="d-flex justify-content-center border-top border-bottom mt-4"
        style={{
          height: "50px"
        }}
      >

        {/* POSTS */}

        <button
          className="btn rounded-0 px-5"
          onClick={() =>
            setactiveTab("posts")
          }
          style={{
            borderBottom:
              activeTab === "posts"
                ? "2px solid black"
                : "2px solid transparent"
          }}
        >

          <i className="bi bi-grid-3x3"></i>

        </button>


        {/* REELS */}

        <button
          className="btn rounded-0 px-5"
          onClick={() =>
            setactiveTab("reels")
          }
          style={{
            borderBottom:
              activeTab === "reels"
                ? "2px solid black"
                : "2px solid transparent"
          }}
        >

          <i className="bi bi-play-btn"></i>

        </button>

      </div>


      {/* ================= POSTS ================= */}

      {activeTab === "posts" && (

        <div className="row g-1 mt-1">

          {userPosts.map((post) => (

            <div
              className="col-4"
              key={post.id}
            >

              <img
                src={post.image}
                alt=""
                className="w-100"
                onClick={() =>
                  setselectedPost(post)
                }
                style={{
                  aspectRatio: "3 / 4",
                  objectFit: "cover",
                  cursor: "pointer"
                }}
              />

            </div>

          ))}

        </div>

      )}


      {/* ================= REELS ================= */}

      {activeTab === "reels" && (

        <div className="row g-1 mt-1">

          {userreels.map((reel) => (

            <div
              className="col-4"
              key={reel.id}
            >

              <video
                src={reel.video}
                className="w-100"
                onClick={() =>
                  setselectedReel(reel)
                }
                style={{
                  aspectRatio: "3 / 4",
                  objectFit: "cover",
                  cursor: "pointer"
                }}
              />

            </div>

          ))}

        </div>

      )}


      {/* ================= POST POPUP ================= */}

      {selectedPost && (

        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{
            backgroundColor: "rgba(0,0,0,0.8)",
            zIndex: 2000
          }}
          onClick={() =>
            setselectedPost(null)
          }
        >

          <div
            className="bg-white rounded"
            style={{
              maxWidth: "400px",
              width: "80%"
            }}
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <img
              src={selectedPost.image}
              alt=""
              className="w-100"
              style={{
                maxHeight: "500px",
                objectFit: "contain"
              }}
            />

            <div className="p-3">

              <strong>
                {selectedPost.user.username}
              </strong>

              <p className="mb-0">
                {selectedPost.caption}
              </p>

            </div>

          </div>

        </div>

      )}


      {/* ================= REEL POPUP ================= */}

      {selectedReel && (

        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{
            backgroundColor: "rgba(0,0,0,0.8)",
            zIndex: 2000
          }}
          onClick={() =>
            setselectedReel(null)
          }
        >

          <div
            style={{
              width: "500px",
              maxWidth: "90%"
            }}
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <video
              src={selectedReel.video}
              className="w-100"
              controls
              autoPlay
              style={{
                maxHeight: "600px",
                objectFit: "contain"
              }}
            />

          </div>

        </div>

      )}


      {/* ================= FOLLOWERS / FOLLOWING POPUP ================= */}

      {showfollow && (

        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 2000
          }}
          onClick={() =>
            setshowfollow(false)
          }
        >

          <div
            className="bg-white rounded-3"
            style={{
              width: "400px",
              maxWidth: "90%",
              height: "500px"
            }}
            onClick={(e) =>
              e.stopPropagation()
            }
          >


            {/* ================= POPUP HEADER ================= */}

            <div
              className="d-flex justify-content-between align-items-center border-bottom"
            >

              <div className="d-flex">


                {/* FOLLOWERS TAB */}

                <button
                  className="btn rounded-0 px-4"
                  onClick={() =>
                    setfollow("followers")
                  }
                  style={{
                    borderBottom:
                      follow === "followers"
                        ? "2px solid black"
                        : "2px solid transparent"
                  }}
                >
                  Followers
                </button>


                {/* FOLLOWING TAB */}

                <button
                  className="btn rounded-0 px-4"
                  onClick={() =>
                    setfollow("following")
                  }
                  style={{
                    borderBottom:
                      follow === "following"
                        ? "2px solid black"
                        : "2px solid transparent"
                  }}
                >
                  Following
                </button>


              </div>


              {/* CLOSE */}

              <button
                className="btn"
                onClick={() =>
                  setshowfollow(false)
                }
              >

                <i className="bi bi-x-lg"></i>

              </button>

            </div>


            {/* ================= FOLLOWERS LIST ================= */}

            {follow === "followers" && (

              <div
                style={{
                  height: "450px",
                  overflowY: "auto"
                }}
              >

                {userfollowers.map((user) => (

                  <div
                    key={user.id}
                    className="d-flex align-items-center px-3 py-3"
                  >

                    <img
                      src={user.user.profile}
                      alt=""
                      className="rounded-circle me-3"
                      width="45"
                      height="45"
                      style={{
                        objectFit: "cover"
                      }}
                    />


                    <div className="flex-grow-1">

                      <strong>
                        {user.user.username}
                      </strong>

                      <div className="text-muted small">
                        {user.user.name}
                      </div>

                    </div>


                    {/* REMOVE ONLY ON MY PROFILE */}

                    {ismyprofile && (

                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() =>
                          deleteuser(user.user.id)
                        }
                      >
                        Remove
                      </button>

                    )}

                  </div>

                ))}

              </div>

            )}


            {/* ================= FOLLOWING LIST ================= */}

            {follow === "following" && (

              <div
                style={{
                  height: "450px",
                  overflowY: "auto"
                }}
              >

                {userfollowing.map((user) => (

                  <div
                    key={user.id}
                    className="d-flex align-items-center px-3 py-3"
                  >

                    <img
                      src={user.user.profile}
                      alt=""
                      className="rounded-circle me-3"
                      width="45"
                      height="45"
                      style={{
                        objectFit: "cover"
                      }}
                    />


                    <div className="flex-grow-1">

                      <strong>
                        {user.user.username}
                      </strong>

                      <div className="text-muted small">
                        {user.user.name}
                      </div>

                    </div>


                    {/* REMOVE ONLY ON MY PROFILE */}

                    {ismyprofile && (

                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() =>
                          deleteuser(user.user.id)
                        }
                      >
                        Remove
                      </button>

                    )}

                  </div>

                ))}

              </div>

            )}

          </div>

        </div>

      )}

    </div>

  )

}

export default Userprofiletemplate