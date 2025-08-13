// export const categoryService = {
//   // Get all categories
//   getCategories: async () => {
//     // For now, return static categories since we don't have a category API
//     return [
//       { _id: "1", name: "Men", slug: "men" },
//       { _id: "2", name: "Women", slug: "women" },
//       { _id: "3", name: "Kids", slug: "kids" },
//       { _id: "4", name: "Beauty", slug: "beauty" },
//     ]
//   },
// }

export const categoryService = {
  // Get all categories
  getCategories: async () => {
    return [
      { _id: "1", name: "Men", slug: "men" },
      { _id: "2", name: "Women", slug: "women" },
      { _id: "3", name: "Kids", slug: "kids" },
      { _id: "4", name: "Beauty", slug: "beauty" },
    ];
  },
};
