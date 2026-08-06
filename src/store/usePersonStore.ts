import { create } from "zustand";
import { PersonState } from "./state/persons-state";
import { Person } from "../model/person.model";

const usePersonStore = create<PersonState>((set) => ({
  totalPersons: 20_600,
  personsInside: [], // Person[] — everyone currently on campus
  personInToCampus: (person: Person) =>
    set((state) => ({
      totalPersons: state.totalPersons + 1,
      personsInside: [...state.personsInside, person],
    })),
  personOutFromCampus: (person: Person) =>
    set((state) => ({
      totalPersons: Math.max(0, state.totalPersons - 1),
      personsInside: state.personsInside.filter(
        (p) => p.personIdentificationId !== person.personIdentificationId,
      ),
    })),
}));

export default usePersonStore;
