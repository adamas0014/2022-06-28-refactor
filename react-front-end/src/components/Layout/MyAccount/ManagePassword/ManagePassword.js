import React from 'react'
import ProfileContext from '../../../../Context'
import { UpdatePassword } from '../../../../Database/UserAPI'

const ManagePassword = () => {
    const [profile, setProfile] = React.useContext(ProfileContext)
    const [form, setForm] = React.useState({})
    const changeForm = (event) => {
        const {id, value} = event.target
        setForm((prevState) => ({...prevState, [id]: value}))
    }
    let isPasswordChanged = false
    const submitHandler = async (event) => {
        event.preventDefault()

        if(form.newA.trim() !== form.newB.trim()) {
            alert("Passwords do not match")
            setForm({old: '', newA: '', newB: ''})
        }

        if(form.newA.trim().length < 7){
            alert("Password must be longer than 7 characters")
            setForm({old: '', newA: '', newB: ''})
        }

        try{
            await UpdatePassword(form.newA.trim())
        }
        catch(e){
            console.log('Unable to update password', e)
        }

    }



    return (
        <form onSubmit={submitHandler}>
          <div class="input-field">
            <input onChange = {changeForm} value={form.old} id="old" type="text" class="validate" required />
            <label for="old">Old Password</label>
          </div>
          <div class="input-field">
            <input onChange = {changeForm} value={form.newA} id="newA" type="text" class="validate" required />
            <label for="newA">New Password</label>
          </div>
          <div class="input-field">
            <input onChange = {changeForm} value={form.newB} id="newB" type="text" class="validate" required />
            <label for="newB">New Password (again) </label>
          </div>
          <div class="center">
              <br />
              <button class="btn waves-effect waves-light" name="action">Submit
                    <i class="material-icons right">send</i>
            </button>
            <br /> <br />
          </div>
        </form>


    )

}


export default ManagePassword