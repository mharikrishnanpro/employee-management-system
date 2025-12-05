export const buildEmployeeQuery = (query) => {
  const filter = {};

  // Search by name
  if (query.search) {
    filter.name = { $regex: query.search, $options: "i" };
  }

  // Filter by designation
  if (query.designation) {
    filter.designation = query.designation;
  }

  return filter;
};

export const getPagination = (query) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 5;
  const skip = (page - 1) * limit;

  return { skip, limit };
};

export const getSort = (query) => {
  if (query.sort) return query.sort;
  return "-createdAt";
};
