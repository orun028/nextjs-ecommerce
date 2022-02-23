// Because the website uses both NextJS & Chackra UI, and both export
// a Link component, this component wraps Chackra's link within NextJS's link
import React, { FC } from "react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import {
  Link as ChackraLink,
  LinkProps as ChackraLinkProps,
} from "@chakra-ui/react";

interface IProps extends NextLinkProps {
  chackraLink?: ChackraLinkProps;
}

const Link: FC<IProps> = (props) => {
  const { chackraLink, children } = props;
  const nextLinkProps = {
    ...props,
    chackraLink: undefined,
    children: undefined,
  };
  return (
    <NextLink {...nextLinkProps} passHref>
      <ChackraLink {...chackraLink} style={{textDecoration: 'none'}}>{children}</ChackraLink>
    </NextLink>
  );
};

Link.defaultProps = {
  chackraLink: {},
};

export default Link;