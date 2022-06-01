import Bird from "./bird";
import Sighting from "./sighting";
import * as Location from 'expo-location';
import ChecklistItemInterface from "./checklistiteminterface";


export default interface AppUseState {
    isLoggedIn: boolean,
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
    birds: Bird[],
    setBirds: React.Dispatch<React.SetStateAction<Bird[]>>,
    nearbySightings: Sighting[],
    setNearbySightings: React.Dispatch<React.SetStateAction<Sighting[]>>,
    location: Location.LocationObject | undefined,
    setLocation: React.Dispatch<React.SetStateAction<Location.LocationObject | undefined>>,
    checklist: ChecklistItemInterface[],
    setChecklist: React.Dispatch<React.SetStateAction<ChecklistItemInterface[]>>,
    email: string,
    setEmail: React.Dispatch<React.SetStateAction<string>>
}