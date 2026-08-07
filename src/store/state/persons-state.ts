import { Person } from "../../model/person.model";

export interface PersonState {
  totalPersons: number;
  personsInside: Person[];
  recentEvents: Person[];
  activeGate: string | null;
  personInToCampus: (person: Person) => void;
  personOutFromCampus: (person: Person) => void;
}
