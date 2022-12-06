import React, { useState} from "react";

function UserCard({field, visited, deleteField}){
    const [visitCount, setVisitCount] = useState(field?.visit || null)
    const [displayRival, setDisplayRival] = useState(false)
    
    const rivalClick = () => {
        setDisplayRival((prev) => !prev)
    }

    function handleUpdateClick(field){
        console.log("clicked")
        fetch(`/fields/${field.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                visit: field.visit += 1
            })            
        }).then(res => res.json())
          .then(data => {
            console.log(data)
            setVisitCount(data.visit)
          })
    }

    function handleDeleteClick(field){
        fetch (`/user_fields/${field.id}`,{
            method:"DELETE",
        })
        deleteField(field)
    }
    
    if (!field) return null
    return(
        <div className="userCard">
            <div className="fieldName">{field.field_name}</div>
            <div className="teamName">{`Home To The ${field.team_name}`}</div> 
            {<img  className="teamImage" alt={field.team_image} src = {field.team_image}/>}<br/> 
            <img onClick={rivalClick}className="priImage" alt={field.field_name} src = {field.field_image}/> <br/>
        
            <div className="archRivalText">{displayRival ? `Arch Rival: ${field.rivalry.rival_team} `: false}</div>  
            {displayRival ? <img className="teamImage"  alt="test" src={field.rivalry.rival_logo}/> : false}<br/>
            
            {visited ? <div className="timesVisitedText">
             {`I've Been Here ${visitCount} Times!`} <br/>
             <button id="buttonDiv" className="remove" onClick={() => handleUpdateClick(field)}>Add Times Visited</button>
            </div> :null}

            {!visited ? <div>
             <button id="buttonDiv" className="remove" onClick={() => handleDeleteClick(field)}>Remove Field</button>
            </div> :null}
            
        </div>
    )
}
export default UserCard;