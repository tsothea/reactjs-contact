import { useState } from 'react';
import './App.css';
import deleteLocalData from './components/deleteLocalData';
import getLocalData from './components/getLocalData'
import saveLocalData from './components/saveLocalData';
import updateLocalData from './components/updateLocalData';

function App() {
  let data = getLocalData();
  
  const [contacts, setContacts] = useState(data);
  const [formData, setFormData] = useState({
      'id': '',
      'name': '',
      'phone': '',
      'email': ''
  });

  const setValue = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...formData };
    newFormData[fieldName] = fieldValue;

    setFormData(newFormData);
  };

  const saveData = (event) => {
    event.preventDefault();

    if (formData.id != '') {
        let index = contacts.map(function(item) {
            return item.id
          }).indexOf(formData.id);
          contacts[index] = formData;

          setContacts([...contacts]);

          updateLocalData(contacts);
    } else {
        let id = 1;
        if (contacts.length > 0) {
            let contact = contacts[contacts.length - 1];
            id = contact.id + 1;
        }
        const newContact = {
            id: id,
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            date: new Date().toLocaleString()
        };

        const newContacts = [...contacts, newContact];
        setContacts(newContacts);

        saveLocalData(newContact);
    }
    clearForm();
  }

  const updateData = (id) => {
    let newContacts = contacts;
    let index = newContacts.map(function(item) {
      return item.id
    }).indexOf(id);
    
    setFormData(newContacts[index]);
  }

  const deleteData = (id) => {
    let newContacts = contacts;
    let index = newContacts.map(function(item) {
      return item.id
    }).indexOf(id);
    
    newContacts.splice(index, 1);

    setContacts([...newContacts]);
    
    deleteLocalData(id);
  }

  const clearForm = () => {
    setFormData({
        'id': '',
        'name': '',
        'phone': '',
        'email': ''
    })
  }

  return (
    <div className="App">
      <div className="container">
          <form method="post" name="contact" id="frm-contact-id">
              <input type="hidden" name="id" value={formData.id} id="data_id" />
              <div className="row">
                  <div className="col-sm-12">
                      <input type="text" name="name" value={formData.name} placeholder="Name" className="form-control" id="name_id" onChange={event => setValue(event)} />
                  </div>
              </div>
              <div className="row">
                  <div className="col-sm-12">
                      <input type="text" name="phone" value={formData.phone} placeholder="Phone" className="form-control" id="phone_id" onChange={event => setValue(event)} />
                  </div>
              </div>
              <div className="row">
                  <div className="col-sm-12">
                      <input type="text" name="email" value={formData.email} placeholder="Email" className="form-control" id="email_id" onChange={event => setValue(event)} />
                  </div>
              </div>
              <div className="row">
                  <div className="col-sm-12">
                      <input type="button" name="btn-submit" value="Save" className="btn btn-success btn-full" id="btnsubmit_id" onClick={event => saveData(event)} />
                  </div>
              </div>
              <div className="error" id="errors_id"></div>
          </form>
      </div>
      <br /><br />
      <table width="100%" className="table" id="table_id">
          <thead>
              <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Date</th>
                  <th width="220"></th>
              </tr>
          </thead>
          <tbody>
          {contacts.map((item) => {
              return(
                  <tr>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.name}</td>
                      <td>{item.date}</td>
                      <td>
                      <input type="button" value="Edit" className="btn btn-success" onClick={e => updateData(item.id)} /> 
                      <input type="button" value="Delete" className="btn btn-danger" onClick={e => deleteData(item.id)} />
                      </td>
                  </tr>
              )}
          )}
          </tbody>
      </table>
    </div>
  );
}

export default App;
