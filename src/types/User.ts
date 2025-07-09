import { EnrolledCourse } from "./Courses";
import { onbordingType } from "./Onbording";

export type SystemRecommedations = {
  Assets: {
    equity: number;
    hybrid: number;
    debt: number;
    thematic: number;
    index: number;
    international: number;
  };
  Sectors: {
    technology: number;
    healthcare: number;
    finance: number;
    energy: number;
    consumerGoods: number;
    utilities: number;
    realEstate: number;
    industrial: number;
    telecommunications: number;
    materials: number;
  };
  updatedAt?: string;
  refusedCounter?: number;
  lastRefused?: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  photoURL?: string;
  role: string;
  createdAt: string;
  enrolledCourses: {
    [courseId: string]: EnrolledCourse;
  };
  userPreferences?: onbordingType;
  SystemRecommedations: SystemRecommedations;
};

export type SystemPoints = {
  method: "add" | "remove";
  asset: string;
  sector: string;
  amount: number;
};
