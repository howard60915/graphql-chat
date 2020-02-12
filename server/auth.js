import { NotFoundError } from "graphql-schema-sushi";
import { AuthenticationError } from "apollo-server-errors";
import { JsonWebToken } from "nextjs-apollo/server";
import User from "./model/User";
import Certificate from "./model/Certificate";

const onSignIn = async data => {
  const { email, password, correlationId } = data;

  const { fetcher } = User;
  const user = await fetcher.where("email", email).fetch(NotFoundError);

  if (!(password && user.password.verify(password))) {
    throw new AuthenticationError("AuthenticationError");
  }

  return { user: user.previous, correlationId };
};

const onSignOut = () => ({});

const onRenew = async data => {
  const { user, correlationId } = data;

  const renewUser = await User.load(user.id, NotFoundError);

  return { user: renewUser.previous, correlationId };
};

const toUser = ({ user }) => {
  if (!user.id) throw new AuthenticationError();
  return User.forge(user);
};

const jwt = new JsonWebToken(Certificate, {
  onSignIn,
  onSignOut,
  onRenew,
  toUser
});

export default jwt;
