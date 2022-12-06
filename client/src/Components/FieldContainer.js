import FieldCard from "./FieldCard";
import Search from "./Search";
import {useParams} from "react-router-dom";

function FieldContainer({rivalries, fields, setSearch, beenTo, setBeenTo, wantToGo, setWantToGo, currentUser}){

    const {conference} = useParams()
    const conferenceFields = fields.filter((field) => field.conference.name === conference)
    
    return(
        <div>
            <Search setSearch={setSearch}/>
            <div className="fieldCont">
                {conferenceFields?.map(field => <FieldCard {...field} field={field} key={field.id} rivalries={rivalries} beenTo={beenTo} wantToGo={wantToGo} setBeenTo={setBeenTo} setWantToGo={setWantToGo} currentUser={currentUser}/>)}
            </div>
        </div>
    )
}
export default FieldContainer;