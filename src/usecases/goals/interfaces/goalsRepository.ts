import { Goal } from "../../../model/goal";

export interface GoalsRepository {
  add: (goal: Goal) => Promise<void>,
  existsInUserByTitle: (goal: Goal) => Promise<boolean>,
}