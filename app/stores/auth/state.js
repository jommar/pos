export const state = () => ({
  token: useCookie("auth_token").value || null,
});
