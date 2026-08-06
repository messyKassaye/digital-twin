import { Person } from "../../model/person.model";

export interface PersonState {
  totalPersons: number;
  personsInside: Person[];
  personInToCampus: (person: Person) => void;
  personOutFromCampus: (person: Person) => void;
}
