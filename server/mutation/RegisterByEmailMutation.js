import User from "../model/User";

export default async function(source, { input }) {
  const { email } = input;
  const { fetcher } = User;

  const result = await fetcher.where("email", email).find();

  if (result.length) throw new Error("user is existed");

  const user = new User(input);

  await user.save(user);

  return { status: "ok", user };
}
