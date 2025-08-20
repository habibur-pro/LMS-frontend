export const getCourse = async (courseIdOrSlug: string) => {
  try {
    const res = await fetch(
      `${process.env.API_BASE_URL}/courses/${courseIdOrSlug}`,
      {
        next: { revalidate: 300 },
      }
    );
    if (!res.ok) {
      return {
        course: null,
      };
    }
    const data = await res.json();
    return { course: data?.data ?? null };
  } catch (error: any) {
    console.error("Error fetching course:", error);
    return {
      course: null,
    };
  }
};
