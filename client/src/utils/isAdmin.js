const isAdmin = (role) => {
  return typeof role === "string" && role.toUpperCase() === "ADMIN"
}

export default isAdmin