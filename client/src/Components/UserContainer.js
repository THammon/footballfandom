import React, {useState, useEffect} from "react";
import NewFieldForm from "./NewFieldForm";
import UserCard from "./UserCard";


function UserContainer({fields, addNewFields, user, rivalries, conferences, addNewConf, addNewRival, beenTo, wantToGo}){    
    const [userFields, setUserFields] = useState([])


    useEffect(() => {
        fetch("/user_fields")
        .then((r) => r.json())
        .then((data) => setUserFields(data))
    },[])

    function deleteField(deletedField){
        console.log(userFields)
        const updatedFields = userFields.filter((field) => field.field?.id !== deletedField.id)
        setUserFields(updatedFields)
    }

    const displayBeenTo = userFields.filter(field => field.visited)
    const displayWantToGo = userFields.filter(field => !field.visited)

    console.log(displayBeenTo)
    return(
        <div>
        <div className="WelcomeBar">{`Welcome ${user.first_name}🏈`}</div>
        <div className="textUserBar">I Have Been Too</div>        
        <div className="userCont">
            {displayBeenTo.map(field => <UserCard field= {field.field} visited={true}/>)}
        </div>
        
        <div className="textUserBar">My Stadium Bucket List</div>
        <div className="userCont">{displayWantToGo.map(field => <UserCard field= {field.field} visited={false} deleteField={deleteField}/>)}
        </div>
        <div>
                <NewFieldForm addNewFields={addNewFields} user={user} rivalries={rivalries} conferences={conferences} addNewConf={addNewConf} addNewRival={addNewRival}/>
            </div>        
        </div> 
    )
}
export default UserContainer;




