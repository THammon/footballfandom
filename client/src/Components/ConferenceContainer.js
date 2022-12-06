import ConferenceCard from "./ConferenceCard";

function ConferenceContainer({conferences}){

    return(
        <div>
            <div className="conContainer">
            {conferences?.map(conference => <ConferenceCard {...conference} conference={conference} key={conference.id} />)}
            
            </div>
        </div>
    )
}
export default ConferenceContainer;