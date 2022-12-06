import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

function NewFieldForm({addNewFields, user, rivalries, conferences, addNewConf, addNewRival}){
    const [newFieldName, setNewFieldName] = useState("")
    const [newTeamName, setNewTeamName] = useState("")
    const [newRivalTeam, setNewRivalTeam] = useState("")
    const [newRivalLogo, setNewRivalLogo] = useState("")
    const [newConfName, setNewConfName] = useState("")
    const [newConfImage, setNewConfImage] = useState("")
    const [newFieldImage, setNewFieldImage] = useState("")
    const [newTeamImage, setNewTeamImage] = useState("")
    const [expandForm, setExpandForm] = useState(false)
    const [expandRivalry, setExpandRivalry] = useState(false)
    const [expandConferences, setExpandConferneces] = useState(false)
    const [errors, setErrors] = useState([]);
    const [newConference, setNewConference] = useState("")
    const [newRivalry, setNewRivalry] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    let navigate = useNavigate();

    function expandedForm(){
        setExpandForm(prev => !prev)
    }


    function expandFormRivalry(){
        setExpandRivalry(prev => !prev)
    }

    function expandFormConferences(){
        setExpandConferneces(prev => !prev)
    }

    function handleSubmit(e){
        e.preventDefault()
        setIsLoading(true)
        const newFieldObj={
            field_name: newFieldName,
            team_name: newTeamName,
            field_image: newFieldImage,
            team_image: newTeamImage,
            user_id: parseInt(user.id),
            conference_id: parseInt(newConference),
            rivalry_id: parseInt(newRivalry)
        }
        fetch(`/fields`, {
            method: `POST`,
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newFieldObj)
        }).then((r) => {
            setIsLoading(false)
            if (r.ok) {
              r.json().then((user) => {
               addNewFields(user)
               navigate(`/`)
          });
            } else {
              r.json().then((err) => setErrors(err.errors));
            }
        })
    }

    function handleSubmitRival(e){
        e.preventDefault()
        setIsLoading(true)
        const newRivalObj={
            rival_team: newRivalTeam,
            rival_logo: newRivalLogo
            
        }
        fetch(`/rivalries`, {
            method: `POST`,
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newRivalObj)
        }).then((r) => {
            setIsLoading(false)
            if (r.ok) {
              r.json().then((user) => {
               addNewRival(user)

          });
            } else {
              r.json().then((err) => setErrors(err.errors));
            }
        })
    }

    function handleSubmitConf(e){
        e.preventDefault()
        setIsLoading(true)
        const newConfObj={
            name: newConfName,
            image: newConfImage
        }
        fetch(`/conferences`, {
            method: `POST`,
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newConfObj)
        }).then((r) => {
            setIsLoading(false)
            if (r.ok) {
              r.json().then((user) => {
               addNewConf(user)

          });
            } else {
              r.json().then((err) => setErrors(err.errors));
            }
        })
    }

    return(
        <div className="form-container">
            <h1>Have you been to a stadium that you don't see listed? Add it to your page with the form below!</h1>
            <button className='buttonOtherPretty' onClick={expandedForm}>Click To Show Form</button>
            {expandForm &&
                <div>
                    <form className='trueForm' onSubmit={handleSubmit}>
                        <label>Stadium Name</label>
                        <input 
                        className='form-container-input'
                        type="text" 
                        placeholder="Name of Field..." 
                        value={newFieldName} 
                        onChange={(e) => setNewFieldName(e.target.value)}/>
                        <label>Home Team Name</label>
                        <input 
                        className='form-container-input'
                        type="text" 
                        placeholder="Name of Team..." 
                        value={newTeamName} 
                        onChange={(e) => setNewTeamName(e.target.value)}/>
                        <label>Stadium Image</label>
                        <input 
                        className='form-container-input'
                        type="text" 
                        placeholder="URL for Field Image..." 
                        value={newFieldImage} 
                        onChange={(e) => setNewFieldImage(e.target.value)}/>
                        <label>Team Image</label>
                        <input 
                        className='form-container-input'
                        type="text" 
                        placeholder="URL for Team Image..." 
                        value={newTeamImage} 
                        onChange={(e) => setNewTeamImage(e.target.value)}/>
                        

                        <label htmlFor='storeDropdown'>Rivalry </label>
                            <select className = "dropdown" id="storeId" name="storeDropdown" onChange={(e)=>{setNewRivalry(e.target.value)}}>
                                <option value=""> Select...</option>
                                {rivalries && rivalries?.map((rival) => {
                                    return <option key={rival.id} value={rival.id}>{rival.rival_team}</option>
                                    })}
                            </select>


                        <label htmlFor='speciesDropdown'>Conference </label>
                            <select className = "dropdown" id="speciesId" name="speciesDropdown" onChange={(e)=>{setNewConference(e.target.value)}}>
                                <option value=""> Select...</option>
                                {conferences?.map((conference) => {
                                    return <option key={conference.id} value={conference.id}>{conference.name}</option>
                                    })}
                            </select>
                            <button type='submit' className='buttonPretty'>Add Your New Stadium</button>
                    </form>
                {errors? <div>{errors}</div>:null} 
                </div>
            }
            <br/>
            <button className='buttonOtherPretty' onClick={expandFormRivalry}>New Rivalry</button>
            <button className='buttonOtherPretty' onClick={expandFormConferences}>New Conference</button>
            {expandRivalry && 
                    <div className='trueForm' onSubmit={handleSubmitRival}>
                        <h4>Add a new Rival</h4>
                        <form className="form-input">
                            <label>Rival Name</label>
                            <input
                            className='form-container-input'
                            type="text" 
                            placeholder="Name of Rival..." 
                            value={newRivalTeam} 
                            onChange={(e) => setNewRivalTeam(e.target.value)}/>
                            <label>Rival Logo</label>
                            <input
                            className='form-container-input'
                            type="text" 
                            placeholder="Rival Logo URL" 
                            value={newRivalLogo} 
                            onChange={(e) => setNewRivalLogo(e.target.value)}/>
                            <button type='submit' className='buttonPretty'>Add Your Teams Rival</button>
                        </form>
                        {isLoading ? "Loading..." : null}
                    </div>
                 }
                 {expandConferences && 
                    <div className='trueForm' onSubmit={handleSubmitConf}>
                        <h4>Add a new Conference</h4>
                        <form className="form-input">
                            <label>Conference Name</label>
                            <input
                            className='form-container-input'
                            type="text" 
                            placeholder="Name of Conference..." 
                            value={newConfName} 
                            onChange={(e) => setNewConfName(e.target.value)}/>
                            <label>Conference Logo</label>
                            <input
                            className='form-container-input'
                            type="text" 
                            placeholder="Conference Image URL" 
                            value={newConfImage} 
                            onChange={(e) => setNewConfImage(e.target.value)}/>
                            <button type='submit' className='buttonPretty'>Add Your Teams Conference</button>
                        </form>
                        {isLoading ? "Loading..." : null}
                    </div>
                 }    
        </div>
    )
}
export default NewFieldForm;