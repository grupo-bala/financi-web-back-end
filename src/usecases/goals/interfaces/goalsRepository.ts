import { Goal } from "../../../model/goal";

export interface GoalsRepository {
  add: (goal: Goal) => Promise<void>,
  existsInUserByTitle: (userId: number, title: string) => Promise<boolean>,
  existsInUserById: (userId: number, goalId: number) => Promise<boolean>,
  getSizeInUser: (userId: number) => Promise<number>,
  getAllOfUser: (userId: number, page: number, size: number) => Promise<Goal[]>,
  removeFromUser: (userId: number, goalId: number) => Promise<void>,
  updateGoal: (goal: Goal) => Promise<void>,
}