export const formatUser = (user: any) => ({
  id: user.id,
  username: user.username,
  is_admin: user.is_admin,
  created_at: user.created_at,
});
