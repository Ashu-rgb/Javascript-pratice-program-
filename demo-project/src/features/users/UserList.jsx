import { fetchUsers, userDeleted } from "./usersSlice";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

export function UserList() {
  const dispatch = useDispatch();

  const { entities } = useSelector((state) => state.users);
  const loading = useSelector((state) => state.loading);

  const handleDelete = (id) => {
    dispatch(userDeleted({ id }));
  };

  return (
    <div className="container">
      <div className="row">
        <h2>Redux User App</h2>
      </div>
      <div className="row">
        <div className="two columns">
          <button
            onClick={() => dispatch(fetchUsers())}
            className="button-primary"
          >
            Load users
          </button>
        </div>
        <div className="two columns">
          <Link to="/add-user">
            <button className="button-primary">Add user</button>
          </Link>
        </div>
      </div>
      <div className="row">
        {loading ? (
          "Loading..."
        ) : (
          <table className="u-full-width">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Date Of Birth</th>
                <th>Operations</th>
              </tr>
            </thead>
            <tbody>
              {entities.length &&
                entities.map(({ id, name, email, phonenumber, dateofbirth }, i) => (
                  <tr key={i}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>{phonenumber}</td>
                    <td>{dateofbirth}</td>
                    <td>
                      <button onClick={() => handleDelete(id)}>Delete</button>
                      <Link to={`/edit-user/${id}`}>
                        <button>Edit</button>
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
