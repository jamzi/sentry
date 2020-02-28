import React from 'react';
// eslint-disable-next-line import/no-named-default
import {default as RouterLink} from 'react-router/lib/Link';
import {Location, LocationDescriptor} from 'history';

type ToLocationFunction = (location: Location) => LocationDescriptor;

export type LinkProps<T extends boolean = false> = {
  to: T extends true ? string : ToLocationFunction | LocationDescriptor;
  external?: T;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  disabled?: boolean;
  children?: React.ReactNode;
};

const Link = <T extends boolean>({to, external, ...props}: LinkProps<T>) =>
  external && typeof to === 'string' ? (
    <a href={to} target="_blank" rel="noopener noreferrer" {...props} />
  ) : (
    <RouterLink to={to} {...props} />
  );

export default Link;
