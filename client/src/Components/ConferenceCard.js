import {useNavigate} from 'react-router-dom';



function ConferenceCard({conference}){
    const navigate = useNavigate();

    const navigateToFieldContainer = () =>{
        navigate(`/fields/${conference.name}`)
    }

    return(
        <div className='conCard'>
            <img
            onClick={navigateToFieldContainer} 
            className="conLogo" 
            alt="test" 
            src={conference.image}/>
        </div>
        
    )
}
export default ConferenceCard;
