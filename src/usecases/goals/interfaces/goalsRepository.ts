import { Goal } from "../../../model/goal";

export interface GoalsRepository {
  add: (goal: Goal) => Promise<Goal>,
  existsInUserByTitle: (userId: number, title: string) => Promise<boolean>,
  existsInUserById: (userId: number, goalId: number) => Promise<boolean>,
  getSizeInUser: (userId: number, search?: string) => Promise<number>,
  getAllOfUser: (
    userId: number, page: number, size: number, search?: string,
  ) => Promise<Goal[]>,
  removeFromUser: (userId: number, goalId: number) => Promise<void>,
  updateGoal: (goal: Goal) => Promise<void>,
}