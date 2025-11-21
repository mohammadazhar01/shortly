import AllLinks from "../components/AllLinks"
import AddLink from "../components/AddLink"

const Dashboard = ({links, fetchLinks}) => {
    
    return(
        <>
        <AddLink fetchLinks = {fetchLinks}/>
        <AllLinks links = {links} fetchLinks = {fetchLinks}/>
        </>
        
    )
}

export default Dashboard