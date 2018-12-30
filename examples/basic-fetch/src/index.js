import React from "react"
import Async from "react-async"
import ReactDOM from "react-dom"
import "./index.css"

const loadUser = ({ userId }) =>
  fetch(`https://reqres.in/api/users/${userId}`)
    .then(res => (res.ok ? res : Promise.reject(res)))
    .then(res => res.json())

const UserPlaceholder = () => (
  <div className="user placeholder">
    <div className="avatar" />
    <div className="name">══════</div>
  </div>
)

const UserDetails = ({ data }) => (
  <div className="user">
    <img className="avatar" src={data.data.avatar} alt="" />
    <div className="name">
      {data.data.first_name} {data.data.last_name}
    </div>
  </div>
)

const App = () => (
  <>
    <Async promiseFn={loadUser} userId={1}>
      {({ data, isLoading }) => (isLoading ? <UserPlaceholder /> : <UserDetails data={data} />)}
    </Async>

    <Async promiseFn={loadUser} userId={2}>
      <Async.Loading>
        <UserPlaceholder />
      </Async.Loading>
      <Async.Resolved>{data => <UserDetails data={data} />}</Async.Resolved>
    </Async>
  </>
)

ReactDOM.render(<App />, document.getElementById("root"))
