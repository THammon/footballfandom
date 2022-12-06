import React, {useState} from "react";

function FieldCard({field, beenTo, wantToGo, setBeenTo, setWantToGo, currentUser}){

    const [displayRival, setDisplayRival] = useState(false)

    const rivalClick = () => {
        setDisplayRival((prev) => !prev)
    }

    function handleBeenTo(){
        fetch(`/user_fields`, {
            method: `POST`,
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                visited: true,
                field_id: field.id,
            })
        }).then((r) => {
            // setIsLoading(false)
            if (r.ok) {
              r.json().then((data) => {
                setBeenTo([...beenTo, field])
              });
            }
        })
    }

    function handleWantToGo(){
        fetch(`/user_fields`, {
            method: `POST`,
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                visited: false,
                field_id: field.id,
            })
        }).then((r) => {
            // setIsLoading(false)
            if (r.ok) {
              r.json().then((data) => {
                setWantToGo([...beenTo, field])
              });
            }
        })
    }
    return(
        <div>
            <div className="fieldCard">
                <div className="fieldName">{`${field.field_name}`}</div>
                <div className="teamName">{`Home To The ${field.team_name}`}</div>
                <img className="teamImage" alt="test" src={field.team_image}/>
                <br/>
                <img onClick={rivalClick} className="priImage" alt="test" src={field.field_image}/>
                <div className="archRivalText">{displayRival ? `Arch Rival: ${field.rivalry.rival_team} `: false}</div>
                 {displayRival ? <img className="teamImage"  alt="test" src={field.rivalry.rival_logo}/> : false}
                <div>
                    {currentUser? <button className='buttonPretty' onClick={() => handleBeenTo()}>I Have Been Here</button> : null}
                    {currentUser? <button className='buttonPretty' onClick={() => handleWantToGo()}>Bucket List</button> : null}
                </div>
            </div>

        </div>
    )
}
export default FieldCard;
