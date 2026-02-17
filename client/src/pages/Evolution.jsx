import { useState } from "react";
import { updates } from "../assets/data";
import UpdatesList from "../components/UpdatesList";
import UpdateDetail from "../components/UpdateDetail";
import "../styles/evolution.css"


export default function Evolution() {
    
    const [selectedId, setSelectedId] = useState(updates[0].id)

    const selectedUpdate = updates.find(p => p.id === selectedId)

    return(
        
        <div className="engineering-page">
            <UpdatesList
                updates = {updates}
                selectedId = {selectedId}
                onSelect = {setSelectedId}
            />

            <UpdateDetail update = {selectedUpdate} />
        </div>
    )
}