import { supabase } from "./config";

export const signUp = async (email, password, fullName,username) => {
  let { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        display_name: fullName,
        username: username
      },
    },
  });
  return { data, error };
};

export const logIn = async (email, password) => {
  let { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  return { data, error };
};

export const logOut = async () => {
  const { error } = await supabase.auth.signOut();
  return error;
};
