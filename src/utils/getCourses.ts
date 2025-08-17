export const getCourses = async () => {
  try {
    console.log("url", process.env.API_BASE_URL);
    const res = await fetch(`${process.env.API_BASE_URL}/courses`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) {
      return {
        courses: null,
      };
    }
    const data = await res.json();
    return { courses: data?.data ?? [] };
  } catch (error: any) {
    console.error("Error fetching products:", error);
    return {
      products: null,
    };
  }
};
