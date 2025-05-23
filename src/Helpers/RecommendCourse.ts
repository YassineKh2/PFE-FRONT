import { GetCourses } from "@/services/Course";
import { CourseType } from "@/types/Courses";
import { onbordingType } from "@/types/Onbording";
import { SystemRecommedations } from "@/types/User";

export async function RecommendCourse(
  userRecommendation: onbordingType,
  systemRecommedations: SystemRecommedations
): Promise<CourseType | null> {
  const response = await GetCourses();
  const Courses: CourseType[] = response.data;

  // 1. Find the sector and asset with the most points from system recommendations
  const sectorEntries = Object.entries(systemRecommedations.Sectors);
  const assetEntries = Object.entries(systemRecommedations.Assets);

  const [topSector] = sectorEntries.reduce((max, curr) =>
    curr[1] > max[1] ? curr : max
  );
  const [topAsset] = assetEntries.reduce((max, curr) =>
    curr[1] > max[1] ? curr : max
  );

  // 2. Use user preferences as a filter (if present)
  const preferredSectors = userRecommendation.sectorPreference || [];
  const preferredAssets = userRecommendation.assetAllocation || [];

  // 3. Filter courses by top asset/sector and user preferences
  let filteredCourses = Courses.filter((course) => {
    // Match category (asset) and sector (if available)
    const matchesAsset =
      course.category?.toLowerCase() === topAsset.toLowerCase() ||
      preferredAssets.includes(course.category?.toLowerCase());
    const matchesSector =
      course.category?.toLowerCase() === topSector.toLowerCase() ||
      preferredSectors.includes(course.category?.toLowerCase());
    return matchesAsset || matchesSector;
  });

  // 4. If no course matches, fallback to any course in top asset/sector
  if (filteredCourses.length === 0) {
    filteredCourses = Courses.filter(
      (course) =>
        course.category?.toLowerCase() === topAsset.toLowerCase() ||
        course.category?.toLowerCase() === topSector.toLowerCase()
    );
  }

  // 5. Return the first recommended course or null
  return filteredCourses.length > 0 ? filteredCourses[0] : null;
}
